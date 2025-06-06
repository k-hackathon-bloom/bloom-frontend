import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Animated, Alert } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { SwipeRow } from 'react-native-swipe-list-view';
import ItemLayout from '@components/ItemLayout';
import StyledText from '@components/common/StyledText';
import QuestCounter from '@screens/Home/components/ActiveQuestItem/QuestCounter';
import useAnimatedValue from '@hooks/useAnimatedValue';
import DeleteIcon from '@assets/icons/delete.svg';
import CompleteIcon from '@assets/icons/complete.svg';

const QuestContainer = styled(ItemLayout)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const QuestTitle = styled(StyledText)`
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const IconWrapper = styled(View)`
  width: 35px;
  align-items: center;
  margin: 0 12px 0 20px;
`;

const QuestIcon = styled(SvgUri)``;

const DeleteButton = styled(TouchableOpacity)`
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.BUTTON_RED};
  align-items: center;
  justify-content: center;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  position: absolute;
  left: 25px;
`;

const CompleteButton = styled(TouchableOpacity)`
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.BUTTON_GREEN};
  align-items: center;
  justify-content: center;
`;

const StyledCompleteIcon = styled(CompleteIcon)`
  position: absolute;
  left: 25px;
`;

const DisabledOverlay = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
`;

interface QuestDetailsProps {
  id: number;
  title: string;
  iconUrl: string;
  count: number;
  maxCount: number;
  isDone: boolean;
  onCompleteQuest: (questId: number) => void;
}

const QuestDetails: React.FC<QuestDetailsProps> = ({
  id,
  iconUrl,
  title,
  count,
  maxCount,
  isDone,
  onCompleteQuest,
}) => (
  <QuestContainer>
    <IconWrapper>
      <QuestIcon uri={iconUrl} width={28} height={28} />
    </IconWrapper>
    <QuestTitle>{title}</QuestTitle>
    {maxCount > 1 && !isDone && (
      <QuestCounter
        id={id}
        count={count}
        maxCount={maxCount}
        onCompleteQuest={onCompleteQuest}
      />
    )}
    {isDone && <DisabledOverlay />}
  </QuestContainer>
);

interface HiddenItemsProps {
  questId: number;
  onDeleteQuest: (questId: number) => void;
  onCompleteQuest: (questId: number) => void;
  swipeValue: Animated.Value;
}

const HiddenItems: React.FC<HiddenItemsProps> = ({
  questId,
  onDeleteQuest,
  onCompleteQuest,
  swipeValue,
}) => {
  const { animatedValue: buttonWidth, animateToValue } = useAnimatedValue(0);

  useEffect(() => {
    const targetWidth = 140;
    const listenerId = swipeValue.addListener(({ value }) => {
      const width = Math.min(value / 2, targetWidth / 2);
      animateToValue(width, 0, 0, false).start();
    });

    return () => {
      swipeValue.removeListener(listenerId);
    };
  }, [swipeValue, animateToValue]);

  return (
    <QuestContainer>
      <Animated.View style={{ width: buttonWidth }}>
        <DeleteButton onPress={() => onDeleteQuest(questId)}>
          <StyledDeleteIcon width={20} height={20} />
        </DeleteButton>
      </Animated.View>
      <Animated.View style={{ width: buttonWidth }}>
        <CompleteButton onPress={() => onCompleteQuest(questId)}>
          <StyledCompleteIcon width={20} height={20} />
        </CompleteButton>
      </Animated.View>
    </QuestContainer>
  );
};

interface QuestItemProps extends QuestDetailsProps {
  onDeleteQuest: (questId: number) => void;
  onCompleteQuest: (questId: number) => void;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActiveQuestItem: React.FC<QuestItemProps> = ({
  id,
  title,
  iconUrl,
  count,
  maxCount,
  isDone,
  onDeleteQuest,
  onCompleteQuest,
  setIsSwiping,
}) => {
  const swipeRowRef = useRef<SwipeRow<unknown> | null>(null);
  const { animatedValue: swipeValue } = useAnimatedValue(0);

  const closeSwipeRow = () => {
    if (swipeRowRef.current) {
      swipeRowRef.current.closeRow();
    }
  };

  return (
    // @ts-expect-error
    <SwipeRow
      style={{ borderRadius: 8, overflow: 'hidden' }}
      ref={swipeRowRef}
      leftOpenValue={140}
      disableLeftSwipe={true}
      disableRightSwipe={isDone}
      onSwipeValueChange={(value) => {
        swipeValue.setValue(value.value);
      }}
      swipeGestureBegan={() => setIsSwiping(true)}
      swipeGestureEnded={() => setIsSwiping(false)}
    >
      <HiddenItems
        questId={id}
        onDeleteQuest={() => {
          Alert.alert('퀘스트 삭제', '이 퀘스트를 삭제하시겠습니까?', [
            { text: '취소', style: 'cancel' },
            {
              text: '확인',
              onPress: () => {
                onDeleteQuest(id);
              },
            },
          ]);
        }}
        onCompleteQuest={() => {
          Alert.alert('퀘스트 완료', '이 퀘스트를 완료하시겠습니까?', [
            { text: '취소', style: 'cancel' },
            {
              text: '확인',
              onPress: () => {
                onCompleteQuest(id);
                closeSwipeRow();
              },
            },
          ]);
        }}
        swipeValue={swipeValue}
      />
      <QuestDetails
        id={id}
        title={title}
        iconUrl={iconUrl}
        count={count}
        maxCount={maxCount}
        isDone={isDone}
        onCompleteQuest={onCompleteQuest}
      />
    </SwipeRow>
  );
};

export default ActiveQuestItem;
