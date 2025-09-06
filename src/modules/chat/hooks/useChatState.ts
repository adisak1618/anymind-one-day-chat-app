import type { ErrorMessageType } from "@/pages/chat/_components/ChatPanel/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useChatContext } from "../context/ChatContext";

type ChannelMessagesType = {
  [key in string]: string;
};

export const useChatState = () => {
  const { selectedChannel, selectedUserId } = useChatContext();
  const [errorMessages, setErrorMessages] = useLocalStorage<ErrorMessageType[]>('chat-error-messages', []);
  const [messages, setMessages] = useLocalStorage<ChannelMessagesType>('chat-messages', {});

  const addErrorMessage = (errorMessage: ErrorMessageType) => {
    setErrorMessages((prev) => [...prev, errorMessage]);
  };

  const removeErrorMessage = (messageId: string) => {
    setErrorMessages((prev) => prev.filter(m => m.id !== messageId));
  };

  const updateChannelMessage = (channelId: string, text: string) => {
    setMessages((prev) => ({
      ...prev,
      [channelId]: text,
    }));
  };

  return {
    // State values
    errorMessages: errorMessages?.filter(m => m.channelId === selectedChannel && m.userId === selectedUserId),
    messages,
    
    // State setters
    setErrorMessages,
    setMessages,
    
    // Helper functions
    addErrorMessage,
    removeErrorMessage,
    updateChannelMessage,
  };
};
