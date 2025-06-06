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

export const useDoneTasksQuery = (date: string) =>
  useQuery({
    queryKey: ['doneTasks', date],
    queryFn: () => fetchDoneTasks(date),
  });

interface Photo {
  id: number;
  url: string;
  name?: string;
  type?: string;
}

interface TaskDetail {
  doneItem: {
    title: string;
    content: string;
  };
  photoUrls: Photo[];
}

const fetchTaskDetail = async (id: number): Promise<TaskDetail> => {
  const response = await apiClient.get(`/api/done-list/detail/${id}`);
  return response.data;
};

export const useTaskDetailQuery = (id: number) =>
  useQuery({
    queryKey: ['taskDetail', id],
    queryFn: () => fetchTaskDetail(id),
  });
