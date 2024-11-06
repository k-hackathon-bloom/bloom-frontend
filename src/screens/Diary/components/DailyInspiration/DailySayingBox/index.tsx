import React from 'react';
import BoxLayout from '@screens/Diary/components/DailyInspiration/BoxLayout';
import theme from '@styles/theme';

const DailyQuestionBox = ({ content }: { content: string }) => {
  return (
    <BoxLayout
      title="오늘의 명언"
      content={content || '오늘의 명언이 없습니다.'}
      backgroundColor={theme.COLORS.BOX_DAILY_SAYING}
      textColor={theme.COLORS.TEXT_DAILY_SAYING}
      showWriteButton={false}
    />
  );
};

export default DailyQuestionBox;
