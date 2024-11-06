import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ItemLayout from '@components/ItemLayout';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const DoneListContainer = styled(ItemLayout)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: ${responsive(60, 'height')}px;
  border-radius: ${responsive(8, 'height')}px;
  padding: 0 ${responsive(20, 'height')}px;
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
  letter-spacing: ${responsive(-0.5)}px;
`;

export const AddTaskButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <AddTaskContainer>
      <ButtonWrapper onPress={onPress}>
        <DoneListTitle>➕ 항목 추가</DoneListTitle>
      </ButtonWrapper>
    </AddTaskContainer>
  );
};

const DoneListItem = ({ title }: { title: string }) => {
  return (
    <DoneListContainer>
      <ButtonWrapper>
        <DoneListTitle>{title}</DoneListTitle>
      </ButtonWrapper>
    </DoneListContainer>
  );
};

export default DoneListItem;
