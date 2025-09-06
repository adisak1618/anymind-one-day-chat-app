import { UserId } from "@/gql/generated/graphql"
import Button from "@/ui/Button"
import SelectInput from "@/ui/SelectInput"
import TextInput from "@/ui/TextInput"
import { useChatContext } from "../../context/ChatContext"
import { SendIcon } from "@/ui/Icon"
import { useRef, type FormEvent, type KeyboardEvent } from "react"

type ComposerProps = {
  message: string
  onSubmit: () => void
  onChange: (message: string) => void
}

export const Composer = ({ message, onSubmit, onChange }: ComposerProps) => {
  const { selectedUserId, setSelectedUserId } = useChatContext();
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit();
      // Keep focus on the input after sending
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSubmit();
        // Keep focus on the input after sending
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 0);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TextInput 
        ref={textInputRef}
        className="w-full" 
        placeholder="Type a message" 
        rows={2} 
        value={message} 
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="flex justify-between">
        <SelectInput id="user-select" className="w-auto" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value as UserId)}>
          <option value={UserId.Sam}>{UserId.Sam}</option>
          <option value={UserId.Russell}>{UserId.Russell}</option>
          <option value={UserId.Joyse}>{UserId.Joyse}</option>
        </SelectInput>
        <Button 
          type="submit" 
          className="!flex flex-nowrap items-center gap-2" 
          icon={<SendIcon className="w-4 h-4 text-white" />}
        >
          Send
        </Button>
      </div>
    </form>
  )
}