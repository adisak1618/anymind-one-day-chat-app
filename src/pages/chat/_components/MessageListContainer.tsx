import apolloClient from "@/gql/client";
import {
  MessagesFetchLatestDocument,
  type ChannelId,
  type MessagesFetchLatestQuery,
  type UserId,
} from "@/gql/generated/graphql";
import { useMessageFetchLatest } from "@/modules/chat/api/hooks/useMessageFetchLatestQuery";
import { useMessagesMoreQuery } from "@/modules/chat/api/hooks/useMessagesMoreQuery";
import { MessageList } from "@/modules/chat/components/MessageList";
import Button from "@/ui/Button";
import { forwardRef, useMemo, useState, useEffect } from "react";
import { ErrorMessageList } from "./ErrorMessageList";
import type { ErrorMessageType } from "./ChatPanel/type";

type MessageListContainerProps = {
  channelId: ChannelId;
  selectedUserId: UserId;
  onMessagesLoaded?: () => void;
  errorMessages: ErrorMessageType[];
};

type NoMoreMessagesType = {
  [key in string]: boolean;
};

export const MessageListContainer = forwardRef<HTMLDivElement, MessageListContainerProps>(({
  channelId,
  selectedUserId,
  onMessagesLoaded,
  errorMessages,
}, ref) => {
  // loading in useLazyQuery is bugged, so we need to use a state to track the loading
  const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false);
  const [noMoreMessages, setNoMoreMessages] = useState<NoMoreMessagesType>({});
  
  const [
    fetchMoreMessages,
    {
      fetchMore,
      called: moreMessagesCalled,
    },
  ] = useMessagesMoreQuery();

  // Reset state when channel changes

  const { data, loading } = useMessageFetchLatest(channelId);

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

  // Call onMessagesLoaded when messages are loaded
  useEffect(() => {
    if (messages.length > 0 && !loading && onMessagesLoaded) {
      onMessagesLoaded();
    }
  }, [messages.length, loading, onMessagesLoaded]);

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

  const handleFetchMoreMessages = async () => {
    setIsLoadingMoreMessages(true);

    try {
      const fetchMoreFunction = moreMessagesCalled ? fetchMore : fetchMoreMessages;

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

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {!loading && hasMoreMessages && (
        <Button onClick={() => handleFetchMoreMessages()}>
          {isLoadingMoreMessages ? "Loading..." : "Fetch More Messages"}
        </Button>
      )}
      <MessageList
        messages={messages}
        isLoading={loading}
        currentUserId={selectedUserId}
      />
      {!loading && <ErrorMessageList errorMessages={errorMessages.filter((m) => m.channelId === channelId && m.userId === selectedUserId)} />}
    </div>
  );
});
