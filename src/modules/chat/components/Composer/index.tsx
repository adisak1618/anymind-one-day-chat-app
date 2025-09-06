import { UserId } from "@/gql/generated/graphql"
import Button from "@/ui/Button"
import SelectInput from "@/ui/SelectInput"
import TextInput from "@/ui/TextInput"
import { useChatContext } from "../../context/ChatContext"
import { SendIcon } from "@/ui/Icon"

type ComposerProps = {
  message: string
  onSubmit: () => void
  onChange: (message: string) => void
}

export const Composer = ({ message, onSubmit, onChange }: ComposerProps) => {
  const { selectedUserId, setSelectedUserId } = useChatContext();
  return (
    <div className="flex flex-col gap-2">
      <TextInput className="w-full" placeholder="Type a message" rows={2} value={message} onChange={(e) => onChange(e.target.value)} />
      <div className="flex justify-between">
        <SelectInput id="user-select" className="w-auto" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value as UserId)}>
          <option value={UserId.Sam}>{UserId.Sam}</option>
          <option value={UserId.Russell}>{UserId.Russell}</option>
          <option value={UserId.Joyse}>{UserId.Joyse}</option>
        </SelectInput>
        <Button className="!flex flex-nowrap items-center gap-2" onClick={onSubmit} icon={<SendIcon className="w-4 h-4 text-white" />}>Send</Button>
      </div>
    </div>
  )
}