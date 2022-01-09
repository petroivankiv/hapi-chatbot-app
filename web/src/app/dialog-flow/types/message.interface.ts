export enum ResponseType {
  Text = 'text',
  Link = 'link',
  Card = 'card',
  QuickReplies = 'quick_replies',
}

export interface QuickReply {
  label: string;
  link?: string;
  text?: string;
  event?: string;
}

export interface Message {
  author: string;
  time: Date;
  text?: string;
  isBot?: boolean;
  link?: {
    params?: Record<string, string>;
    label: string;
    path?: string;
  };
  quickReplies?: QuickReply[];
}
