import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import ScreenLayout from '@screens/ScreenLayout';
import DiaryHeader from '@screens/Diary/components/DiaryHeader';
import getFormatedDate from '@utils/getFormatedDate';
import DailyInspiration from '@screens/Diary/components/DailyInspiration';

const Diary = () => {
  const [date, setDate] = useState(new Date());
  const [question, setQuestion] = useState('');
  const [saying, setSaying] = useState('');

  return (
    <ScreenLayout>
      <DiaryHeader title={getFormatedDate(date)} setDate={setDate} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DailyInspiration question={question} saying={saying} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default Diary;
