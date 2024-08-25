import { graphql } from "../gql";

export const ready = graphql(/* GraphQL */`
    query Q_READY {
        ready
    }
`);

export default {
    ready
}