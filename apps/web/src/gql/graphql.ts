/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Generation = {
  __typename?: 'Generation';
  date: Scalars['DateTime']['output'];
  estimatedEnd?: Maybe<Scalars['DateTime']['output']>;
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  progress: Scalars['Float']['output'];
  prompt: Scalars['String']['output'];
  state: State;
  width: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteGeneration: Scalars['Boolean']['output'];
  generate: Scalars['ID']['output'];
};


export type MutationDeleteGenerationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGenerateArgs = {
  height: Scalars['Int']['input'];
  prompt: Scalars['String']['input'];
  width: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  generations?: Maybe<Array<Generation>>;
  ready?: Maybe<Scalars['Boolean']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export enum State {
  Finished = 'FINISHED',
  OnGoing = 'ON_GOING',
  Queued = 'QUEUED'
}

export type Subscription = {
  __typename?: 'Subscription';
  generationProgress: Generation;
};

export type Q_ReadyQueryVariables = Exact<{ [key: string]: never; }>;


export type Q_ReadyQuery = { __typename?: 'Query', ready?: boolean | null };

export type M_GenerateMutationVariables = Exact<{
  prompt: Scalars['String']['input'];
  width: Scalars['Int']['input'];
  height: Scalars['Int']['input'];
}>;


export type M_GenerateMutation = { __typename?: 'Mutation', generate: string };

export type Q_GenerationsQueryVariables = Exact<{ [key: string]: never; }>;


export type Q_GenerationsQuery = { __typename?: 'Query', generations?: Array<{ __typename?: 'Generation', id: string, prompt: string, progress: number, state: State, image?: string | null, date: any, estimatedEnd?: any | null, width: number, height: number }> | null };

export type S_Generation_ProgressSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type S_Generation_ProgressSubscription = { __typename?: 'Subscription', generationProgress: { __typename?: 'Generation', id: string, prompt: string, progress: number, state: State, image?: string | null, date: any, estimatedEnd?: any | null, width: number, height: number } };

export type M_Delete_GenerationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type M_Delete_GenerationMutation = { __typename?: 'Mutation', deleteGeneration: boolean };


export const Q_ReadyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Q_READY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ready"}}]}}]} as unknown as DocumentNode<Q_ReadyQuery, Q_ReadyQueryVariables>;
export const M_GenerateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"M_GENERATE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"height"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}},{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}},{"kind":"Argument","name":{"kind":"Name","value":"height"},"value":{"kind":"Variable","name":{"kind":"Name","value":"height"}}}]}]}}]} as unknown as DocumentNode<M_GenerateMutation, M_GenerateMutationVariables>;
export const Q_GenerationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Q_GENERATIONS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedEnd"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]} as unknown as DocumentNode<Q_GenerationsQuery, Q_GenerationsQueryVariables>;
export const S_Generation_ProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"S_GENERATION_PROGRESS"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generationProgress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prompt"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedEnd"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]} as unknown as DocumentNode<S_Generation_ProgressSubscription, S_Generation_ProgressSubscriptionVariables>;
export const M_Delete_GenerationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"M_DELETE_GENERATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGeneration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<M_Delete_GenerationMutation, M_Delete_GenerationMutationVariables>;