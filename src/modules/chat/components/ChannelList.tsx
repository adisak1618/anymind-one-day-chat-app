import { ChannelId } from "@/gql/generated/graphql";
import clsx from "clsx";

type ChannelListProps = {
  channels: ChannelId[]
  selectedChannel: ChannelId
  setSelectedChannel: (channel: ChannelId) => void
}

export const ChannelList = ({ channels,selectedChannel, setSelectedChannel }: ChannelListProps) => {
  return (
    <div>
      <p className="mb-3 text-base">2. Choose your channel</p>
      <div className="space-y-1">
        {channels.map((channel) => (
          <div key={channel} onClick={() => setSelectedChannel(channel)}>
            <p className={clsx("text-sm font-medium px-3 py-1 cursor-pointer hover:bg-slate-200 rounded-sm", selectedChannel === channel ? "bg-slate-200" : "")}>{channel}</p>
          </div>
        ))}
      </div>
    </div>
  )
}