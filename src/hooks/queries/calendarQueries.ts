import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';
import fetchHolidayList from '@apis/fetchHolidayList';

interface DailyAchievement {
  date: string;
  flowerIconUrl: string;
}

const fetchMonthlyAchievement = async (
  yearMonth: string,
): Promise<DailyAchievement[]> => {
  const response = await apiClient.get('/api/achievement/monthly', {
    params: { month: yearMonth },
  });

  return response.data.dailyData.map(
    (item: { date: string; flowerIconUrl: string }) => ({
      date: item.date,
      flowerIconUrl: item.flowerIconUrl,
    }),
  );
};

const fetchHolidays = async (
  year: string,
  month: string,
): Promise<number[]> => {
  const holidays = await fetchHolidayList(year, month);
  return holidays || [];
};

export const useMonthlyAchievementQuery = (yearMonth: string) =>
  useQuery({
    queryKey: ['monthlyAchievement', yearMonth],
    queryFn: () => fetchMonthlyAchievement(yearMonth),
  });

export const useHolidaysQuery = (year: string, month: string) =>
  useQuery({
    queryKey: ['holidays', year, month],
    queryFn: () => fetchHolidays(year, month),
    staleTime: 24 * 60 * 60 * 1000,
  });
