import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';

export const useRegisterDailyQuestionMutation = () => {
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

export const useAddDoneTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (date: string) => {
      const formData = new FormData();
      const newTask = {
        doneDate: date,
        title: '',
        content: '',
      };
      formData.append('data', JSON.stringify(newTask));

      await apiClient.post('/api/done-list', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (_, date) => {
      queryClient.invalidateQueries({ queryKey: ['doneTasks', date] });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '던 리스트 항목 추가에 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useDeleteDoneTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId }: { taskId: number; date: string }) => {
      await apiClient.delete(`/api/done-list/${taskId}`);
    },
    onSuccess: (_, { date }) => {
      queryClient.invalidateQueries({ queryKey: ['doneTasks', date] });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '던 리스트 항목을 삭제하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};
