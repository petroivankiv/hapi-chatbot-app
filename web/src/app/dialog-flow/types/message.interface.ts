export enum ResponseType {
  Text = 'text',
  Link = 'link',
  Card = 'card',
  QuickReplies = 'quick-replies'
}

export interface Message {
  author: string;
  time: Date;
  text?: string;
  isBot?: boolean;
  responseType?: ResponseType;
  link?: {
    params?: Record<string, string>;
    label: string;
    path: string;
  };
  quickReplies?: {
    label: string;
    link?: string;
    decision?: 'no' | 'yes';
  }[];
  cards?: {
    title: string;
    image?: string;
    link?: string;
  }[];
}
