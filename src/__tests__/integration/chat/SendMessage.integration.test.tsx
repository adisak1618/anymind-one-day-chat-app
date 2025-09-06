/* eslint-disable @typescript-eslint/no-explicit-any */
import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import ChatPage from "../../../pages/chat/page";
import { ChatProvider } from "../../../modules/chat/context/ChatContext";
import { ChannelId, UserId } from "../../../gql/generated/graphql";
import {
  MessagesFetchLatestDocument,
  MessagePostDocument,
} from "../../../gql/generated/graphql";

// Test wrapper component
const TestWrapper = ({
  children,
  mocks = [],
}: {
  children: React.ReactNode;
  mocks?: any[];
}) => (
  <MockedProvider mocks={mocks}>
    <ChatProvider>{children}</ChatProvider>
  </MockedProvider>
);

describe("SendMessage Integration Tests", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    user = userEvent.setup();

    // Mock scrollTo for jsdom
    Element.prototype.scrollTo = jest.fn();
  });

  it("should send message and display it in chat", async () => {
    const testMessage = "Hello, this is a test message!";
    
    const mocks = [
      // Mock initial fetch latest messages (empty)
      {
        request: {
          query: MessagesFetchLatestDocument,
          variables: { channelId: ChannelId.General },
        },
        result: {
          data: { MessagesFetchLatest: [] },
        },
      },
      // Mock message post mutation
      {
        request: {
          query: MessagePostDocument,
          variables: {
            channelId: ChannelId.General,
            text: testMessage,
            userId: UserId.Sam,
          },
        },
        result: {
          data: {
            MessagePost: {
              __typename: "MessageEnum",
              messageId: "new-message-1",
              text: testMessage,
              userId: UserId.Sam,
              datetime: "2024-01-01T10:00:00Z",
            },
          },
        },
      },
    ];

    const { container } = render(
      <TestWrapper mocks={mocks}>
        <ChatPage />
      </TestWrapper>
    );

    console.log("container before", prettyDOM(container.getElementsByClassName("message-list-container")[0]));
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("General")).toBeInTheDocument();
    });

    // Find the message input field
    const messageInput = screen.getByPlaceholderText("Type a message");
    expect(messageInput).toBeInTheDocument();

    // Type the test message
    await user.type(messageInput, testMessage);
    expect(messageInput).toHaveValue(testMessage);

    // Find and click the send button
    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeInTheDocument();
    await user.click(sendButton);

    // Wait for message to appear in chat
    await waitFor(() => {
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Verify message appears with correct styling (current user message on right)
    await waitFor(() => {
      expect(
        screen
          .getByText(testMessage)
          .closest(".message-container.flex-row-reverse")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen
          .getByText(testMessage)
          .closest(".message-container")
          ?.querySelector(".status-error")
      ).not.toBeInTheDocument();
    });

    console.log("container after", prettyDOM(container.getElementsByClassName("message-list-container")[0]));
    expect(container.getElementsByClassName("message-list-container")).toHaveLength(1);
    // Verify input is cleared after sending
    expect(messageInput).toHaveValue("");
  });

  it("should handle message send error gracefully", async () => {
    const testMessage = "This message will fail to send";
    
    const mocks = [
      // Mock initial fetch latest messages (empty)
      {
        request: {
          query: MessagesFetchLatestDocument,
          variables: { channelId: ChannelId.General },
        },
        result: {
          data: { MessagesFetchLatest: [] },
        },
      },
      // Mock message post mutation with error
      {
        request: {
          query: MessagePostDocument,
          variables: {
            channelId: ChannelId.General,
            text: testMessage,
            userId: UserId.Sam,
          },
        },
        error: new Error("Network error"),
      },
    ];

    render(
      <TestWrapper mocks={mocks}>
        <ChatPage />
      </TestWrapper>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("General")).toBeInTheDocument();
    });

    // Find the message input field
    const messageInput = screen.getByPlaceholderText("Type a message");
    expect(messageInput).toBeInTheDocument();

    // Type the test message
    await user.type(messageInput, testMessage);

    // Find and click the send button
    const sendButton = screen.getByRole("button", { name: /send/i });
    await user.click(sendButton);

    // Wait for message to appear in chat with resend, undo send and error status icon
    await waitFor(() => {

      const messageContainer = screen.getByText(testMessage).closest(".message-container");
      expect(
        messageContainer?.querySelector(".status-error")
      ).toBeInTheDocument();
      expect(screen.getByText('Undo Send')).toBeInTheDocument();
      expect(screen.getByText('Resend')).toBeInTheDocument();
    });
  });
});
