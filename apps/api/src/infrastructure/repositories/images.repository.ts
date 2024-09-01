import { exit } from "process";
import prisma from "../prisma";
import { PythonShell } from "python-shell"
import fs from "fs"
import { createPubSub } from "graphql-yoga";

export const pubSubGeneration = createPubSub();

let isOnGoing = false;
let lastInfo: string[] = [];
let isLive = false;

const exePath = `python`
console.log(exePath)

export const spawnedHy = new PythonShell('apps/api/src/infrastructure/cmd/hy.py');
spawnedHy.on("message", (message: string) => {
    console.log(message);
    if (message.startsWith("&")) {
        if (!isLive) {
            if (message.startsWith("&INPUT")) isLive = true;
        }
        if (isLive) {
            lastInfo.push(message.replace("&", ""));
        }
    }
});
spawnedHy.on("close", (err,code,signal) => {
    console.error(err);
    console.error(code);
    console.error(signal);
    exit(1);
})

const readInfo = () => {
    if (lastInfo.length === 0) return null;
    const ret = lastInfo[0];
    lastInfo.splice(0, 1);
    return ret;
}

const readLastInfo = () => {
    if (lastInfo.length === 0) return null;
    const ret = lastInfo[lastInfo.length - 1];
    lastInfo = [];
    return ret;
}

export const live = () => {
    return isLive;
}

export const getAllGeneration = async () => {
    return await prisma.generation.findMany();
}

export const innerGenerate = async () => {
    if (!isLive || isOnGoing) return;
    isOnGoing = true;
    const currentGenerations = await prisma.generation.findMany({
        where: {
            state: {
                not: "FINISHED"
            }
        },
        orderBy: {
            id: "asc"
        }
    });
    let hasGenerated = false;
    while (currentGenerations.length) {
        const generation = await prisma.generation.findUnique({
            where: {
                id: currentGenerations[0].id
            }
        });
        const id = currentGenerations[0].id
        if (!generation) {
            console.log(`Error loading generation ${id}.`);
        }
        const input = readLastInfo();
        if (input === null) {
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
            continue;
        }
        hasGenerated = true;
        if (input.startsWith("INPUT")) {
            spawnedHy.send(`${generation.width}|${generation.height}|${generation.prompt}`)
        }
        let now = new Date();
        while (true) {
            const lastInfo = readInfo();
            if (lastInfo !== null) {
                if (lastInfo.startsWith("START")) {
                    const stepsArgs = lastInfo.split(",");
                    console.log(stepsArgs);
                    await prisma.generation.update({
                        data: {
                            progress: 0,
                            state: "ON_GOING",
                        },
                        where: {
                            id
                        }
                    })
                }
                if (lastInfo.startsWith("STEP")) {
                    const stepsArgs = lastInfo.split(",");
                    const stepFinished = parseFloat(stepsArgs[1]);
                    const stepTotal = parseFloat(stepsArgs[2]);
                    const timeElapsedFromStartInSeconds = (new Date().getTime() - now.getTime()) / 1000;
                    const estimatedEndSeconds = timeElapsedFromStartInSeconds * stepTotal / stepFinished;
                    const updatedStepGeneration = await prisma.generation.update({
                        data: {
                            progress: stepFinished / stepTotal,
                            state: "ON_GOING",
                            estimatedEnd: new Date(now.getTime() + estimatedEndSeconds * 1000)
                        },
                        where: {
                            id
                        }
                    })
                    pubSubGeneration.publish("generationProgress", updatedStepGeneration);
                }
                if (lastInfo.startsWith("END")) {
                    const stepsArgs = lastInfo.split(",");
                    let finishedImage = "";
                    const data = fs.readFileSync(stepsArgs[1]);
                    // @ts-ignore
                    finishedImage = Buffer.from(data, 'binary').toString('base64')
                    const updatedEndGeneration = await prisma.generation.update({
                        data: {
                            progress: 1,
                            state: "FINISHED",
                            image: finishedImage,
                            estimatedEnd: new Date()
                        },
                        where: {
                            id
                        }
                    })
                    pubSubGeneration.publish("generationProgress", updatedEndGeneration);
                    currentGenerations.splice(0, 1);
                    break;
                }
            }
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
        }
    }
    isOnGoing = false;
    if (hasGenerated) {
        innerGenerate();
    }
} 

export const generate = async (prompt: string, width: number, height: number) => {
    const newGeneration = await prisma.generation.create({
        data: {
            estimatedEnd: null,
            height,
            width,
            prompt,
            progress: 0,
            image: null,
            state: "QUEUED"
        }
    });

    innerGenerate()

    return newGeneration.id;
}

export const deleteGeneration = async (id: string) => {
    const generationToDelete = await prisma.generation.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!generationToDelete || generationToDelete.state === "ON_GOING") {
        return null;
    }

    await prisma.generation.delete({
        where: {
            id: parseInt(id)
        }
    });
}

export default {
    generate,
    getAllGeneration,
    deleteGeneration,
    live,
    innerGenerate
}