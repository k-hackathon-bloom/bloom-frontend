interface BaseMessage {
  messageId: number;
  title: string;
  postCardUrl: string;
  negativity?: 'LOWER' | 'MIDDLE' | 'UPPER';
  timestamp: string;
}

export interface Message extends BaseMessage {}

export interface MessageDetails {
  message: BaseMessage & {
    content: string;
  };
  isReacted: boolean;
}
