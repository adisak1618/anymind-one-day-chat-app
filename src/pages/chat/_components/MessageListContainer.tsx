import {
  type ChannelId,
  type UserId,
} from "@/gql/generated/graphql";
import { MessageList } from "@/modules/chat/components/MessageList";
import Button from "@/ui/Button";
import { forwardRef, useEffect } from "react";
import { ErrorMessageList } from "./ErrorMessageList";
import type { ErrorMessageType } from "./ChatPanel/type";
import { useGetMessagesHook } from "@/modules/chat/hooks/useGetMessagesHook";

type MessageListContainerProps = {
  channelId: ChannelId;
  selectedUserId: UserId;
  onMessagesLoaded?: () => void;
  errorMessages: ErrorMessageType[];
};

export const MessageListContainer = forwardRef<HTMLDivElement, MessageListContainerProps>(({
  channelId,
  selectedUserId,
  onMessagesLoaded,
  errorMessages,
}, ref) => {

  const { fetchMoreMessages, messages, hasMoreMessages, isLoadingMoreMessages, loading } = useGetMessagesHook({ channelId });
  
  useEffect(() => {
    if (messages.length > 0 && !loading && onMessagesLoaded) {
      onMessagesLoaded();
    }
  }, [messages.length, loading, onMessagesLoaded]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {!loading && hasMoreMessages && (
        <div className="flex justify-center">
          <Button onClick={() => fetchMoreMessages()}>
            {isLoadingMoreMessages ? "Loading..." : "Fetch More Messages"}
          </Button>
        </div>
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
