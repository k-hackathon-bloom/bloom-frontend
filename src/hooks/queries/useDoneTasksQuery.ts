import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';
import DoneTask from '@type/DoneTask';

const fetchDoneTasks = async (date: string): Promise<DoneTask[]> => {
  const response = await apiClient.get(`/api/done-list/${date}`);
  return response.data.donelist.map((item: any) => ({
    id: item.itemId,
    title: item.title,
    content: item.content,
  }));
};

const useDoneTasksQuery = (date: string) =>
  useQuery({
    queryKey: ['doneTasks', date],
    queryFn: () => fetchDoneTasks(date),
  });

export default useDoneTasksQuery;
