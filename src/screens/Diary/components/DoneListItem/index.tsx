import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { SwipeRow } from 'react-native-swipe-list-view';
import ItemLayout from '@components/ItemLayout';
import StyledText from '@components/common/StyledText';
import useAnimatedValue from '@hooks/useAnimatedValue';
import DeleteIcon from '@assets/icons/delete.svg';

const DoneListContainer = styled(ItemLayout)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
  padding: 0 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const AddTaskContainer = styled(DoneListContainer)`
  background-color: transparent;
  border: 1px dashed gray;
`;

const ButtonWrapper = styled(TouchableOpacity)`
  flex: 1;
`;

const DoneListTitle = styled(StyledText)`
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const DeleteTaskButton = styled(TouchableOpacity)`
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.BUTTON_RED};
  align-items: center;
  justify-content: center;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  position: absolute;
  left: 20px;
`;

const HiddenItemContainer = styled(DoneListContainer)`
  padding: 0;
`;

interface HiddenItemsProps {
  taskId: number;
  onDeleteTask: (taskId: number) => void;
  swipeValue: Animated.Value;
}

const HiddenItems: React.FC<HiddenItemsProps> = ({
  taskId,
  onDeleteTask,
  swipeValue,
}) => {
  const { animatedValue: buttonWidth, animateToValue } = useAnimatedValue(0);

  useEffect(() => {
    const targetWidth = 55;
    const listenerId = swipeValue.addListener(({ value }) => {
      const width = Math.min(value, targetWidth);
      animateToValue(width, 0, 0, false).start();
    });

    return () => {
      swipeValue.removeListener(listenerId);
    };
  }, [swipeValue, animateToValue]);

  return (
    <HiddenItemContainer>
      <Animated.View style={{ width: buttonWidth }}>
        <DeleteTaskButton onPress={() => onDeleteTask(taskId)}>
          <StyledDeleteIcon width={15} height={15} />
        </DeleteTaskButton>
      </Animated.View>
    </HiddenItemContainer>
  );
};

export const AddTaskButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <AddTaskContainer>
      <ButtonWrapper onPress={onPress}>
        <DoneListTitle>➕ 항목 추가</DoneListTitle>
      </ButtonWrapper>
    </AddTaskContainer>
  );
};

interface DoneListItemProps {
  id: number;
  title: string;
  handleOpenModal: () => void;
  handleDeleteTask: (taskId: number) => void;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
}

const DoneListItem: React.FC<DoneListItemProps> = ({
  id,
  title,
  handleOpenModal,
  handleDeleteTask,
  setIsSwiping,
}) => {
  const swipeRowRef = useRef<SwipeRow<unknown> | null>(null);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const { animatedValue: swipeValue } = useAnimatedValue(0);

  return (
    // @ts-expect-error
    <SwipeRow
      ref={swipeRowRef}
      leftOpenValue={55}
      disableLeftSwipe={true}
      onSwipeValueChange={(value) => {
        swipeValue.setValue(value.value);
      }}
      swipeGestureBegan={() => setIsSwiping(true)}
      swipeGestureEnded={() => setIsSwiping(false)}
      onRowOpen={() => setIsRowOpen(true)}
      onRowClose={() => setIsRowOpen(false)}
    >
      <HiddenItems
        taskId={id}
        onDeleteTask={(taskId) => handleDeleteTask(taskId)}
        swipeValue={swipeValue}
      />
      <DoneListContainer>
        <ButtonWrapper onPress={handleOpenModal} disabled={isRowOpen}>
          <DoneListTitle numberOfLines={1}>
            {title || '새로운 항목'}
          </DoneListTitle>
        </ButtonWrapper>
      </DoneListContainer>
    </SwipeRow>
  );
};

export default DoneListItem;
