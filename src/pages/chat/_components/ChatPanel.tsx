import { useMemo, useState } from "react";
import { Composer } from "@/modules/chat/components/Composer";
import { useMessagePostMutation } from "@/modules/chat/api/hooks/useMessagePostMutation";
import {
  ChannelId,
  MessagesFetchLatestDocument,
  UserId,
  type MessagesFetchLatestQuery,
} from "@gql/generated/graphql";
import { useMessageFetchLatest } from "@/modules/chat/api/hooks/useMessageFetchLatestQuery";
import { MessageList } from "@/modules/chat/components/MessageList";

type ChatPanelProps = {
  channelId: ChannelId;
};

type ChannelMessagesType = {
  [key in string]: string
};


const ChatPanel = ({ channelId }: ChatPanelProps) => {
  const { data, loading } = useMessageFetchLatest(channelId);
  const [message, setMessage] = useState<ChannelMessagesType>({});
  const [postMessage] = useMessagePostMutation({
    update: (cache, data) => {
      const cachedData = cache.readQuery<MessagesFetchLatestQuery>({
        query: MessagesFetchLatestDocument,
        variables: { channelId },
      });

      if(!data?.data?.MessagePost) return;
      
      cache.writeQuery({
        query: MessagesFetchLatestDocument,
        variables: { channelId },
        data: { MessagesFetchLatest: [...(cachedData?.MessagesFetchLatest ?? []), data?.data?.MessagePost] },
      });
    },
  });

  const handleSubmit = () => {
    const text = message[channelId].trim();
    if (!text) return;

    postMessage({
      variables: {
        channelId,
        userId: UserId.Sam,
        text,
      },
      optimisticResponse: {
        MessagePost: {
          __typename: "MessageEnum",
          userId: UserId.Sam,
          messageId: "temp-id",
          text,
          datetime: new Date().toISOString(),
        },
      },
      onCompleted: () => {
        setMessage({
          ...message,
          [channelId]: "",
        });
      },
    });
  };

  const messages = useMemo(() => {
    if (!data?.MessagesFetchLatest || data?.MessagesFetchLatest?.length === 0) {
      return [];
    }
    return [...(data?.MessagesFetchLatest ?? [])].sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
  }, [data]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 overflow-auto rounded-md border border-gray-200 p-3 bg-white">
        <MessageList messages={messages} isLoading={loading} />
      </div>

      <Composer
        key={channelId}
        message={message[channelId]}
        onChange={text => setMessage({
          ...message,
          [channelId]: text,
        })}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatPanel;
