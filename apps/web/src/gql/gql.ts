/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query Q_READY {\n        ready\n    }\n": types.Q_ReadyDocument,
    "\n    mutation M_GENERATE($prompt: String!, $width: Int!, $height: Int!) {\n        generate(prompt: $prompt, width: $width, height: $height)\n    }\n": types.M_GenerateDocument,
    "\n    query Q_GENERATIONS {\n        generations {\n            id\n            prompt\n            progress\n            state\n            image\n            date\n            estimatedEnd\n            width\n            height\n        }\n    }\n": types.Q_GenerationsDocument,
    "\n    subscription S_GENERATION_PROGRESS {\n        generationProgress {\n            id\n            prompt\n            progress\n            state\n            image\n            date\n            estimatedEnd\n            width\n            height\n        }\n    }\n": types.S_Generation_ProgressDocument,
    "\n    mutation M_DELETE_GENERATION($id: ID!) {\n        deleteGeneration(id: $id)\n    }\n": types.M_Delete_GenerationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Q_READY {\n        ready\n    }\n"): (typeof documents)["\n    query Q_READY {\n        ready\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation M_GENERATE($prompt: String!, $width: Int!, $height: Int!) {\n        generate(prompt: $prompt, width: $width, height: $height)\n    }\n"): (typeof documents)["\n    mutation M_GENERATE($prompt: String!, $width: Int!, $height: Int!) {\n        generate(prompt: $prompt, width: $width, height: $height)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query Q_GENERATIONS {\n        generations {\n            id\n            prompt\n            progress\n            state\n            image\n            date\n            estimatedEnd\n            width\n            height\n        }\n    }\n"): (typeof documents)["\n    query Q_GENERATIONS {\n        generations {\n            id\n            prompt\n            progress\n            state\n            image\n            date\n            estimatedEnd\n            width\n            height\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription S_GENERATION_PROGRESS {\n        generationProgress {\n            id\n            prompt\n            progress\n            state\n            image\n            date\n            estimatedEnd\n            width\n            height\n        }\n    }\n"): (typeof documents)["\n    subscription S_GENERATION_PROGRESS {\n        generationProgress {\n            id\n            prompt\n            progress\n            state\n            image\n            date\n            estimatedEnd\n            width\n            height\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation M_DELETE_GENERATION($id: ID!) {\n        deleteGeneration(id: $id)\n    }\n"): (typeof documents)["\n    mutation M_DELETE_GENERATION($id: ID!) {\n        deleteGeneration(id: $id)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;