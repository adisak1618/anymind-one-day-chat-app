import type { MessageEnum } from "@/gql/generated/graphql";

type MessageListProps = {
  messages: MessageEnum[];
};

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <ul className="space-y-2">
      {messages?.map((m) => (
        <li key={m.messageId} className="rounded bg-gray-50 p-2 text-gray-800">
          {m.text}
        </li>
      ))}
    </ul>
  );
};
