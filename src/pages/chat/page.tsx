import { ChannelId } from '@/gql/generated/graphql'
import { ChannelList } from '@/modules/chat/components/ChannelList'
import ChatPanel from '@/pages/chat/_components/ChatPanel'
import { useState } from 'react'


const Channels = Object.values(ChannelId);

const ChatPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelId>(ChannelId.General)
  
  
  return (
    <div className='flex divide-x divide-gray-200 bg-red-50 h-full'>
      <div className='w-[250px] py-6 px-4 space-y-3'>
        <div>
          <p>1.Choose your user</p>
        </div>
        <ChannelList channels={Channels} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
      </div>
      <div className='flex flex-col flex-1 p-4'>
        <ChatPanel channelId={selectedChannel} />
      </div>
    </div>
  )
}

export default ChatPage