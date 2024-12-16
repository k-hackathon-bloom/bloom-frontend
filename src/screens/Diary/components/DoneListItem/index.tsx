import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { SwipeRow } from 'react-native-swipe-list-view';
import ItemLayout from '@components/ItemLayout';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';
import useAnimatedValue from '@hooks/useAnimatedValue';
import DeleteIcon from '@assets/icons/delete.svg';

const DoneListContainer = styled(ItemLayout)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: ${responsive(60, 'height')}px;
  padding: 0 ${responsive(20, 'height')}px;
  border-radius: ${responsive(8, 'height')}px;
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
  font-size: ${responsive(14, 'height')}px;
  letter-spacing: ${responsive(-0.5, 'height')}px;
`;

const DeleteTaskButton = styled(TouchableOpacity)`
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.BUTTON_RED};
  align-items: center;
  justify-content: center;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  position: absolute;
  left: ${responsive(20, 'height')}px;
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
    const targetWidth = responsive(55, 'height');
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
          <StyledDeleteIcon
            width={responsive(15, 'height')}
            height={responsive(15, 'height')}
          />
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
  const { animatedValue: swipeValue } = useAnimatedValue(0);

  return (
    // @ts-expect-error
    <SwipeRow
      ref={swipeRowRef}
      leftOpenValue={responsive(55, 'height')}
      disableLeftSwipe={true}
      onSwipeValueChange={(value) => {
        swipeValue.setValue(value.value);
      }}
      swipeGestureBegan={() => setIsSwiping(true)}
      swipeGestureEnded={() => setIsSwiping(false)}
    >
      <HiddenItems
        taskId={id}
        onDeleteTask={(taskId) => handleDeleteTask(taskId)}
        swipeValue={swipeValue}
      />
      <DoneListContainer>
        <ButtonWrapper onPress={handleOpenModal}>
          <DoneListTitle numberOfLines={1}>{title}</DoneListTitle>
        </ButtonWrapper>
      </DoneListContainer>
    </SwipeRow>
  );
};

export default DoneListItem;
