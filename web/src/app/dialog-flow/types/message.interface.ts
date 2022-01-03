export enum ResponseType {
  Text = 'text',
  Link = 'link',
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
}
