import prisma from "../prisma"

const isReady = async () => {
    try {
        await Promise.race([
            prisma.$queryRaw`SELECT 1;`,
            new Promise((_resolve, reject) => {
                setTimeout(() => {
                    reject(false);
                }, 5000)
            })
        ]);
        return true;
    }
    catch (_err) {
        console.error(_err);
        return false;
    }
}

const getVersion = () => {
    return "1.0.0"
}

export default {
    getVersion,
    isReady
}