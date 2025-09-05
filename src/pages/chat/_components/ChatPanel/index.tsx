import { useRef, useState } from "react";
import { Composer } from "@/modules/chat/components/Composer";
import {
  ChannelId,
  UserId,
} from "@gql/generated/graphql";
import { MessageListContainer } from "../MessageListContainer";
import type { ErrorMessageType } from "./type";
import { useSendMessageHook } from "@/modules/chat/hooks/useSendMessageHook";

type ChatPanelProps = {
  channelId: ChannelId;
};

type ChannelMessagesType = {
  [key in string]: string;
};

const ChatPanel = ({ channelId }: ChatPanelProps) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<UserId>(UserId.Sam);
  const [errorMessages, setErrorMessage] = useState<ErrorMessageType[]>([]);

  const [message, setMessage] = useState<ChannelMessagesType>({});
  const { sendMessage } = useSendMessageHook({
    channelId,
    onError: (_, context) => {
      setErrorMessage([
        ...errorMessages,
        {
          id: crypto.randomUUID(),
          channelId,
          message: context?.variables?.text ?? "",
          userId: selectedUserId,
          datetime: new Date().toISOString(),
        },
      ]);
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
    const text = message[channelId].trim();
    if (!text) return;

    // Reset the message input
    setMessage({
      ...message,
      [channelId]: "",
    });
    sendMessage({ text, userId: selectedUserId });
    scrollToBottom("smooth");
  };

  const handleResend = (message: ErrorMessageType) => {
    setErrorMessage(errorMessages.filter(m => m.id !== message.id));
    sendMessage({ text: message.message, userId: message.userId });
  };

  const handleUndoSend = (messageId: ErrorMessageType["id"]) => {
    setErrorMessage(errorMessages.filter(m => m.id !== messageId));
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
          onDeleteErrorMessage={errorMessageId => setErrorMessage(errorMessages.filter(m => m.id !== errorMessageId))}
          onResend={handleResend}
          onUndoSend={handleUndoSend}
        />
      </div>

      <Composer
        message={message[channelId]}
        onChange={(text) =>
          setMessage({
            ...message,
            [channelId]: text,
          })
        }
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatPanel;
