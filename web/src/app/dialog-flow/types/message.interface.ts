export interface Message {
  author: string;
  time: Date;
  text?: string;
  isBot?: boolean;
  params?: Record<string, string>;
}
