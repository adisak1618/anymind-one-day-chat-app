import { useState } from "react";
import { UserId } from "@gql/generated/graphql";
import type { ErrorMessageType } from "@/pages/chat/_components/ChatPanel/type";

type ChannelMessagesType = {
  [key in string]: string;
};

export const useChatState = () => {
  const [selectedUserId, setSelectedUserId] = useState<UserId>(UserId.Sam);
  const [errorMessages, setErrorMessages] = useState<ErrorMessageType[]>([]);
  const [messages, setMessages] = useState<ChannelMessagesType>({});

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
    selectedUserId,
    errorMessages,
    messages,
    
    // State setters
    setSelectedUserId,
    setErrorMessages,
    setMessages,
    
    // Helper functions
    addErrorMessage,
    removeErrorMessage,
    updateChannelMessage,
  };
};
