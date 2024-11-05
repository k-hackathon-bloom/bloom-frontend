import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import ScreenLayout from '@screens/ScreenLayout';
import DiaryHeader from '@screens/Diary/components/DiaryHeader';
import getFormatedDate from '@utils/getFormatedDate';

const Diary = () => {
  const [date, setDate] = useState(new Date());
  return (
    <ScreenLayout>
      <DiaryHeader title={getFormatedDate(date)} setDate={setDate} />
      <ScrollView showsVerticalScrollIndicator={false} />
    </ScreenLayout>
  );
};

export default Diary;
