/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing/react';
import ChatPage from '../../../pages/chat/page';
import { ChatProvider } from '../../../modules/chat/context/ChatContext';
import { ChannelId } from '../../../gql/generated/graphql';
import {
  MessagesFetchLatestDocument,
} from '../../../gql/generated/graphql';

// Test wrapper component
const TestWrapper = ({ 
  children, 
  mocks = [] 
}: { 
  children: React.ReactNode; 
  mocks?: any[] 
}) => (
  <MockedProvider mocks={mocks}>
    <ChatProvider>
      {children}
    </ChatProvider>
  </MockedProvider>
);

describe('ChatPage Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    user = userEvent.setup();
    
    // Mock scrollTo for jsdom
    Element.prototype.scrollTo = jest.fn();
  });

  describe('Channel Navigation', () => {
    it('should click on LGTM channel and show welcome message with LGTM', async () => {
      const mocks = [
        // Mock for initial General channel
        {
          request: {
            query: MessagesFetchLatestDocument,
            variables: { channelId: ChannelId.General },
          },
          result: {
            data: { MessagesFetchLatest: [] },
          },
        },
        // Mock for LGTM channel
        {
          request: {
            query: MessagesFetchLatestDocument,
            variables: { channelId: ChannelId.Lgtm },
          },
          result: {
            data: { MessagesFetchLatest: [] },
          },
        },
      ];

      render(
        <TestWrapper mocks={mocks}>
          <ChatPage />
        </TestWrapper>
      );

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText('General')).toBeInTheDocument();
      });

      // Click on LGTM channel
      const lgtmChannelItem = screen.getByText('LGTM').closest('.channel-list-item');
      expect(lgtmChannelItem).toBeInTheDocument();
      
      await user.click(lgtmChannelItem!);

      // Wait for LGTM channel to load and show welcome message
      await waitFor(() => {
        expect(screen.getByText('Welcome to LGTM Channel')).toBeInTheDocument();
      });
    });
  });
});
