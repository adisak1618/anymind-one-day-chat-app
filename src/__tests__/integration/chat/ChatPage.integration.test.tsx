/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import ChatPage from "../../../pages/chat/page";
import { ChatProvider } from "../../../modules/chat/context/ChatContext";
import { ChannelId, UserId } from "../../../gql/generated/graphql";
import { MessagesFetchLatestDocument } from "../../../gql/generated/graphql";

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

describe("ChatPage Integration Tests", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    user = userEvent.setup();

    // Mock scrollTo for jsdom
    Element.prototype.scrollTo = jest.fn();
  });

  it("should click on LGTM channel and show welcome message with LGTM", async () => {
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
      expect(screen.getByText("General")).toBeInTheDocument();
    });

    // Click on LGTM channel
    const lgtmChannelItem = screen
      .getByText("LGTM")
      .closest(".channel-list-item");
    expect(lgtmChannelItem).toBeInTheDocument();

    await user.click(lgtmChannelItem!);

    // Wait for LGTM channel to load and show welcome message
    await waitFor(() => {
      expect(screen.getByText("Welcome to LGTM Channel")).toBeInTheDocument();
    });
  });

  it("should render messages correctly", async () => {
    const mocks = [
      {
        request: {
          query: MessagesFetchLatestDocument,
          variables: { channelId: ChannelId.General },
        },
        result: {
          data: {
            MessagesFetchLatest: [
              {
                __typename: "MessageEnum",
                userId: UserId.Sam,
                messageId: "1",
                text: "Sam Message",
                datetime: "2024-01-01T10:00:00Z",
              },
              {
                __typename: "MessageEnum",
                userId: UserId.Russell,
                messageId: "1",
                text: "Russell Message",
                datetime: "2024-01-01T10:00:00Z",
              }
            ],
          },
        },
      },
    ];

    const { container } = render(
      <TestWrapper mocks={mocks}>
        <ChatPage />
      </TestWrapper>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("General")).toBeInTheDocument();
    });

    // Select Russell from the user select dropdown
    const userSelect = container.querySelector(
      "#user-select"
    ) as HTMLSelectElement;
    expect(userSelect).toBeInTheDocument();
    await user.selectOptions(userSelect, "Russell");

    await waitFor(() => {
      // current user is Russell
      // so except Sam message should be on the left by expect className flex-row
      expect(
        screen
          .getByText("Sam Message")
          .closest(".message-container.flex-row")
      ).toBeInTheDocument();

      // current user is Russell
      // so except Russell message should be on the right by expect className flex-row-reverse
      expect(
        screen
          .getByText("Russell Message")
          .closest(".message-container.flex-row-reverse")
      ).toBeInTheDocument();
    });
  });
});
