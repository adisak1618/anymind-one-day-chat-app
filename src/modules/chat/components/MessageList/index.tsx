import type { MessageEnum, UserId } from "@/gql/generated/graphql";
import { MessageListSkeleton } from "./skeleton";
import { Message } from "../Message";

type MessageListProps = {
  messages: MessageEnum[];
  isLoading: boolean;
  currentUserId: UserId;
};

const getMessageStatus = (message: MessageEnum) => {
  if (message.messageId === "temp-id") {
    return "loading";
  }
  return "success";
};

export const MessageList = ({
  messages,
  isLoading,
  currentUserId,
}: MessageListProps) => {
  if (isLoading) {
    return <MessageListSkeleton count={5} />;
  }

  return (
    <div className="space-y-2">
      {messages?.map((m) => (
        <Message
          key={m.messageId}
          userId={m.userId}
          text={m.text}
          isMe={currentUserId === m.userId}
          messageId={m.messageId}
          status={getMessageStatus(m)}
          datetime={new Date(m.datetime)}
        />
      ))}
    </div>
  );
};
