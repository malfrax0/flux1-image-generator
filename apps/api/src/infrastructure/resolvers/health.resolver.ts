import repositories from "../repositories";

const ready = async () => {
    return await repositories.health.isReady();
}

const version = () => {
    return repositories.health.getVersion();
}

export default {
    Query: {
        ready,
        version
    }
}