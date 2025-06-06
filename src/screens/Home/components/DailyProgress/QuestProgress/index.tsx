import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StyledText from '@components/common/StyledText';
import theme from '@styles/theme';

const TextContainer = styled(View)`
  align-items: center;
`;

const Title = styled(StyledText)`
  font-size: 14px;
`;

const ProgressText = styled(StyledText)`
  margin-top: 5px;
  font-size: 27px;
  letter-spacing: -1.5px;
`;

interface QuestProgressProps {
  totalQuests: number;
  completedQuests: number;
}

const QuestProgress: React.FC<QuestProgressProps> = ({
  totalQuests,
  completedQuests,
}) => {
  const [progressPercentage, setProgressPercentage] = useState(() =>
    totalQuests ? (completedQuests / totalQuests) * 100 : 0,
  );

  useEffect(() => {
    if (totalQuests > 0) {
      setProgressPercentage((completedQuests / totalQuests) * 100);
    }
  }, [completedQuests, totalQuests]);

  return (
    <AnimatedCircularProgress
      size={160}
      width={10}
      fill={progressPercentage}
      tintColor={theme.COLORS.PROGRESS_BAR_PRIMARY}
      backgroundColor={theme.COLORS.PROGRESS_BAR_BACKGROUND}
      rotation={0}
    >
      {() => (
        <TextContainer>
          <Title>퀘스트 진행률</Title>
          <ProgressText weight="MEDIUM">
            {completedQuests} / {totalQuests}
          </ProgressText>
        </TextContainer>
      )}
    </AnimatedCircularProgress>
  );
};

export default QuestProgress;
