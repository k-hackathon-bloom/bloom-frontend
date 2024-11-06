import React from 'react';
import BoxLayout from '@screens/Diary/components/DailyInspiration/BoxLayout';
import theme from '@styles/theme';

const DailyQuestionBox = ({ content }: { content: string }) => {
  return (
    <BoxLayout
      title="오늘의 질문"
      content={content || '오늘의 질문이 없습니다.'}
      backgroundColor={theme.COLORS.BOX_DAILY_QUESTION}
      textColor={theme.COLORS.TEXT_DAILY_QUESTION}
      showWriteButton={true}
    />
  );
};

export default DailyQuestionBox;
