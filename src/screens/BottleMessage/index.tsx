import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';
import { Message, MessageDetails } from '@type/Message';
import StyledText from '@components/common/StyledText';
import ModalLayout from '@components/ModalLayout';
import BottomSheetLayout from '@components/BottomSheetLayout';
import ScreenLayout from '@screens/ScreenLayout';
import BottleMessageHeader from '@screens/BottleMessage/components/BottleMessageHeader';
import MessageList from '@screens/BottleMessage/components/MessageList';
import MessageModalContent from '@screens/BottleMessage/components/MessageModalContent';
import TextMessageForm from '@screens/BottleMessage/components/NewMessageSheet/TextMessageForm';
import PostCardPicker from '@screens/BottleMessage/components/NewMessageSheet/PostCardPicker';
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
  const [receivedMessageList, setReceivedMessageList] = useState<Message[]>([]);
  const [sentMessageList, setSentMessageList] = useState<Message[]>([]);
  const [showReceivedMessages, setShowReceivedMessages] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetails | null>(
    null,
  );

  const [newMessageSheetVisible, setNewMessageSheetVisible] = useState(false);
  const [newMessageSheetStep, setNewMessageSheetStep] = useState(0);
  const [messageContentModalVisible, setMessageContentModalVisible] =
    useState(false);

  const fetchReceivedBottleMessages = useCallback(async () => {
    try {
      const response = await apiClient.get('/api/bottle-messages');
      const bottleMessagesFromServer = response.data.bottleMessageResponses.map(
        (message: any) => ({
          messageId: message.messages.messageId,
          title: message.messages.title,
          imageUrl: message.messages.postCardUrl,
          timestamp: message.log.receivedAt,
        }),
      );
      setReceivedMessageList(bottleMessagesFromServer);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '받은 유리병 메시지를 불러오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, []);

  const fetchSentBottleMessages = useCallback(async () => {
    try {
      const response = await apiClient.get('/api/bottle-messages/sent');
      const bottleMessagesFromServer = response.data.messages.map(
        (message: any) => ({
          messageId: message.message.messageId,
          title: message.message.title,
          imageUrl: message.message.postCardUrl,
          timestamp: message.sentAt,
          negativity: message.message.negativity,
        }),
      );
      setSentMessageList(bottleMessagesFromServer);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '보낸 유리병 메시지를 불러오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchReceivedBottleMessages();
    fetchSentBottleMessages();
  }, [fetchReceivedBottleMessages, fetchSentBottleMessages]);

  const handleSendMessage = useCallback(
    async (title: string, content: string, postcardId: number) => {
      setNewMessageSheetStep(0);
      setNewMessageSheetVisible(false);
      try {
        await apiClient.post('/api/bottle-messages', {
          title,
          content,
          postcardId,
        });
        Toast.show({
          type: 'success',
          text1: '메시지를 성공적으로 보냈습니다.',
        });
        fetchSentBottleMessages();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '유리병 메시지를 보내는 데 실패했습니다.',
          text2: String(error),
        });
      }
    },
    [fetchSentBottleMessages],
  );

  const handleMessagePress = useCallback(async (message: Message) => {
    try {
      const response = await apiClient.get(
        `/api/bottle-messages/${message.messageId}`,
      );
      const messageDetails: MessageDetails = {
        message: response.data.message,
        isReacted: response.data.reaction.isReacted,
      };
      setSelectedMessage(messageDetails);
      setMessageContentModalVisible(true);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '유리병 메시지 상세 정보를 불러오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, []);

  const handleCloseMessageContentModal = useCallback(() => {
    setSelectedMessage(null);
    setMessageContentModalVisible(false);
  }, []);

  const handleReactionUpdate = useCallback((updatedMessage: Message) => {
    setReceivedMessageList((prev) =>
      prev.map((msg) =>
        msg.messageId === updatedMessage.messageId ? updatedMessage : msg,
      ),
    );
  }, []);

  const handleSwitch = useCallback((isReceivedPage: boolean) => {
    setShowReceivedMessages(isReceivedPage);
  }, []);

  return (
    <ScreenLayout>
      <BottleMessageHeader
        title="유리병 메시지"
        handleSendButtonPress={() => setNewMessageSheetVisible(true)}
      />
      <SwitchContainer>
        <SwitchButton
          weight="MEDIUM"
          isActive={showReceivedMessages}
          onPress={() => handleSwitch(true)}
        >
          받은 메시지
        </SwitchButton>
        <SwitchButton
          weight="MEDIUM"
          isActive={!showReceivedMessages}
          onPress={() => handleSwitch(false)}
        >
          보낸 메시지
        </SwitchButton>
      </SwitchContainer>

      <MessageListContainer>
        {showReceivedMessages ? (
          receivedMessageList.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <MessageList
                messages={receivedMessageList}
                onPress={handleMessagePress}
              />
            </ScrollView>
          ) : (
            <EmptyMessageWrapper>
              <EmptyMessageImage />
              <EmptyMessageText>아직 받은 메시지가 없어요.</EmptyMessageText>
            </EmptyMessageWrapper>
          )
        ) : sentMessageList.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <MessageList
              messages={sentMessageList}
              onPress={handleMessagePress}
            />
          </ScrollView>
        ) : (
          <EmptyMessageWrapper>
            <EmptyMessageImage />
            <EmptyMessageText>아직 보낸 메시지가 없어요.</EmptyMessageText>
          </EmptyMessageWrapper>
        )}
      </MessageListContainer>

      <BottomSheetLayout
        visible={newMessageSheetVisible}
        title={newMessageSheetStep === 0 ? '메시지 작성' : '편지지 선택'}
        content={
          newMessageSheetStep === 0 ? (
            <TextMessageForm setNewMessageSheetStep={setNewMessageSheetStep} />
          ) : (
            <PostCardPicker
              setNewMessageSheetStep={setNewMessageSheetStep}
              onSendMessage={(
                title: string,
                content: string,
                postcardId: number,
              ) => handleSendMessage(title, content, postcardId)}
            />
          )
        }
        onClose={() => {
          setNewMessageSheetStep(0);
          setNewMessageSheetVisible(false);
        }}
      />

      {selectedMessage && (
        <ModalLayout
          visible={messageContentModalVisible}
          content={
            <MessageModalContent
              message={selectedMessage.message}
              isReacted={selectedMessage.isReacted}
              isReceived={showReceivedMessages}
              onReactionUpdate={handleReactionUpdate}
            />
          }
          onClose={handleCloseMessageContentModal}
        />
      )}
    </ScreenLayout>
  );
};

export default BottleMessage;
