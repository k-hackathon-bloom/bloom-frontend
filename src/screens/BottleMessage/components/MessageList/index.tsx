import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import { Message } from '@type/Message';
import SpacedView from '@components/common/SpacedView';

interface MessageItemProps {
  message: Message;
  onPress: (message: Message) => void;
}

const MessageItemContainer = styled(View)`
  background-color: white;
  border-radius: 8px;
  padding: 0 20px;
  height: 72px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const Title = styled(StyledText)`
  letter-spacing: -0.5px;
`;

const Timestamp = styled(StyledText)`
  color: ${(props) => props.theme.COLORS.TEXT_SECONDARY};
  font-size: 12px;
  margin-top: 4px;
`;

export const MessageItemCard: React.FC<MessageItemProps> = ({
  message,
  onPress,
}) => {
  const getTimeAgo = (timestamp?: string): string => {
    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp.replace(' ', 'T'));
    const now = new Date().getTime();
    const diff = now - date.getTime();

    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    if (diff < 60 * second) {
      return '방금 전';
    } else if (diff < 60 * minute) {
      const minutes = Math.floor(diff / minute);
      return `${minutes}분 전`;
    } else if (diff < 24 * hour) {
      const hours = Math.floor(diff / hour);
      return `${hours}시간 전`;
    } else if (diff < 7 * day) {
      const days = Math.floor(diff / day);
      return `${days}일 전`;
    } else {
      const weeks = Math.floor(diff / week);
      return `${weeks}주 전`;
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(message)}>
      <MessageItemContainer>
        <View>
          <Title numberOfLines={1}>{message.title}</Title>
          <Timestamp>{getTimeAgo(message.timestamp)}</Timestamp>
        </View>
      </MessageItemContainer>
    </TouchableOpacity>
  );
};

const MessageList = ({
  messages,
  onPress,
}: {
  messages: Message[];
  onPress: (message: Message) => Promise<void>;
}) => {
  const sortedMessages = [...messages].reverse();

  return (
    <SpacedView gap={8}>
      {sortedMessages.map((message) => (
        <MessageItemCard
          key={message.messageId}
          message={message}
          onPress={onPress}
        />
      ))}
    </SpacedView>
  );
};

export default MessageList;
