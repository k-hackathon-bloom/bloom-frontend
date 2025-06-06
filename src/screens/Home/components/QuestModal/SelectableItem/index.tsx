import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SvgUri } from 'react-native-svg';
import StyledText from '@components/common/StyledText';

const ItemContainer = styled(TouchableOpacity)<{ isSelected?: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.isSelected ? props.theme.COLORS.ITEM_SELECTED : 'white'};
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
`;

const IconWrapper = styled(View)`
  width: 20px;
  align-items: center;
  margin-right: 14px;
`;

const ItemIcon = styled(SvgUri)``;

const ItemTitle = styled(StyledText)`
  font-size: 13px;
  letter-spacing: -1px;
`;

const DisabledOverlay = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
`;

interface SelectableItemProps {
  title: string;
  iconUrl: string;
  isSelected?: boolean;
  isDone: boolean;
  onPress: () => void;
}

const SelectableItem: React.FC<SelectableItemProps> = ({
  title,
  iconUrl,
  isSelected,
  isDone,
  onPress,
}) => {
  return (
    <ItemContainer isSelected={isSelected} disabled={isDone} onPress={onPress}>
      <IconWrapper>
        <ItemIcon uri={iconUrl} width={20} />
      </IconWrapper>
      <ItemTitle>{title}</ItemTitle>
      {isDone && <DisabledOverlay />}
    </ItemContainer>
  );
};

export default SelectableItem;
