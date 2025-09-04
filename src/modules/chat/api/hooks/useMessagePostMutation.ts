import { useMutation } from "@apollo/client/react";
import {
  MessagePostDocument,
  type MessagePostMutation,
  type MessagePostMutationVariables,
} from "@gql/generated/graphql";


export const useMessagePostMutation = (options?: useMutation.Options<MessagePostMutation, MessagePostMutationVariables>) => {
  return useMutation<MessagePostMutation, MessagePostMutationVariables>(
    MessagePostDocument,
    options
  );
};


