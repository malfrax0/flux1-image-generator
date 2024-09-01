import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { createYoga } from "graphql-yoga";
import getTypeDefs from './schemas';
import getResolvers from './resolvers';
import env from '../config/env';
import cors from "cors";
import { spawnedHy, live, innerGenerate } from "./repositories/images.repository" 

const run = async () => {
    const port = env.API_PORT;

    const app = express();

    const resolvers = getResolvers();
    const typeDefs = await getTypeDefs();

    const yoga = createYoga({
        schema: makeExecutableSchema({
            typeDefs: typeDefs,
            resolvers: resolvers
        })
    });

    app.use(cors());

    app.use(yoga.graphqlEndpoint, yoga);

    console.log(`Spawned Hy ${spawnedHy.childProcess.pid}`)
    console.log("Waiting for live...");
    new Promise<void>((resolve) => {
        let interval = setInterval(() => {
            if (live()) {
                clearInterval(interval);
                innerGenerate();
                resolve();
            }
        }, 200);
    });
    app.listen(port, () => {
        console.log(`Running HTTP Server at ${port}`);
    })
}

export default run;