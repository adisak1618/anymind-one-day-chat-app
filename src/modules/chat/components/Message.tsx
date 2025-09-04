import type { UserId } from "@/gql/generated/graphql";
import Avatar from "@/modules/user/components/Avatar";
import clsx from "clsx";

type MessageProps = {
  userId: UserId;
  text: string;
  isMe: boolean;
};

export const Message = ({ userId, text, isMe }: MessageProps) => {
  return (
    <div className={clsx("flex items-start gap-2 flex-row-reverse", isMe ? "flex-row-reverse" : "flex-row")}>
      <Avatar userId={userId} />
      <div>
        <div>{text}</div>
      </div>
    </div>
  );
};