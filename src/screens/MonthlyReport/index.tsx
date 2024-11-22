import React from 'react';
import { ScrollView } from 'react-native';
import ScreenLayout from '@screens/ScreenLayout';
import MonthlyReportHeader from '@screens/MonthlyReport/components/MonthlyReportHeader';
import Calendar from '@screens/MonthlyReport/components/Calendar';

const MonthlyReport = () => {
  return (
    <ScreenLayout>
      <MonthlyReportHeader title="월간 리포트" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Calendar />
      </ScrollView>
    </ScreenLayout>
  );
};

export default MonthlyReport;
