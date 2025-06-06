import React, { useState, useCallback, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Message } from '@type/Message';
import {
  useReceivedBottleMessagesQuery,
  useSentBottleMessagesQuery,
  useMessageDetailsQuery,
} from '@hooks/queries/bottleMessageQueries';
import {
  useSendBottleMessageMutation,
  useDeleteBottleMessageMutation,
  useHideBottleMessageMutation,
} from '@hooks/mutations/bottleMessageMutations';
import StyledText from '@components/common/StyledText';
import ModalLayout from '@components/ModalLayout';
import BottomSheetLayout from '@components/BottomSheetLayout';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ScreenLayout from '@screens/ScreenLayout';
import BottleMessageHeader from '@screens/BottleMessage/components/BottleMessageHeader';
import MessageList from '@screens/BottleMessage/components/MessageList';
import MessageModalContent from '@screens/BottleMessage/components/MessageModalContent';
import TextMessageForm, {
  TextMessageFormHandles,
} from '@screens/BottleMessage/components/NewMessageSheet/TextMessageForm';
import PostCardPicker, {
  PostCardPickerHandles,
} from '@screens/BottleMessage/components/NewMessageSheet/PostCardPicker';
import EmptyMessageImage from '@assets/images/empty-message.svg';

const SwitchContainer = styled(View)`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

const SwitchButton = styled(StyledText)<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.COLORS.TEXT_PRIMARY : '#bbb'};
  font-size: 16px;
  letter-spacing: -0.5px;
`;

const MessageListContainer = styled(View)`
  flex: 1;
`;

const EmptyMessageWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyMessageText = styled(StyledText)`
  font-size: 15px;
  margin-top: 20px;
`;

