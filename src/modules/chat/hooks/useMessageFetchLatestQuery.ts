import { useQuery } from "@apollo/client/react";
import { ChannelId, MessagesFetchLatestDocument } from "@gql/generated/graphql";

export const useMessageFetchLatest = (channelId: ChannelId) => {
  return useQuery(MessagesFetchLatestDocument, {
    variables: { channelId },
  });
};