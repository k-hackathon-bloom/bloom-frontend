import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { MessageDetails } from '@type/Message';
import StyledText from '@components/common/StyledText';
import AutoScrollText from '@components/AutoScrollText';
import apiClient from '@apis/client';
import LikeIcon from '@assets/icons/like.svg';
import UnlikeIcon from '@assets/icons/unlike.svg';

interface MessageContentViewProps {
  message: MessageDetails['message'];
  isReacted: boolean;
  isReceived: boolean;
  onReactionUpdate: (
    updatedMessage: MessageDetails['message'] & { isReacted: boolean },
  ) => void;
}

const MessageContainer = styled(View)`
  width: 100%;
  position: relative;
  background-color: white;
  margin-top: -28px;
`;

const PostcardContainer = styled(View)`
  position: relative;
`;

const PostcardImage = styled(Image)`
  aspect-ratio: 2/3;
  border-radius: 10px 10px 0 0;
  margin: 0 -20px;
`;

const AnimatedImageStyled = styled(Animated.Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-horizontal: -20px;
`;

const AnimatedOverlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-horizontal: -20px;
`;

const ToggleButton = styled(TouchableOpacity)<{ isMessageView: boolean }>`
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 30px;
  z-index: 1;
  position: absolute;
  top: 24px;
  align-self: center;
  background-color: ${(props) =>
    props.isMessageView ? 'transparent' : 'white'};
`;

const ToggleButtonText = styled(StyledText)<{ isMessageView: boolean }>`
  color: ${(props) =>
    props.isMessageView ? 'white' : props.theme.COLORS.TEXT_PRIMARY};
  font-size: 12px;
  text-align: center;
`;

const LetterContent = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
}))`
  margin: 84px 36px 36px 36px;
`;

const ResponderView = styled(View)``;

const LetterText = styled(Text)`
  font-family: 'GowunDodum-Regular';
  font-size: 16px;
  color: white;
  letter-spacing: -0.5px;
  line-height: 25px;
  text-align: justify;
`;

const MessageInfoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const ReactionButton = styled(TouchableOpacity)`
  margin-left: 8px;
`;

const MessageModalContent: React.FC<MessageContentViewProps> = ({
  message,
  isReacted,
  isReceived,
  onReactionUpdate,
}) => {
  const [messageView, setMessageView] = useState(false);
  const [isReactedState, setIsReactedState] = useState(isReacted);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
  }, [message]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: messageView ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [messageView, fadeAnim]);

  const handleReaction = async () => {
    try {
      if (!isReactedState) {
        await apiClient.post(
          `/api/bottle-messages/${message.messageId}/react`,
          { reaction: 'LIKE' },
        );
        setIsReactedState(true);
        Toast.show({
          type: 'success',
          text1: '공감을 표시했습니다.',
        });
      } else {
        await apiClient.delete(
          `/api/bottle-messages/${message.messageId}/react`,
          { data: { reaction: 'LIKE' } },
        );
        setIsReactedState(false);
        Toast.show({
          type: 'success',
          text1: '공감을 취소했습니다.',
        });
      }

      const updatedMessage = {
        ...message,
        isReacted: !isReactedState,
      };
      onReactionUpdate(updatedMessage);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: isReactedState
          ? '공감 취소 중 오류가 발생했습니다.'
          : '공감 등록 중 오류가 발생했습니다.',
        text2: String(error),
      });
    }
  };

  const toggleMessageView = () => setMessageView(!messageView);

  return (
    <MessageContainer>
      <PostcardContainer>
        <PostcardImage
          source={{ uri: message.postCardUrl }}
          resizeMode="cover"
        />

        <AnimatedImageStyled
          source={{ uri: message.postCardUrl }}
          style={{ opacity: fadeAnim }}
          blurRadius={20}
          resizeMode="cover"
        />

        <AnimatedOverlay style={{ opacity: fadeAnim }}>
          <LetterContent showsVerticalScrollIndicator={false}>
            <ResponderView onStartShouldSetResponder={() => true}>
              <LetterText>{message.content}</LetterText>
            </ResponderView>
          </LetterContent>
        </AnimatedOverlay>

        <ToggleButton isMessageView={messageView} onPress={toggleMessageView}>
          <ToggleButtonText isMessageView={messageView}>
            {messageView ? '️️💌 카드 보기' : '📄 메시지 보기'}
          </ToggleButtonText>
        </ToggleButton>
      </PostcardContainer>

      <MessageInfoContainer>
        <AutoScrollText text={message.title} />
        {isReceived && (
          <ReactionButton onPress={handleReaction}>
            {isReactedState ? <LikeIcon /> : <UnlikeIcon />}
          </ReactionButton>
        )}
      </MessageInfoContainer>
    </MessageContainer>
  );
};

export default MessageModalContent;
