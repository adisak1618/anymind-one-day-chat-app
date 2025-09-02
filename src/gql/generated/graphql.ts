/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A date-time with an offset from UTC/Greenwich in the ISO-8601 calendar system using the format 1970-01-01T00:00:00Z */
  OffsetDateTime: { input: any; output: any; }
};

export enum ChannelId {
  General = 'General',
  Lgtm = 'LGTM',
  Technology = 'Technology'
}

export type Message = {
  __typename?: 'Message';
  datetime: Scalars['OffsetDateTime']['output'];
  messageId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type MessageEnum = {
  __typename?: 'MessageEnum';
  datetime: Scalars['OffsetDateTime']['output'];
  messageId: Scalars['String']['output'];
  text: Scalars['String']['output'];
  userId: UserId;
};

export type Mutations = {
  __typename?: 'Mutations';
  /**
   *
   *   Post `messages`. return posted datetime when it succeeded
   *
   *   Code|Error
   *   ---|---
   *   500|`Couldn't save message, please retry.`
   *
   */
  MessagePost?: Maybe<MessageEnum>;
  /**
   *
   *   Post `messages`. return posted datetime when it succeeded
   *
   *   - `channelId` should be "1" or "2" or "3"
   *   - `userId` should be "Sam", "Russell", "Joyse"
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *   500|`Couldn't save message, please retry.`
   *
   */
  postMessage?: Maybe<Message>;
};


export type MutationsMessagePostArgs = {
  channelId: ChannelId;
  text: Scalars['String']['input'];
  userId: UserId;
};


export type MutationsPostMessageArgs = {
  channelId: Scalars['String']['input'];
  text: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Queries = {
  __typename?: 'Queries';
  /**
   *
   *   get latest `messages`
   *
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *
   */
  MessagesFetchLatest?: Maybe<Array<MessageEnum>>;
  /**
   *
   *   Get more `messages`.
   *
   *   - if `old` = true, you can fetch older messages than messageId
   *   - if `old` = false, you can fetch newer messages than messageId
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Message not found`
   *
   */
  MessagesFetchMore?: Maybe<Array<MessageEnum>>;
  /**
   *
   *   get latest `messages`
   *
   *   - `channelId` should be "1" or "2" or "3"
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *
   */
  fetchLatestMessages?: Maybe<Array<Message>>;
  /**
   *
   *   Get more `messages`.
   *
   *   - if `old` = true, you can fetch older messages than messageId
   *   - if `old` = false, you can fetch newer messages than messageId
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *   400|`Message not found`
   *
   */
  fetchMoreMessages?: Maybe<Array<Message>>;
};


export type QueriesMessagesFetchLatestArgs = {
  channelId: ChannelId;
};


export type QueriesMessagesFetchMoreArgs = {
  channelId: ChannelId;
  messageId: Scalars['String']['input'];
  old: Scalars['Boolean']['input'];
};


export type QueriesFetchLatestMessagesArgs = {
  channelId: Scalars['String']['input'];
};


export type QueriesFetchMoreMessagesArgs = {
  channelId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
  old: Scalars['Boolean']['input'];
};

export enum UserId {
  Joyse = 'Joyse',
  Russell = 'Russell',
  Sam = 'Sam'
}

export type MessagePostMutationVariables = Exact<{
  channelId: ChannelId;
  text: Scalars['String']['input'];
  userId: UserId;
}>;


export type MessagePostMutation = { __typename?: 'Mutations', MessagePost?: { __typename: 'MessageEnum', userId: UserId, messageId: string, text: string, datetime: any } | null };

export type MessagesFetchLatestQueryVariables = Exact<{
  channelId: ChannelId;
}>;


export type MessagesFetchLatestQuery = { __typename?: 'Queries', MessagesFetchLatest?: Array<{ __typename: 'MessageEnum', userId: UserId, messageId: string, text: string, datetime: any }> | null };

export type MessagesFetchMoreQueryVariables = Exact<{
  channelId: ChannelId;
  messageId: Scalars['String']['input'];
  old: Scalars['Boolean']['input'];
}>;


export type MessagesFetchMoreQuery = { __typename?: 'Queries', MessagesFetchMore?: Array<{ __typename: 'MessageEnum', userId: UserId, messageId: string, text: string, datetime: any }> | null };


export const MessagePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MessagePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MessagePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}}]}}]}}]} as unknown as DocumentNode<MessagePostMutation, MessagePostMutationVariables>;
export const MessagesFetchLatestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessagesFetchLatest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MessagesFetchLatest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}}]}}]}}]} as unknown as DocumentNode<MessagesFetchLatestQuery, MessagesFetchLatestQueryVariables>;
export const MessagesFetchMoreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessagesFetchMore"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"old"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"MessagesFetchMore"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"old"},"value":{"kind":"Variable","name":{"kind":"Name","value":"old"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"messageId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}}]}}]}}]} as unknown as DocumentNode<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>;