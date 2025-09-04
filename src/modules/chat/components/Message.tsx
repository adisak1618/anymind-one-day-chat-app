import type { UserId } from "@/gql/generated/graphql";
import Avatar from "@/modules/user/components/Avatar";
import { cn } from "@/lib/cn";

type MessageProps = {
  userId: UserId;
  text: string;
  isMe: boolean;
  messageId: string;
};

export const Message = ({ userId, text, isMe, messageId }: MessageProps) => {
  return (
    <div className={cn("flex items-end gap-2 mb-4", isMe ? "flex-row-reverse" : "flex-row")}>
      <Avatar userId={userId} />
      <div className="relative max-w-xs lg:max-w-md">
        {/* Chat bubble */}
        <div
          className={cn(
            "px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap",
            isMe 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 text-gray-900"
          )}
        >
          {text}
        </div>
        
        {/* Arrow pointing to avatar */}
        <div
          className={cn(
            "absolute bottom-3 w-0 h-0",
            isMe
              ? "right-[-6px] border-l-[12px] border-l-blue-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"
              : "left-[-6px] border-r-[12px] border-r-gray-200 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"
          )}
        />
      </div>
      <p className="text-xs text-gray-500">{messageId === "temp-id" ? "sending..." : "sended"}</p>
    </div>
  );
};