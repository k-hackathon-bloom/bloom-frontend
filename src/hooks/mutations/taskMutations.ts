import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';

export const useAddTaskMutation = () => {
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

export const useDeleteTaskMutation = () => {
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

interface UpdateTaskParams {
  id: number;
  formData: FormData;
}

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: UpdateTaskParams) => {
      await apiClient.put(`/api/done-list/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['taskDetail', id] });

      Toast.show({
        type: 'success',
        text1: '변경 사항이 저장되었습니다.',
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
