import Skeleton from "@/ui/Skeleton";

type MessageListSkeletonLoadingProps = {
  count?: number;
};

export const MessageListSkeletonLoading = ({ count = 5 }: MessageListSkeletonLoadingProps) => {
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
