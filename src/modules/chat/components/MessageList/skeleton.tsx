import Skeleton from "@/ui/Skeleton";

type MessageListSkeletonProps = {
  count?: number;
};

export const MessageListSkeleton = ({ count = 5 }: MessageListSkeletonProps) => {
  return (
    <ul className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="rounded bg-gray-50 p-2">
          <Skeleton 
            variant="text" 
            height="md" 
            width={index === count - 1 ? "lg" : "full"}
            className="bg-gray-200"
          />
        </li>
      ))}
    </ul>
  );
};
