import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';

export const useDeleteQuestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: number) => {
      await apiClient.delete(`/api/quests/${questId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registeredQuests'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '퀘스트를 삭제하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useCompleteQuestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questId: number) => {
      await apiClient.patch(`/api/quests/${questId}/complete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registeredQuests'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '퀘스트를 완료하는 데 실패했습니다.',
        text2: String(error),
      });
    },
  });
};

export const useUpdateQuestsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questIdsToAdd,
      questIdsToRemove,
    }: {
      questIdsToAdd: number[];
      questIdsToRemove: number[];
    }) => {
      const promises = [];

      if (questIdsToAdd.length > 0) {
        promises.push(
          apiClient.post('/api/quests', { questIds: questIdsToAdd }),
        );
      }

      if (questIdsToRemove.length > 0) {
        promises.push(
          ...questIdsToRemove.map((questId) =>
            apiClient.delete(`/api/quests/${questId}`),
          ),
        );
      }

      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registeredQuests'] });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '퀘스트 업데이트에 실패했습니다.',
        text2: String(error),
      });
    },
  });
};
