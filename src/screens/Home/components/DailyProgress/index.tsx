import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import BloomProgress from '@screens/Home/components/DailyProgress/BloomProgress';
import QuestProgress from '@screens/Home/components/DailyProgress/QuestProgress';
import responsive from '@utils/responsive';
import { useRecoilValue } from 'recoil';
import { expAtom, questsAtom } from '@recoil/atoms';
import Quest from '@type/Quest';

const DailyProgressContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${responsive(20, 'height')}px;
`;

const DailyProgress = () => {
  const exp = useRecoilValue(expAtom);
  const quests = useRecoilValue(questsAtom);
  const totalQuests = quests.length;
  const completedQuests = quests.filter((quest: Quest) => quest.isDone).length;

  return (
    <DailyProgressContainer>
      <BloomProgress exp={exp} />
      <QuestProgress
        totalQuests={totalQuests}
        completedQuests={completedQuests}
      />
    </DailyProgressContainer>
  );
};

export default DailyProgress;
