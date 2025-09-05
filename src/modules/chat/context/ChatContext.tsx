import React, { createContext, useContext } from 'react';
import { ChannelId, UserId } from '@gql/generated/graphql';
import { useLocalStorage } from '@/lib/useLocalStorage';

type ChatContextType = {
  selectedChannel: ChannelId;
  selectedUserId: UserId;
  setSelectedChannel: (channelId: ChannelId) => void;
  setSelectedUserId: (userId: UserId) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useLocalStorage<ChannelId>('channel-id', ChannelId.General);
  const [selectedUserId, setSelectedUserId] = useLocalStorage<UserId>('user-id', UserId.Sam);

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