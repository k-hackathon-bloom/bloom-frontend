import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';
import { Message, MessageDetails } from '@type/Message';

const fetchReceivedBottleMessages = async (): Promise<Message[]> => {
  const response = await apiClient.get('/api/bottle-messages');
  return response.data.bottleMessageResponses.map((message: any) => ({
    messageId: message.messages.messageId,
    title: message.messages.title,
    postCardUrl: message.messages.postCardUrl,
    timestamp: message.log.receivedAt,
    negativity: 'LOWER',
  }));
};

const fetchSentBottleMessages = async (): Promise<Message[]> => {
  const response = await apiClient.get('/api/bottle-messages/sent');
  return response.data.messages.map((message: any) => ({
    messageId: message.message.messageId,
    title: message.message.title,
    imageUrl: message.message.postCardUrl,
    timestamp: message.sentAt,
    negativity: message.message.negativity,
  }));
};

const fetchMessageDetails = async (
  messageId: number,
): Promise<MessageDetails> => {
  const response = await apiClient.get(`/api/bottle-messages/${messageId}`);
  return {
    message: response.data.message,
    isReacted: response.data.reaction.isReacted,
  };
};

const fetchPostCards = async (): Promise<{ id: number; url: string }[]> => {
  const response = await apiClient.get('/api/postcard/all');
  return response.data.postcards;
};

export const useReceivedBottleMessagesQuery = () =>
  useQuery({
    queryKey: ['bottleMessages', 'received'],
    queryFn: fetchReceivedBottleMessages,
    refetchInterval: 1000 * 60,
  });

export const useSentBottleMessagesQuery = () =>
  useQuery({
    queryKey: ['bottleMessages', 'sent'],
    queryFn: fetchSentBottleMessages,
    refetchInterval: 1000 * 60,
  });

export const useMessageDetailsQuery = (
  messageId: number,
  enabled: boolean = true,
) =>
  useQuery({
    queryKey: ['messageDetails', messageId],
    queryFn: () => fetchMessageDetails(messageId),
    enabled,
  });

export const usePostCardsQuery = () =>
  useQuery({
    queryKey: ['postCards'],
    queryFn: fetchPostCards,
    staleTime: 24 * 60 * 60 * 1000,
  });
