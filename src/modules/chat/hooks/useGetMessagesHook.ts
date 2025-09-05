import { useMemo, useState } from "react";
import { useMessageFetchLatest } from "./useMessageFetchLatestQuery";
import { useMessagesMoreQuery } from "./useMessagesMoreQuery";
import {
  ChannelId,
  MessagesFetchLatestDocument,
  UserId,
  type MessagesFetchLatestQuery,
} from "@/gql/generated/graphql";
import apolloClient from "@/gql/client";

type NoMoreMessagesType = {
  [key in string]: boolean;
};

type UseGetMessagesHookProps = {
  channelId: ChannelId;
  selectedUserId: UserId;
};

export const useGetMessagesHook = ({
  channelId,
  selectedUserId,
}: UseGetMessagesHookProps) => {
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
  const [noMoreMessages, setNoMoreMessages] = useState<NoMoreMessagesType>({});

  const [fetchMoreMessagesMutation, { fetchMore, called: moreMessagesCalled }] =
    useMessagesMoreQuery();

  const { data, loading: isLoadingLatestMessages } =
    useMessageFetchLatest(channelId);

  const hasMoreMessages = useMemo(() => {
    // If we've received an empty response from fetchMore, no more messages
    if (noMoreMessages[channelId]) {
      return false;
    }

    // If initial data has less than 10 messages, likely no more messages
    if (data?.MessagesFetchLatest && data.MessagesFetchLatest.length < 10) {
      return false;
    }

    return true;
  }, [channelId, data, noMoreMessages]);

  const messages = useMemo(() => {
    if (!data?.MessagesFetchLatest || data?.MessagesFetchLatest?.length === 0) {
      return [];
    }
    const latestMessages = [...(data?.MessagesFetchLatest ?? [])].sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    return [...latestMessages];
  }, [data]);

  const errorMessages = useMemo(() => {
    return messages.filter((m) => m.userId === selectedUserId);
  }, [messages, selectedUserId]);

  const handleUpdateLatestMessagesCache = (
    result: MessagesFetchLatestQuery["MessagesFetchLatest"]
  ) => {
    const latestMessagesCached = apolloClient.readQuery({
      query: MessagesFetchLatestDocument,
      variables: { channelId },
    });

    apolloClient.writeQuery({
      query: MessagesFetchLatestDocument,
      variables: { channelId },
      data: {
        MessagesFetchLatest: [
          ...(latestMessagesCached?.MessagesFetchLatest ?? []),
          ...(result ?? []),
        ],
      },
    });
  };

  const fetchMoreMessages = async () => {
    setIsLoadingMoreMessages(true);

    try {
      const fetchMoreFunction = moreMessagesCalled
        ? fetchMore
        : fetchMoreMessagesMutation;

      const result = await fetchMoreFunction({
        variables: {
          channelId,
          messageId: messages[0].messageId,
          old: true,
        },
      });

      const fetchedMessages = result.data?.MessagesFetchMore;

      // Explicitly track if we received an empty response
      if (!fetchedMessages || fetchedMessages.length === 0) {
        console.log("Received empty response from fetchMore");
        setNoMoreMessages({
          ...noMoreMessages,
          [channelId]: true,
        });
      } else {
        handleUpdateLatestMessagesCache(fetchedMessages);
      }
    } catch (error) {
      console.error("Error fetching more messages:", error);
    } finally {
      setIsLoadingMoreMessages(false);
    }
  };

  return {
    fetchMoreMessages,
    messages,
    errorMessages,
    hasMoreMessages,
    noMoreMessages,
    isLoadingMoreMessages,
    isLoadingLatestMessages,
    loading: isLoadingLatestMessages || isLoadingMoreMessages,
  };
};
