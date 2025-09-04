import { UserId } from "@/gql/generated/graphql"
import Button from "@/ui/Button"
import SelectInput from "@/ui/SelectInput"
import TextInput from "@/ui/TextInput"

type ComposerProps = {
  message: string
  onSubmit: () => void
  onChange: (message: string) => void
  selectedUserId: UserId
  setSelectedUserId: (userId: UserId) => void
}

export const Composer = ({ message, onSubmit, onChange, selectedUserId, setSelectedUserId }: ComposerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <TextInput className="w-full" placeholder="Type a message" rows={2} value={message} onChange={(e) => onChange(e.target.value)} />
      <div className="flex justify-between">
        <SelectInput className="w-auto" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value as UserId)}>
          <option value={UserId.Sam}>{UserId.Sam}</option>
          <option value={UserId.Russell}>{UserId.Russell}</option>
          <option value={UserId.Joyse}>{UserId.Joyse}</option>
        </SelectInput>
        <Button onClick={onSubmit}>Send</Button>
      </div>
    </div>
  )
}