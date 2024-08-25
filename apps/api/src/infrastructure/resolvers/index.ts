import { mergeResolvers } from "@graphql-tools/merge";
import health from "./health.resolver";

export const getResolvers = () => {
    return mergeResolvers([
        health
    ])
}

export default getResolvers;