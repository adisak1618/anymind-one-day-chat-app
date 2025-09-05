import type { ChannelId, UserId } from "@/gql/generated/graphql";

export type ErrorMessageType = {
  id: string;
  channelId: ChannelId;
  message: string;
  userId: UserId;
  datetime: string;
}