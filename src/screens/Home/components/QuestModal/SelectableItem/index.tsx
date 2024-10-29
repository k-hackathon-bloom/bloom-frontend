import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SvgUri } from 'react-native-svg';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const ItemContainer = styled(TouchableOpacity)<{ isSelected?: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.isSelected ? props.theme.COLORS.ITEM_SELECTED : 'white'};
  flex-direction: row;
  align-items: center;
  padding: ${responsive(15, 'height')}px ${responsive(20, 'height')}px;
`;

const ItemIcon = styled(SvgUri)`
  margin-right: ${responsive(14, 'height')}px;
`;

const ItemTitle = styled(StyledText)`
  font-size: ${responsive(13, 'height')}px;
  letter-spacing: ${responsive(-0.8, 'height')}px;
`;

interface SelectableItemProps {
  title: string;
  iconUrl: string;
  isSelected?: boolean;
  onPress: () => void;
}

const SelectableItem: React.FC<SelectableItemProps> = ({
  title,
  iconUrl,
  isSelected,
  onPress,
}) => {
  return (
    <ItemContainer isSelected={isSelected} onPress={onPress}>
      <ItemIcon
        uri={iconUrl}
        width={responsive(24, 'height')}
        height={responsive(24, 'height')}
      />
      <ItemTitle>{title}</ItemTitle>
    </ItemContainer>
  );
};

export default SelectableItem;
