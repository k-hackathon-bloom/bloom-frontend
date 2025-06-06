import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@apis/client';
import Toast from 'react-native-toast-message';

export const useRegisterQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.get('/api/daily-question');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyQuestion'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '오늘의 질문을 등록하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useUpdateAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answer: string) => {
      await apiClient.put('/api/daily-question/answer', { answer });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyQuestion'] });

      Toast.show({
        type: 'success',
        text1: '답변이 저장되었습니다.',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '변경 사항을 저장하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};