const BottleMessage = () => {
  const [showReceivedMessages, setShowReceivedMessages] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  );
  const [newMessageSheetVisible, setNewMessageSheetVisible] = useState(false);
  const [newMessageSheetStep, setNewMessageSheetStep] = useState(0);
  const [messageContentModalVisible, setMessageContentModalVisible] =
    useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isMessageModified, setIsMessageModified] = useState(false);

  const textMessageFormRef = useRef<TextMessageFormHandles>(null);
  const postCardPickerRef = useRef<PostCardPickerHandles>(null);

  const { data: receivedMessageList = [], isLoading: receivedLoading } =
    useReceivedBottleMessagesQuery();
  const { data: sentMessageList = [], isLoading: sentLoading } =
    useSentBottleMessagesQuery();
  const { data: selectedMessageData } = useMessageDetailsQuery(
    selectedMessageId!,
    !!selectedMessageId,
  );

  const sendMessageMutation = useSendBottleMessageMutation();
  const deleteMessageMutation = useDeleteBottleMessageMutation();
  const hideMessageMutation = useHideBottleMessageMutation();

  const handleSendMessage = useCallback(
    async (title: string, content: string, postcardId: number) => {
      setNewMessageSheetStep(0);
      setNewMessageSheetVisible(false);
      setIsMessageModified(false);

      await sendMessageMutation.mutateAsync({ title, content, postcardId });
    },
    [sendMessageMutation],
  );

  const handleMessagePress = useCallback(async (message: Message) => {
    setSelectedMessageId(message.messageId);
    setMessageContentModalVisible(true);
  }, []);

  const handleDeleteMessage = useCallback(
    async (messageId: number) => {
      Alert.alert('메시지 삭제', '이 메시지를 삭제하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: async () => {
            await deleteMessageMutation.mutateAsync(messageId);
          },
        },
      ]);
    },
    [deleteMessageMutation],
  );

  const handleHideMessage = useCallback(
    async (messageId: number) => {
      Alert.alert('메시지 삭제', '이 메시지를 삭제하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: async () => {
            await hideMessageMutation.mutateAsync(messageId);
          },
        },
      ]);
    },
    [hideMessageMutation],
  );

  const handleCloseMessageContentModal = useCallback(() => {
    setSelectedMessageId(null);
    setMessageContentModalVisible(false);
  }, []);

  const handleSwitch = useCallback((isReceivedPage: boolean) => {
    setShowReceivedMessages(isReceivedPage);
  }, []);

  const handleSendButtonPress = useCallback(() => {
    setNewMessageSheetVisible(true);
    setIsMessageModified(false);
  }, []);

  const resetMessageForm = useCallback(() => {
    if (textMessageFormRef.current) {
      textMessageFormRef.current.resetForm();
    }
    if (postCardPickerRef.current) {
      postCardPickerRef.current.resetSelection();
    }
  }, []);

  const handleNewMessageSheetClose = useCallback(() => {
    if (isMessageModified) {
      Alert.alert(
        '메시지 작성 취소',
        '작성 중인 메시지가 모두 삭제됩니다.\n정말로 나가시겠습니까?',
        [
          {
            text: '나가기',
            style: 'destructive',
            onPress: () => {
              resetMessageForm();
              setNewMessageSheetVisible(false);
              setNewMessageSheetStep(0);
              setIsMessageModified(false);
            },
          },
          { text: '취소', style: 'cancel' },
        ],
      );
    } else {
      setNewMessageSheetVisible(false);
      setNewMessageSheetStep(0);
      setIsMessageModified(false);
    }
  }, [isMessageModified, resetMessageForm]);

  const handleSwitchToReceived = useCallback(() => {
    handleSwitch(true);
  }, [handleSwitch]);

  const handleSwitchToSent = useCallback(() => {
    handleSwitch(false);
  }, [handleSwitch]);

  const handleNextStep = useCallback(() => {
    setNewMessageSheetStep(1);
  }, []);

  const handlePrevStep = useCallback(() => {
    setNewMessageSheetStep(0);
  }, []);

  const currentMessageList = showReceivedMessages
    ? receivedMessageList
    : sentMessageList;

  return (
    <ScreenLayout>
      <BottleMessageHeader
        title="유리병 메시지"
        handleSendButtonPress={handleSendButtonPress}
      />
      <SwitchContainer>
        <SwitchButton
          weight="MEDIUM"
          isActive={showReceivedMessages}
          onPress={handleSwitchToReceived}
        >
          받은 메시지
        </SwitchButton>
        <SwitchButton
          weight="MEDIUM"
          isActive={!showReceivedMessages}
          onPress={handleSwitchToSent}
        >
          보낸 메시지
        </SwitchButton>
      </SwitchContainer>
      {receivedLoading || sentLoading ? (
        <LoadingSpinner />
      ) : (
        <MessageListContainer>
          {currentMessageList.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={!isSwiping}
            >
              <MessageList
                messages={currentMessageList}
                onPress={handleMessagePress}
                handleDeleteMessage={
                  showReceivedMessages ? handleDeleteMessage : undefined
                }
                handleHideMessage={
                  !showReceivedMessages ? handleHideMessage : undefined
                }
                setIsSwiping={setIsSwiping}
              />
            </ScrollView>
          ) : (
            <EmptyMessageWrapper>
              <EmptyMessageImage />
              <EmptyMessageText>
                {showReceivedMessages
                  ? '아직 받은 메시지가 없어요.'
                  : '아직 보낸 메시지가 없어요.'}
              </EmptyMessageText>
            </EmptyMessageWrapper>
          )}
        </MessageListContainer>
      )}
      <BottomSheetLayout
        visible={newMessageSheetVisible}
        title={newMessageSheetStep === 0 ? '메시지 작성' : '편지지 선택'}
        content={
          newMessageSheetStep === 0 ? (
            <TextMessageForm
              ref={textMessageFormRef}
              setNewMessageSheetStep={handleNextStep}
              setIsMessageModified={setIsMessageModified}
            />
          ) : (
            <PostCardPicker
              ref={postCardPickerRef}
              setNewMessageSheetStep={handlePrevStep}
              onSendMessage={handleSendMessage}
              setIsMessageModified={setIsMessageModified}
            />
          )
        }
        onClose={handleNewMessageSheetClose}
      />
      {selectedMessageData && (
        <ModalLayout
          visible={messageContentModalVisible}
          content={
            <MessageModalContent
              message={selectedMessageData.message}
              isReacted={selectedMessageData.isReacted}
              isReceived={showReceivedMessages}
            />
          }
          onClose={handleCloseMessageContentModal}
        />
      )}
    </ScreenLayout>
  );
};

export default BottleMessage;
