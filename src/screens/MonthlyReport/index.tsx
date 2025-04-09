import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ScreenLayout from '@screens/ScreenLayout';
import MonthlyReportHeader from '@screens/MonthlyReport/components/MonthlyReportHeader';
import Calendar from '@screens/MonthlyReport/components/Calendar';
import MonthlyChart from '@screens/MonthlyReport/components/MonthlyChart';
import AISummary from '@screens/MonthlyReport/components/AISummary';
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

const MonthlyReport: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [monthlyData, setMonthlyData] = useState<FormattedMonthlyData>({});
  const [averageValue, setAverageValue] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isDragScreen, setIsDragScreen] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userScrolledRef = useRef<boolean>(false);

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

  const fetchMonthlyData = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await apiClient.get<MonthlyReportResponse>(
        '/api/achievement/recent-six-months',
      );

      const {
        monthlyData: apiMonthlyData,
        averageBloomed,
        aiSummary,
      } = response.data;
      const formattedData = formatMonthData(apiMonthlyData);

      setMonthlyData(formattedData);
      setAverageValue(averageBloomed);
      setSummary(aiSummary);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '월간 리포트 데이터를 가져오는 데 실패했습니다.',
        text2: String(error),
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        startAutoScroll();
      }, 500);
    }
  }, []);

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    scrollToBottom();

    autoScrollIntervalRef.current = setInterval(() => {
      if (!userScrolledRef.current && !isTypingComplete) {
        scrollToBottom();
      } else {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      }
    }, 500);
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleScroll = () => {
    if (isDragScreen) {
      userScrolledRef.current = true;
    }
  };

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);

    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchMonthlyData();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [fetchMonthlyData]);

  return (
    <ScreenLayout>
      <MonthlyReportHeader title="월간 리포트" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={() => {
          setIsDragScreen(true);
        }}
        onScrollEndDrag={() => {
          setIsDragScreen(false);
        }}
        scrollEventThrottle={16}
      >
        {isLoading ? (
          <View>
            <LoadingSpinner />
          </View>
        ) : (
          <View>
            <Calendar />
            <MonthlyChart
              monthlyData={monthlyData}
              averageValue={averageValue}
            />
            <AISummary
              summary={summary}
              onTypingComplete={handleTypingComplete}
            />
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default MonthlyReport;
