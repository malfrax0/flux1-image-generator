import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { createYoga } from "graphql-yoga";
import getTypeDefs from './schemas';
import getResolvers from './resolvers';
import env from '../config/env';
import cors from "cors";

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

    app.listen(port, () => {
        console.log(`Running HTTP Server at ${port}`);
    })
}

export default run;