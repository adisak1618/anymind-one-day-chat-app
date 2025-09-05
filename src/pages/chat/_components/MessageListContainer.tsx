import { type ChannelId, type UserId } from "@/gql/generated/graphql";
import { MessageList } from "@/modules/chat/components/MessageList";
import Button from "@/ui/Button";
import { forwardRef, useEffect } from "react";
import type { ErrorMessageType } from "./ChatPanel/type";
import { useGetMessagesHook } from "@/modules/chat/hooks/useGetMessagesHook";
import { Message } from "@/modules/chat/components/Message";

type MessageListContainerProps = {
  channelId: ChannelId;
  selectedUserId: UserId;
  onMessagesLoaded?: () => void;
  errorMessages: ErrorMessageType[];
  onDeleteErrorMessage: (messageId: ErrorMessageType["id"]) => void;
  onUndoSend: (messageId: ErrorMessageType["id"]) => void;
  onResend: (message: ErrorMessageType) => void;
};

export const MessageListContainer = forwardRef<
  HTMLDivElement,
  MessageListContainerProps
>(({ channelId, selectedUserId, onMessagesLoaded, errorMessages, onUndoSend, onResend }, ref) => {
  const {
    fetchMoreMessages,
    messages,
    hasMoreMessages,
    isLoadingMoreMessages,
    isLoadingLatestMessages
  } = useGetMessagesHook({ channelId, selectedUserId });

  useEffect(() => {
    if (messages.length > 0 && !isLoadingLatestMessages && onMessagesLoaded) {
      onMessagesLoaded();
    }
  }, [messages.length, isLoadingLatestMessages, onMessagesLoaded]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {!isLoadingLatestMessages && hasMoreMessages && (
        <div className="flex justify-center">
          <Button onClick={() => fetchMoreMessages()}>
            {isLoadingMoreMessages ? "Loading..." : "Fetch More Messages"}
          </Button>
        </div>
      )}
      <MessageList
        messages={messages}
        isLoading={isLoadingLatestMessages}
        currentUserId={selectedUserId}
      />
      {!isLoadingLatestMessages && (
        errorMessages.map((m) => (
          <Message
            isMe={true}
            userId={m.userId}
            text={m.message}
            messageId={m.id}
            status="error"
            datetime={new Date(m.datetime)}
            onUndoSend={() => onUndoSend(m.id)}
            onResend={() => onResend(m)}
          />
        ))
      )}
    </div>
  );
});
