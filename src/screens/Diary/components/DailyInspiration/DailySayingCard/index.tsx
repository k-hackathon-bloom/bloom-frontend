import React from 'react';
import CardLayout from '@screens/Diary/components/DailyInspiration/CardLayout';
import theme from '@styles/theme';

const DailySayingCard = ({ content }: { content: string }) => {
  return (
    <CardLayout
      title="오늘의 명언"
      content={content || '오늘의 명언이 없습니다.'}
      backgroundColor={theme.COLORS.CARD_DAILY_SAYING}
      textColor={theme.COLORS.TEXT_DAILY_SAYING}
      showWriteButton={false}
    />
  );
};

export default DailySayingCard;
