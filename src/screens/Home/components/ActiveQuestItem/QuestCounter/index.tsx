import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';
import MinusIcon from '@assets/icons/quest_minus.svg';
import PlusIcon from '@assets/icons/quest_plus.svg';

const CounterContainer = styled(View)`
  position: absolute;
  right: ${responsive(14, 'height')}px;
  flex-direction: row;
  align-items: center;
`;

const Counter = styled(StyledText)`
  font-size: ${responsive(14, 'height')}px;
`;

const DecreaseButton = styled(TouchableOpacity)`
  padding: ${responsive(10, 'height')}px;
`;

const IncreaseButton = styled(TouchableOpacity)`
  padding: ${responsive(10, 'height')}px;
`;

interface QuestCounterProps {
  id: number;
  count: number;
  maxCount: number;
  onCompleteQuest: (questId: number) => void;
}

const QuestCounter: React.FC<QuestCounterProps> = ({
  id,
  count,
  maxCount,
  onCompleteQuest,
}) => {
  const [currentCount, setCurrentCount] = useState(count);

  const handleDecrease = () => {
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setCurrentCount(newCount);
      if (newCount === 0) {
        Alert.alert('퀘스트 완료', '이 퀘스트를 완료하시겠습니까?', [
          { text: '취소', style: 'cancel' },
          {
            text: '확인',
            onPress: () => onCompleteQuest(id),
          },
        ]);
      }
    }
  };

  const handleIncrease = () => {
    if (currentCount < maxCount) {
      setCurrentCount(currentCount + 1);
    }
  };

  return (
    <CounterContainer>
      <DecreaseButton onPress={handleDecrease}>
        <MinusIcon
          width={responsive(14, 'height')}
          height={responsive(14, 'height')}
        />
      </DecreaseButton>
      <Counter>{currentCount}</Counter>
      <IncreaseButton onPress={handleIncrease}>
        <PlusIcon
          width={responsive(14, 'height')}
          height={responsive(14, 'height')}
        />
      </IncreaseButton>
    </CounterContainer>
  );
};

export default QuestCounter;
