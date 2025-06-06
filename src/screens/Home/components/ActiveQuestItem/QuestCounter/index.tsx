import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import MinusIcon from '@assets/icons/quest_minus.svg';
import PlusIcon from '@assets/icons/quest_plus.svg';

const CounterContainer = styled(View)`
  position: absolute;
  right: 14px;
  flex-direction: row;
  align-items: center;
`;

const Counter = styled(StyledText)`
  font-size: 14px;
`;

const DecreaseButton = styled(TouchableOpacity)`
  padding: 10px;
`;

const IncreaseButton = styled(TouchableOpacity)`
  padding: 10px;
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
        <MinusIcon width={14} height={14} />
      </DecreaseButton>
      <Counter>{currentCount}</Counter>
      <IncreaseButton onPress={handleIncrease}>
        <PlusIcon width={14} height={14} />
      </IncreaseButton>
    </CounterContainer>
  );
};

export default QuestCounter;
