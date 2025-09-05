import type { UserId } from "@/gql/generated/graphql";
import Avatar from "@/modules/user/components/Avatar";
import { cn } from "@/lib/cn";
import { ErrorIcon, LoadingIcon, SuccessIcon } from "@/ui/Icon";
import clsx from "clsx";
import { formatDate } from "date-fns";

type MessageProps = {
  userId: UserId;
  text: string;
  isMe: boolean;
  messageId: string;
  status: "loading" | "success" | "error";
  datetime: Date;
  onResend?: () => void;
  onUndoSend?: () => void;
};

export const Message = ({ userId, text, isMe, status, messageId, datetime, onResend, onUndoSend }: MessageProps) => {
  return (
    <div key={messageId} className={cn("flex items-end gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
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
      <MessageStatus status={status} />
      <p className="text-xs text-gray-500">{formatDate(datetime, "HH:mm")}</p>      
      {status === "error" && onUndoSend && <p className="text-xs text-red-500 cursor-pointer hover:underline hover:font-medium" onClick={onUndoSend}>Undo Send</p>}
      {status === "error" && onResend && <p className="text-xs text-blue-500 cursor-pointer hover:underline hover:font-medium" onClick={onResend}>Resend</p>}
    </div>
  );
};

function MessageStatus({ status }: Pick<MessageProps, "status">) {
  const baseClassName = "w-4 h-4";
  return (
    <div>
      {status === "loading" && <LoadingIcon className={clsx(baseClassName, "text-blue-500 animate-spin")} />}
      {status === "success" && <SuccessIcon className={clsx(baseClassName, "text-green-500")} />}
      {status === "error" && <ErrorIcon className={clsx(baseClassName, "text-red-500")} />}
    </div>
  )
}