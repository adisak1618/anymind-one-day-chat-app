import React, { createContext, useContext, useState } from 'react';
import { ChannelId, UserId } from '@gql/generated/graphql';

type ChatContextType = {
  selectedChannel: ChannelId;
  selectedUserId: UserId;
  setSelectedChannel: (channelId: ChannelId) => void;
  setSelectedUserId: (userId: UserId) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelId>(ChannelId.General);
  const [selectedUserId, setSelectedUserId] = useState<UserId>(UserId.Sam);

  return (
    <ChatContext.Provider value={{
      selectedChannel,
      selectedUserId,
      setSelectedChannel,
      setSelectedUserId,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};