import { useLazyQuery } from "@apollo/client/react";
import {
  MessagesFetchMoreDocument,
  type MessagesFetchMoreQuery,
  type MessagesFetchMoreQueryVariables,
} from "@gql/generated/graphql";

export const useMessagesMoreQuery = () => {
  return useLazyQuery<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>(
      MessagesFetchMoreDocument,
      {
        fetchPolicy: "network-only",
      },
    );

};


