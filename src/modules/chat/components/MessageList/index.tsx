import type { MessageEnum, UserId } from "@/gql/generated/graphql";
import { MessageListSkeleton } from "./skeleton";
import { Message } from "../Message";

type MessageListProps = {
  messages: MessageEnum[];
  isLoading: boolean;
  currentUserId: UserId;
};

export const MessageList = ({ messages, isLoading, currentUserId }: MessageListProps) => {
  if (isLoading) {
    return <MessageListSkeleton count={5} />;
  }

  return (
    <div className="space-y-2">
      {messages?.map((m) => (
        <Message key={m.messageId} userId={m.userId} text={m.text} isMe={currentUserId === m.userId} />
      ))}
    </div>
  );
};
