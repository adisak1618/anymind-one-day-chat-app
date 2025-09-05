import { useRef } from "react";
import { Composer } from "@/modules/chat/components/Composer";
import {
  ChannelId,
} from "@gql/generated/graphql";
import { MessageListContainer } from "../MessageListContainer";
import type { ErrorMessageType } from "./type";
import { useSendMessageHook } from "@/modules/chat/hooks/useSendMessageHook";
import { useChatState } from "@/modules/chat/hooks/useChatState";

type ChatPanelProps = {
  channelId: ChannelId;
};

const ChatPanel = ({ channelId }: ChatPanelProps) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const {
    selectedUserId,
    setSelectedUserId,
    errorMessages,
    messages,
    addErrorMessage,
    removeErrorMessage,
    updateChannelMessage
  } = useChatState();
  const { sendMessage } = useSendMessageHook({
    channelId,
    onError: (_, context) => {
      addErrorMessage({
        id: crypto.randomUUID(),
        channelId,
        message: context?.variables?.text ?? "",
        userId: selectedUserId,
        datetime: new Date().toISOString(),
      });
    },
  });

  const scrollToBottom = (behavior: ScrollBehavior) => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: behavior,
      });
    }
  };

  const handleMessagesLoaded = () => {
    scrollToBottom("instant");
  };

  const handleSubmit = () => {
    const text = messages[channelId].trim();
    if (!text) return;

    // Reset the message input
    updateChannelMessage(channelId, "");
    sendMessage({ text, userId: selectedUserId });
    scrollToBottom("smooth");
  };

  const handleResend = (message: ErrorMessageType) => {
    removeErrorMessage(message.id);
    sendMessage({ text: message.message, userId: message.userId });
  };

  const handleUndoSend = (messageId: ErrorMessageType["id"]) => {
    removeErrorMessage(messageId);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div
        ref={messageListRef}
        className="flex flex-col flex-1 overflow-auto rounded-md border border-gray-200 p-3 bg-white"
      >
        <MessageListContainer
          channelId={channelId}
          selectedUserId={selectedUserId}
          onMessagesLoaded={handleMessagesLoaded}
          errorMessages={errorMessages}
          onDeleteErrorMessage={removeErrorMessage}
          onResend={handleResend}
          onUndoSend={handleUndoSend}
        />
      </div>

      <Composer
        message={messages[channelId]}
        onChange={(text) => updateChannelMessage(channelId, text)}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatPanel;
