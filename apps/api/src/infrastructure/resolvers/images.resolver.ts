import repositories from "../repositories"
import { pubSubGeneration } from "../repositories/images.repository";

const generate = async (_, props: { prompt: string, width: number, height: number}) => {
    return await repositories.images.generate(props.prompt, props.width, props.height);
}

const generations = async () => {
    return await repositories.images.getAllGeneration();
}

const deleteGeneration = async (_, props: { id: string }) => {
    await repositories.images.deleteGeneration(props.id);
    return true;
}

export default {
    Query: {
        generations
    },
    Mutation: {
        generate,
        deleteGeneration,
    },
    Subscription: {
        generationProgress: {
            subscribe: () => pubSubGeneration.subscribe("generationProgress"),
            resolve: payload => payload
        }
    }
}