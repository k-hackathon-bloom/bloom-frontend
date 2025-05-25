import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import BloomProgress from '@screens/Home/components/DailyProgress/BloomProgress';
import QuestProgress from '@screens/Home/components/DailyProgress/QuestProgress';
import { useRecoilValue } from 'recoil';
import { expAtom } from '@recoil/atoms';
import useRegisteredQuestsQuery from '@hooks/useRegisteredQuestsQuery';
import Quest from '@type/Quest';

const DailyProgressContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const DailyProgress = () => {
  const exp = useRecoilValue(expAtom);
  const { data: quests = [] } = useRegisteredQuestsQuery();

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
