import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';

export const useSendBottleMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      content,
      postcardId,
    }: {
      title: string;
      content: string;
      postcardId: number;
    }) => {
      await apiClient.post('/api/bottle-messages', {
        title,
        content,
        postcardId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bottleMessages', 'sent'] });
      Toast.show({
        type: 'success',
        text1: '메시지를 성공적으로 보냈습니다.',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '유리병 메시지를 보내는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useDeleteBottleMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: number) => {
      await apiClient.post(`/api/bottle-messages/${messageId}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bottleMessages', 'received'],
      });
      Toast.show({
        type: 'success',
        text1: '받은 메시지를 삭제했습니다.',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '받은 메시지를 삭제하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useHideBottleMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: number) => {
      await apiClient.patch(`/api/bottle-messages/${messageId}/hide`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bottleMessages', 'sent'] });
      Toast.show({
        type: 'success',
        text1: '보낸 메시지를 삭제했습니다.',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '보낸 메시지를 삭제하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useReactToMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      messageId,
      isReacting,
    }: {
      messageId: number;
      isReacting: boolean;
    }) => {
      if (isReacting) {
        await apiClient.post(`/api/bottle-messages/${messageId}/react`, {
          reaction: 'LIKE',
        });
      } else {
        await apiClient.delete(`/api/bottle-messages/${messageId}/react`, {
          data: { reaction: 'LIKE' },
        });
      }
    },
    onSuccess: (_, { isReacting }) => {
      Toast.show({
        type: 'success',
        text1: isReacting ? '공감을 표시했습니다.' : '공감을 취소했습니다.',
      });
      queryClient.invalidateQueries({ queryKey: ['messageDetails'] });
    },
    onError: (error, { isReacting }) => {
      Toast.show({
        type: 'error',
        text1: isReacting
          ? '공감 등록 중 오류가 발생했습니다.'
          : '공감 취소 중 오류가 발생했습니다.',
        text2: String(error),
      });
    },
  });
};
