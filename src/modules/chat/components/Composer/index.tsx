import Button from "@/ui/Button"
import TextInput from "@/ui/TextInput"

type ComposerProps = {
  message: string
  onSubmit: () => void
  onChange: (message: string) => void
}

export const Composer = ({ message, onSubmit, onChange }: ComposerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <TextInput className="w-full" placeholder="Type a message" rows={2} value={message} onChange={(e) => onChange(e.target.value)} />
      <div className="flex justify-between">
        <p>User Profile Selector</p>
        <Button onClick={onSubmit}>Send</Button>
      </div>
    </div>
  )
}