import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import useMonthlyReportQuery from '@hooks/queries/useMonthlyReportQuery';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ScreenLayout from '@screens/ScreenLayout';
import MonthlyReportHeader from '@screens/MonthlyReport/components/MonthlyReportHeader';
import Calendar from '@screens/MonthlyReport/components/Calendar';
import MonthlyChart from '@screens/MonthlyReport/components/MonthlyChart';
import AISummary from '@screens/MonthlyReport/components/AISummary';

const MonthlyReport: React.FC = () => {
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isDragScreen, setIsDragScreen] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userScrolledRef = useRef<boolean>(false);

  const { data: reportData, isLoading } = useMonthlyReportQuery();

  const startAutoScroll = useCallback(() => {
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
  }, [isTypingComplete]);

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
    if (reportData && !isLoading) {
      setTimeout(() => {
        startAutoScroll();
      }, 500);
    }
  }, [reportData, isLoading, startAutoScroll]);

  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

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
        ) : reportData ? (
          <View>
            <Calendar />
            <MonthlyChart
              monthlyData={reportData.monthlyData}
              averageValue={reportData.averageBloomed}
            />
            <AISummary
              summary={reportData.aiSummary}
              onTypingComplete={handleTypingComplete}
            />
          </View>
        ) : (
          <View>
            <LoadingSpinner />
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default MonthlyReport;
