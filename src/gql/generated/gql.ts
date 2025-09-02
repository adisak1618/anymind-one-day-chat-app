/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {\n  MessagePost(channelId: $channelId, text: $text, userId: $userId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}": typeof types.MessagePostDocument,
    "query MessagesFetchLatest($channelId: ChannelId!) {\n  MessagesFetchLatest(channelId: $channelId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}": typeof types.MessagesFetchLatestDocument,
    "query MessagesFetchMore($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {\n  MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}": typeof types.MessagesFetchMoreDocument,
};
const documents: Documents = {
    "mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {\n  MessagePost(channelId: $channelId, text: $text, userId: $userId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}": types.MessagePostDocument,
    "query MessagesFetchLatest($channelId: ChannelId!) {\n  MessagesFetchLatest(channelId: $channelId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}": types.MessagesFetchLatestDocument,
    "query MessagesFetchMore($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {\n  MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}": types.MessagesFetchMoreDocument,
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
export function graphql(source: "mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {\n  MessagePost(channelId: $channelId, text: $text, userId: $userId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}"): (typeof documents)["mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {\n  MessagePost(channelId: $channelId, text: $text, userId: $userId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MessagesFetchLatest($channelId: ChannelId!) {\n  MessagesFetchLatest(channelId: $channelId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}"): (typeof documents)["query MessagesFetchLatest($channelId: ChannelId!) {\n  MessagesFetchLatest(channelId: $channelId) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MessagesFetchMore($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {\n  MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}"): (typeof documents)["query MessagesFetchMore($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {\n  MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {\n    __typename\n    userId\n    messageId\n    text\n    datetime\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;