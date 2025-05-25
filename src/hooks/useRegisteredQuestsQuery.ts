import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';
import Quest from '@type/Quest';

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

const useRegisteredQuestsQuery = () =>
  useQuery({
    queryKey: ['registeredQuests'],
    queryFn: fetchRegisteredQuests,
  });

export default useRegisteredQuestsQuery;
