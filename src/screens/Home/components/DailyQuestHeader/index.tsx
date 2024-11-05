import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MenuHeader from '@components/common/MenuHeader';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const HeaderContainer = styled(View)`
  gap: ${responsive(8, 'height')}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const QuestResetButton = styled(TouchableOpacity)`
  background: ${(props) => props.theme.COLORS.BUTTON_PRIMARY};
  padding: ${responsive(4, 'height')}px ${responsive(6, 'height')}px;
  border-radius: ${responsive(14, 'height')}px;
`;

const ButtonTitle = styled(StyledText)`
  color: white;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.MEDIUM};
  font-size: ${responsive(11, 'height')}px;
`;

const DailyQuestHeader = ({ onPress }: { onPress: () => void }) => {
  return (
    <HeaderContainer>
      <MenuHeader title="데일리 퀘스트" />
      <QuestResetButton onPress={onPress}>
        <ButtonTitle>재설정</ButtonTitle>
      </QuestResetButton>
    </HeaderContainer>
  );
};

export default DailyQuestHeader;
