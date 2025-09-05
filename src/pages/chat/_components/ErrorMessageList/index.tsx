import { Message } from "@/modules/chat/components/Message";
import type { ErrorMessageType } from "../ChatPanel/type";

type ErrorMessageListProps = {
  errorMessages: ErrorMessageType[];
};

export const ErrorMessageList = ({ errorMessages }: ErrorMessageListProps) => {
  return (
    <>
      {errorMessages.map((m) => (
        <Message
          isMe={true}
          userId={m.userId}
          text={m.message}
          messageId={m.id}
          status="error"
          datetime={new Date(m.datetime)}
          onUndoSend={() => {}}
          onResend={() => {}}
        />
      ))}
    </>
  );
};
