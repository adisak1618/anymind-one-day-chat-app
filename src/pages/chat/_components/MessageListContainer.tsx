import Button from "@/ui/Button";
import { forwardRef, useEffect } from "react";
import type { ErrorMessageType } from "./ChatPanel/type";
import { useGetMessagesHook } from "@/modules/chat/hooks/useGetMessagesHook";
import { Message } from "@/modules/chat/components/Message";
import { useChatContext } from "@/modules/chat/context/ChatContext";
import type { MessageEnum } from "@/gql/generated/graphql";
import { MessageListSkeletonLoading } from "@/modules/chat/components/MessageListSkeletonLoading";

type MessageListContainerProps = {
  onMessagesLoaded?: () => void;
  errorMessages: ErrorMessageType[];
  onDeleteErrorMessage: (messageId: ErrorMessageType["id"]) => void;
  onUndoSend: (messageId: ErrorMessageType["id"]) => void;
  onResend: (message: ErrorMessageType) => void;
};

export const MessageListContainer = forwardRef<
  HTMLDivElement,
  MessageListContainerProps
>(({ onMessagesLoaded, errorMessages, onUndoSend, onResend }, ref) => {
  const { selectedChannel, selectedUserId } = useChatContext();
  const {
    fetchMoreMessages,
    messages,
    hasMoreMessages,
    isLoadingMoreMessages,
    isLoadingLatestMessages,
  } = useGetMessagesHook({ channelId: selectedChannel, selectedUserId });

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
      <div className="space-y-2">
        {isLoadingLatestMessages && <MessageListSkeletonLoading count={10} />}
        {messages?.map((m) => (
          <Message
            key={m.messageId}
            userId={m.userId}
            text={m.text}
            isMe={selectedUserId === m.userId}
            messageId={m.messageId}
            status={getMessageStatus(m)}
            datetime={new Date(m.datetime)}
          />
        ))}
        {!isLoadingLatestMessages &&
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
          ))}
      </div>
    </div>
  );
});

const getMessageStatus = (message: MessageEnum) => {
  if (message.messageId === "temp-id") {
    return "loading";
  }
  return "success";
};
