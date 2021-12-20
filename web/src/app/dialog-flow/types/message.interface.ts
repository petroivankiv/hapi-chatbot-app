export interface Message {
  author: string;
  time: Date;
  text: string;
  isBot?: boolean;
}
