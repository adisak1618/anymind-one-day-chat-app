import Skeleton from "@/ui/Skeleton";
import { cn } from "@/lib/cn";

type MessageListSkeletonLoadingProps = {
  count?: number;
};

export const MessageListSkeletonLoading = ({ count = 5 }: MessageListSkeletonLoadingProps) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => {
        const isMe = index % 2 === 1;
        
        return (
          <div key={index} className={cn("flex items-end gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
            <Skeleton 
              variant="circular" 
              className="w-10 h-10"
            />
            <Skeleton 
                variant="text" 
                height="sm" 
                width="lg"
                className="px-4 py-3 rounded-2xl max-w-xs bg-gray-200"
              />
          </div>
        );
      })}
    </div>
  );
};
