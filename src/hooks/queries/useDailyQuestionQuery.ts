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

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const useDailyQuestionQuery = (date: string) =>
  useQuery({
    queryKey: ['dailyQuestion', `${year}-${month}-${day}`],
    queryFn: () => fetchDailyQuestion(date),
    retry: false,
  });

export default useDailyQuestionQuery;
