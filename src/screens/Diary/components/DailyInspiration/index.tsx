import React from 'react';
import { ScrollView } from 'react-native';
import DailyQuestionBox from '@screens/Diary/components/DailyInspiration/DailyQuestionBox';
import DailySayingBox from '@screens/Diary/components/DailyInspiration/DailySayingBox';
import SpacedView from '@components/common/SpacedView';
import responsive from '@utils/responsive';

interface DailyInspirationProps {
  question: string;
  saying: string;
}

const DailyInspiration: React.FC<DailyInspirationProps> = ({
  question,
  saying,
}) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <SpacedView gap={responsive(20, 'height')} direction="row">
        <DailyQuestionBox content={question} />
        <DailySayingBox content={saying} />
      </SpacedView>
    </ScrollView>
  );
};

export default DailyInspiration;
