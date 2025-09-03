import { useMutation } from "@apollo/client/react";
import {
  MessagePostDocument,
  type MessagePostMutation,
  type MessagePostMutationVariables,
} from "@gql/generated/graphql";

export const useMessagePostMutation = () => {
  return useMutation<MessagePostMutation, MessagePostMutationVariables>(
    MessagePostDocument
  );
};


