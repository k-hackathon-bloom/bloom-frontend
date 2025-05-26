import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';

interface DailyQuestionResponse {
  question: string;
  answer: string;
}

const fetchDailyQuestion = async (
  date: string,
): Promise<DailyQuestionResponse> => {
  const response = await apiClient.get('/api/daily-question/answer', {
    params: { date },
  });
  return {
    question: response.data.question || '',
    answer: response.data.answer || '',
  };
};

const useDailyQuestionQuery = (date: string) =>
  useQuery({
    queryKey: ['dailyQuestion', date],
    queryFn: () => fetchDailyQuestion(date),
    retry: false,
  });

export default useDailyQuestionQuery;
