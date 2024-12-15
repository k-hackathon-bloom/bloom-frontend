import React from 'react';
import CardLayout from '@screens/Diary/components/DailyInspiration/CardLayout';
import theme from '@styles/theme';

const DailyQuestionCard = ({
  content,
  handleOpenModal,
}: {
  content: string;
  handleOpenModal: () => void;
}) => {
  return (
    <CardLayout
      title="오늘의 질문"
      content={content || '오늘의 질문이 없습니다.'}
      backgroundColor={theme.COLORS.CARD_DAILY_QUESTION}
      textColor={theme.COLORS.TEXT_DAILY_QUESTION}
      showWriteButton={true}
      handleOpenModal={handleOpenModal}
    />
  );
};

export default DailyQuestionCard;
