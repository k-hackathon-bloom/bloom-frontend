import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';

interface MonthlyDataItem {
  month: number;
  bloomed: number;
}

interface MonthlyReportResponse {
  monthlyData: MonthlyDataItem[];
  averageBloomed: number;
  aiSummary: string;
}

type FormattedMonthlyData = Record<string, number>;

const formatMonthData = (data: MonthlyDataItem[]): FormattedMonthlyData => {
  const formattedData: FormattedMonthlyData = {};

  data.forEach((item) => {
    const monthString = `${item.month}`.slice(4);
    const monthNumber = monthString.substring(0, 2).replace(/^0/, '');
    const monthName = `${monthNumber}월`;
    formattedData[monthName] = item.bloomed;
  });

  return formattedData;
};

const fetchMonthlyReport = async (): Promise<{
  monthlyData: FormattedMonthlyData;
  averageBloomed: number;
  aiSummary: string;
}> => {
  const response = await apiClient.get<MonthlyReportResponse>(
    '/api/achievement/recent-six-months',
  );

  const {
    monthlyData: apiMonthlyData,
    averageBloomed,
    aiSummary,
  } = response.data;

  return {
    monthlyData: formatMonthData(apiMonthlyData),
    averageBloomed,
    aiSummary,
  };
};

const useMonthlyReportQuery = () =>
  useQuery({
    queryKey: ['monthlyReport'],
    queryFn: fetchMonthlyReport,
  });

export default useMonthlyReportQuery;
