import {
  StramlabsBitsMessage,
  StramlabsDonationMessage,
  StramlabsRaidMessage,
  StramlabsResubMessage,
  StramlabsSubscriptionMessage,
  StreamlabsEventType,
  StreamlabsFollowMessage,
  StreamlabsMessage,
} from '@/types/Streamlabs';
import { v4 as uuidv4 } from 'uuid';
import { AudioRegistry } from './audio';

export interface Notification {
  type?: 'gecko' | 'icon';
  label?: string;
  text: string | string[];
  message?: string;
  sound?: keyof AudioRegistry;
  color: 'orange' | 'blue' | 'purple' | 'red' | 'green' | string;
  id?: string;
  ref?: Element | null;
  status?: 'PENDING' | 'STARTED' | 'WAITING' | 'ENDED';
  duration?: number;
}

export interface IconNotification extends Notification {
  icon: string[];
}

const notificationTypeMap: {[key: string]: string[]} = {
  follow: ['follow'],
  subscription: ['subscription', 'resub'],
  bits: ['bits'],
  raid: ['raid'],
  donation: ['donation'],
};

export function getNotificationType(messageType: string): string | undefined {
  return Object
    .keys(notificationTypeMap)
    .find((key) => notificationTypeMap[key].includes(messageType));
}

export function isNotification(messageType: string): boolean {
  return !!getNotificationType(messageType);
}

export function messageToNotification(
  message: StreamlabsMessage,
  type: StreamlabsEventType,
): Notification | undefined {
  const notifType = getNotificationType(type);
  if (!notifType) { return undefined; }

  const notifTypeLabelMap: { [key: string]: (message: any) => Notification } = {
    follow: (m: StreamlabsFollowMessage) => ({
      label: 'NEW FOLLOW',
      text: `${m.name}`,
      color: 'orange',
      sound: 'notificationDefault',
    }),
    subscription: (m: StramlabsSubscriptionMessage & StramlabsResubMessage) => ({
      label: 'NEW SUBSCRIPTION',
      text: m.streak_months ? `${m.name} resubed for ${m.streak_months} months!` : `${m.name}`,
      color: 'blue',
      sound: 'notificationDefault',
    }),
    bits: (m: StramlabsBitsMessage) => ({
      label: 'NEW BITS',
      text: `${m.name}`,
      color: 'purple',
      sound: 'notificationDefault',
    }),
    raid: (m: StramlabsRaidMessage) => ({
      label: 'RAID INCOMMING !',
      text: `${m.name} is comming with ${m.raiders} people`,
      color: 'red',
      sound: 'notificationDefault',
    }),
    donation: (m: StramlabsDonationMessage) => ({
      label: 'DONATION',
      text: `${m.name} donated ${m.formatted_amount}`,
      message: m.message,
      color: 'green',
      sound: 'notificationDefault',
    }),
  };

  const notif = notifTypeLabelMap[notifType](message);
  notif.id = uuidv4();
  notif.status = 'PENDING';
  notif.type = 'gecko';
  notif.duration = 5000;

  return notif;
}
