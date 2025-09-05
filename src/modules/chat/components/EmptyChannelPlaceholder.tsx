import { cn } from "@/lib/cn";
import { ChatBubbleIcon } from "@/ui/Icon/icons/ChatBubble";

type EmptyChannelPlaceholderProps = {
  className?: string;
  channelName: string;
};

export const EmptyChannelPlaceholder = ({ className, channelName }: EmptyChannelPlaceholderProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      className
    )}>
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <ChatBubbleIcon className="w-8 h-8 text-gray-400" />
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {`Welcome to ${channelName} Channel`}
      </h3>
      
      <p className="text-sm text-gray-500 max-w-sm">
        {`This is the beginning of your conversation in ${channelName} Channel. Send a message to get started!`}
      </p>
    </div>
  );
};
