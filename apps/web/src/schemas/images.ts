import { graphql } from "../gql";

export const generate = graphql(/* GraphQL */`
    mutation M_GENERATE($prompt: String!, $width: Int!, $height: Int!) {
        generate(prompt: $prompt, width: $width, height: $height)
    }
`);

export const generations = graphql(/* GraphQL */`
    query Q_GENERATIONS {
        generations {
            id
            prompt
            progress
            state
            image
            date
            estimatedEnd
            width
            height
        }
    }
`);

export const generationProgress = graphql(/* GraphQL */`
    subscription S_GENERATION_PROGRESS {
        generationProgress {
            id
            prompt
            progress
            state
            image
            date
            estimatedEnd
            width
            height
        }
    }
`);

export const deleteGeneration = graphql(/* GraphQL */`
    mutation M_DELETE_GENERATION($id: ID!) {
        deleteGeneration(id: $id)
    }
`);

export default {
    generate,
    generations,
    generationProgress,
    deleteGeneration,
}