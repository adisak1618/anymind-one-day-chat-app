import { useCallback, useRef } from "react";
import { Composer } from "@/modules/chat/components/Composer";
import { MessageListContainer } from "../MessageListContainer";
import type { ErrorMessageType } from "./type";
import { useSendMessageHook } from "@/modules/chat/hooks/useSendMessageHook";
import { useChatState } from "@/modules/chat/hooks/useChatState";
import { useChatContext } from "@/modules/chat/context/ChatContext";

const ChatPanel = () => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const {
    errorMessages,
    messages,
    addErrorMessage,
    removeErrorMessage,
    updateChannelMessage
  } = useChatState();
  const { selectedChannel, selectedUserId } = useChatContext();
  const { sendMessage } = useSendMessageHook({
    channelId: selectedChannel,
    onError: (_, context) => {
      addErrorMessage({
        id: crypto.randomUUID(),
        channelId: selectedChannel,
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

  // useCallback to avoid re-rendering on MessageListContainer component
  const handleMessagesLoaded = useCallback(() => {
    scrollToBottom("instant");
  }, []);

  const handleSubmit = () => {
    const text = messages[selectedChannel].trim();
    if (!text) return;

    // Reset the message input when submit
    updateChannelMessage(selectedChannel, "");
    sendMessage({ text, userId: selectedUserId });
    setTimeout(() => {
      scrollToBottom("smooth");
    }, 100);
  };

  const handleResend = (message: ErrorMessageType) => {
    removeErrorMessage(message.id);
    sendMessage({ text: message.message, userId: message.userId, skipError: true });
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
          onMessagesLoaded={handleMessagesLoaded}
          errorMessages={errorMessages}
          onDeleteErrorMessage={removeErrorMessage}
          onResend={handleResend}
          onUndoSend={handleUndoSend}
        />
      </div>

      <Composer
        message={messages[selectedChannel]}
        onChange={(text) => updateChannelMessage(selectedChannel, text)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatPanel;
