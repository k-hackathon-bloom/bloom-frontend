import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MenuHeader from '@components/common/MenuHeader';
import StyledText from '@components/common/StyledText';

const HeaderContainer = styled(View)`
  gap: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const QuestResetButton = styled(TouchableOpacity)`
  background: ${(props) => props.theme.COLORS.BUTTON_PRIMARY};
  padding: 4px 6px;
  border-radius: 14px;
`;

const ButtonTitle = styled(StyledText)`
  color: white;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.MEDIUM};
  font-size: 11px;
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
