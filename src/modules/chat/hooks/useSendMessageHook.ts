import { ChannelId, MessagesFetchLatestDocument, UserId, type MessagePostMutation, type MessagePostMutationVariables, type MessagesFetchLatestQuery } from "@/gql/generated/graphql";
import { useMessagePostMutation } from "./useMessagePostMutation";
import type { useMutation } from "@apollo/client/react";

type UseSendMessageHookProps = {
  channelId: ChannelId;
  onCompleted?: useMutation.Options<MessagePostMutation, MessagePostMutationVariables>["onCompleted"];
  onError?: useMutation.Options<MessagePostMutation, MessagePostMutationVariables>["onError"];
};

type sendMessageProps = {
  text: string;
  userId: UserId;
};

export const useSendMessageHook = ({ channelId, onCompleted, onError }: UseSendMessageHookProps) => {
  const [mutation] = useMessagePostMutation({
    update: (cache, data) => {
      const cachedData = cache.readQuery<MessagesFetchLatestQuery>({
        query: MessagesFetchLatestDocument,
        variables: { channelId },
      });

      if (!data?.data?.MessagePost) return;

      cache.writeQuery({
        query: MessagesFetchLatestDocument,
        variables: { channelId },
        data: {
          MessagesFetchLatest: [
            ...(cachedData?.MessagesFetchLatest ?? []),
            data?.data?.MessagePost,
          ],
        },
      });
    },
  });

  const sendMessage = ({ text, userId }: sendMessageProps) => {
    mutation({
      variables: {
        channelId,
        userId,
        text,
      },
      optimisticResponse: {
        MessagePost: {
          __typename: "MessageEnum",
          userId,
          messageId: "temp-id",
          text,
          datetime: new Date().toISOString(),
        },
      },
      onCompleted,
      onError,
    });
  };


  return { sendMessage }
};