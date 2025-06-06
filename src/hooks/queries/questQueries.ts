import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';
import Quest from '@type/Quest';

const fetchAllQuests = async (): Promise<Quest[]> => {
  const response = await apiClient.get('/api/quests/available');
  return response.data.quests.map((quest: Quest) => ({
    id: quest.id,
    iconUrl: quest.iconUrl,
    title: quest.title,
  }));
};

const fetchRegisteredQuests = async (): Promise<Quest[]> => {
  const response = await apiClient.get('/api/quests/registered');
  return response.data.quests.map((quest: Quest) => ({
    id: quest.id,
    iconUrl: quest.iconUrl,
    title: quest.title,
    maxCount: quest.maxCount,
    isDone: quest.isDone,
  }));
};

export const useAllQuestsQuery = () =>
  useQuery({
    queryKey: ['allQuests'],
    queryFn: fetchAllQuests,
    staleTime: 24 * 60 * 60 * 1000,
  });

export const useRegisteredQuestsQuery = () =>
  useQuery({
    queryKey: ['registeredQuests'],
    queryFn: fetchRegisteredQuests,
  });
