import React from 'react';
import { ScrollView } from 'react-native';
import DailyQuestionCard from '@screens/Diary/components/DailyInspiration/DailyQuestionCard';
import DailySayingCard from '@screens/Diary/components/DailyInspiration/DailySayingCard';
import SpacedView from '@components/common/SpacedView';
import responsive from '@utils/responsive';

interface DailyInspirationProps {
  question: string;
  saying: string;
  handleOpenModal: () => void;
}

const DailyInspiration: React.FC<DailyInspirationProps> = ({
  question,
  saying,
  handleOpenModal,
}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <SpacedView gap={responsive(20, 'height')} direction="row">
        <DailyQuestionCard
          content={question}
          handleOpenModal={handleOpenModal}
        />
        <DailySayingCard content={saying} />
      </SpacedView>
    </ScrollView>
  );
};

export default DailyInspiration;
