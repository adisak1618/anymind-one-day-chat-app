import type { MessageEnum } from "@/gql/generated/graphql";
import { MessageListSkeleton } from "./skeleton";
import { Message } from "../Message";

type MessageListProps = {
  messages: MessageEnum[];
  isLoading: boolean;
};

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  if (isLoading) {
    return <MessageListSkeleton count={5} />;
  }

  return (
    <div className="space-y-2">
      {messages?.map((m) => (
        <Message key={m.messageId} userId={m.userId} text={m.text} isMe={true} />
      ))}
    </div>
  );
};
