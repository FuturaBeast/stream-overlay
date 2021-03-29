export interface StreamlabsMessage {
  id?: number;
  name: string;
  _id: string;
  isTest?: boolean;
  priority: number;
}

export interface StramlabsSubscriptionMessage extends StreamlabsMessage {
  month: number;
  message: string;
  emotes: any[];
  sub_plan: '1000' | '2000' | '3000';
}

export interface StramlabsResubMessage extends StramlabsSubscriptionMessage {
  amount: number;
  streak_months: number;
}

export interface StramlabsDonationMessage extends StreamlabsMessage {
  amount: number;
  currency: 'EUR';
  formatted_amount: string;
  from: string;
  from_user_id: number;
  message: string;
  to: { name: string };
}

export interface StramlabsHostMessage extends StreamlabsMessage {
  viewers: number;
}

export type StreamlabsFollowMessage = StreamlabsMessage

export interface StramlabsBitsMessage extends StreamlabsMessage {
  amount: number;
  currency: 'EUR';
  message: string;
}

export interface StramlabsRaidMessage extends StreamlabsMessage {
  raiders: number;
}

export interface StramlabsPrimeSubGiftMessage extends StreamlabsMessage {
  gift_type: 'monthly';
  from: string;
  to: string;
}

export type StramlabsMessages = StramlabsSubscriptionMessage[]
  | StramlabsResubMessage[]
  | StramlabsDonationMessage[]
  | StramlabsHostMessage[]
  | StreamlabsFollowMessage[]
  | StramlabsBitsMessage[]
  | StramlabsRaidMessage[]
  | StramlabsPrimeSubGiftMessage[];

export type StreamlabsEventType = 'donation' | 'subscription' | 'resub' | 'follow' | 'host' | 'bits' | 'raid' | 'prime_sub_gift';

export interface StreamlabsEvent {
  type: StreamlabsEventType;
  message: StramlabsMessages;
  for: 'stramlabs' | 'twitch_account';
  event_id: string;
}
