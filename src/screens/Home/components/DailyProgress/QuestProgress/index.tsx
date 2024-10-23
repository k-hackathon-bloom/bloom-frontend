import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';
import theme from '@styles/theme';

const QuestProgressContainer = styled(View)`
  width: ${responsive(160)}px;
  aspect-ratio: 1;
`;

const QuestProgressIndicator = styled(AnimatedCircularProgress)``;

const TextContainer = styled(View)`
  align-items: center;
`;

const Title = styled(StyledText)`
  font-size: ${responsive(14)}px;
`;

const ProgressText = styled(StyledText)`
  font-family: ${(props) => props.theme.fonts.medium};
  margin-top: ${responsive(5)}px;
  font-size: ${responsive(27)}px;
  letter-spacing: ${responsive(-1.5)}px;
`;

interface QuestProgressProps {
  totalQuests: number;
  completedQuests: number;
}

const QuestProgress: React.FC<QuestProgressProps> = ({
  totalQuests,
  completedQuests,
}) => {
  const progressPercentage = (completedQuests / totalQuests) * 100;

  return (
    <QuestProgressContainer>
      <QuestProgressIndicator
        size={responsive(160)}
        width={responsive(10)}
        fill={progressPercentage}
        tintColor={theme.colors.progressPrimary}
        backgroundColor={theme.colors.progressBackground}
        rotation={0}
      >
        {() => (
          <TextContainer>
            <Title>퀘스트 진행률</Title>
            <ProgressText>
              {completedQuests} / {totalQuests}
            </ProgressText>
          </TextContainer>
        )}
      </QuestProgressIndicator>
    </QuestProgressContainer>
  );
};

export default QuestProgress;
