import { useLazyQuery } from "@apollo/client/react";
import {
  ChannelId,
  MessagesFetchMoreDocument,
  type MessagesFetchMoreQuery,
  type MessagesFetchMoreQueryVariables,
} from "@gql/generated/graphql";

type FetchMoreParams = {
  channelId: ChannelId;
  messageId: string;
  old: boolean;
};

export const useMessagesMoreQuery = () => {
  const [execute, { data, loading, error, called, refetch, networkStatus }] =
    useLazyQuery<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>(
      MessagesFetchMoreDocument,
      {
        fetchPolicy: "network-only",
      }
    );

  const fetchMoreMessages = (params: FetchMoreParams) =>
    execute({ variables: params });

  return { fetchMoreMessages, data, loading, error, called, refetch, networkStatus };
};


