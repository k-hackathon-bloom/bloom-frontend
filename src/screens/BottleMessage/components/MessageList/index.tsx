import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import styled from 'styled-components/native';
import { Message } from '@type/Message';
import useAnimatedValue from '@hooks/useAnimatedValue';
import StyledText from '@components/common/StyledText';
import ItemLayout from '@components/ItemLayout';
import SpacedView from '@components/common/SpacedView';
import RemoveIcon from '@assets/icons/remove.svg';

const MessageItemContainer = styled(ItemLayout)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 72px;
  padding: 0 20px;
  overflow: hidden;
`;

const ButtonWrapper = styled(TouchableOpacity)`
  flex: 1;
`;

const MessageTitle = styled(StyledText)`
  letter-spacing: -0.5px;
`;

const MessageStatus = styled(StyledText)<{
  negativity?: 'LOWER' | 'MIDDLE' | 'UPPER' | 'UNKNOWN';
}>`
  color: ${(props) =>
    props.negativity === 'MIDDLE' ||
    props.negativity === 'UPPER' ||
    props.negativity === 'UNKNOWN'
      ? props.theme.COLORS.TEXT_HOLIDAY
      : props.theme.COLORS.TEXT_SECONDARY};
  font-size: 12px;
  margin-top: 4px;
`;

const HiddenItemContainer = styled(MessageItemContainer)`
  padding: 0;
`;

const HideMessageButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.BUTTON_RED};
`;

interface HiddenItemsProps {
  messageId: number;
  onDeleteMessage?: (messageId: number) => void;
  onHideMessage?: (messageId: number) => void;
  swipeValue: Animated.Value;
}

const HiddenItems: React.FC<HiddenItemsProps> = ({
  messageId,
  onDeleteMessage,
  onHideMessage,
  swipeValue,
}) => {
  const { animatedValue: buttonWidth, animateToValue } = useAnimatedValue(0);

  useEffect(() => {
    const targetWidth = 55;
    const listenerId = swipeValue.addListener(({ value }) => {
      const width = Math.min(value, targetWidth);
      animateToValue(width, 0, 0, false).start();
    });

    return () => {
      swipeValue.removeListener(listenerId);
    };
  }, [swipeValue, animateToValue]);

  const handlePress = useCallback(() => {
    onDeleteMessage?.(messageId);
    onHideMessage?.(messageId);
  }, [messageId, onDeleteMessage, onHideMessage]);

  return (
    <HiddenItemContainer>
      <Animated.View style={{ width: buttonWidth }}>
        <HideMessageButton onPress={handlePress}>
          <RemoveIcon width={16} height={16} />
        </HideMessageButton>
      </Animated.View>
    </HiddenItemContainer>
  );
};

interface MessageItemProps {
  message: Message;
  onPress: (message: Message) => void;
  handleDeleteMessage?: (messageId: number) => void;
  handleHideMessage?: (messageId: number) => void;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MessageItemCard: React.FC<MessageItemProps> = ({
  message,
  onPress,
  handleDeleteMessage,
  handleHideMessage,
  setIsSwiping,
}) => {
  const swipeRowRef = useRef<SwipeRow<unknown> | null>(null);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const { animatedValue: swipeValue } = useAnimatedValue(0);

  const getTimeAgo = useCallback((timestamp?: string): string => {
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
  }, []);

  const getMessageStatus = useCallback(
    (msg: Message) => {
      if (!msg.negativity) {
        return '분석 중';
      } else if (msg.negativity === 'MIDDLE' || msg.negativity === 'UPPER') {
        return '부적절한 메시지';
      } else if (msg.negativity === 'UNKNOWN') {
        return '내용 분석 불가';
      }
      return getTimeAgo(msg.timestamp);
    },
    [getTimeAgo],
  );

  const handlePress = useCallback(() => {
    onPress(message);
  }, [message, onPress]);

  return (
    // @ts-expect-error
    <SwipeRow
      style={{ borderRadius: 8, overflow: 'hidden' }}
      ref={swipeRowRef}
      leftOpenValue={55}
      disableLeftSwipe={true}
      onSwipeValueChange={(value) => {
        swipeValue.setValue(value.value);
      }}
      swipeGestureBegan={() => setIsSwiping(true)}
      swipeGestureEnded={() => setIsSwiping(false)}
      onRowOpen={() => setIsRowOpen(true)}
      onRowClose={() => setIsRowOpen(false)}
    >
      <HiddenItems
        messageId={message.messageId}
        onDeleteMessage={handleDeleteMessage}
        onHideMessage={handleHideMessage}
        swipeValue={swipeValue}
      />
      <MessageItemContainer>
        <ButtonWrapper onPress={handlePress} disabled={isRowOpen}>
          <MessageTitle numberOfLines={1}>{message.title}</MessageTitle>
          <MessageStatus negativity={message.negativity}>
            {getMessageStatus(message)}
          </MessageStatus>
        </ButtonWrapper>
      </MessageItemContainer>
    </SwipeRow>
  );
};

interface MessageListProps {
  messages: Message[];
  onPress: (message: Message) => Promise<void>;
  handleDeleteMessage?: (messageId: number) => void;
  handleHideMessage?: (messageId: number) => void;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onPress,
  handleDeleteMessage,
  handleHideMessage,
  setIsSwiping,
}) => {
  const sortedMessages = useMemo(() => [...messages].reverse(), [messages]);

  const handlePress = useCallback(
    async (message: Message) => {
      await onPress(message);
    },
    [onPress],
  );

  return (
    <SpacedView gap={8}>
      {sortedMessages.map((message) => (
        <MessageItemCard
          key={message.messageId}
          message={message}
          onPress={handlePress}
          handleDeleteMessage={handleDeleteMessage}
          handleHideMessage={handleHideMessage}
          setIsSwiping={setIsSwiping}
        />
      ))}
    </SpacedView>
  );
};

export default MessageList;
