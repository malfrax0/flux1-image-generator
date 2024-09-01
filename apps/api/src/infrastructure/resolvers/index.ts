import { mergeResolvers } from "@graphql-tools/merge";
import health from "./health.resolver";
import images from "./images.resolver"

export const getResolvers = () => {
    return mergeResolvers([
        health,
        images
    ])
}

export default getResolvers;