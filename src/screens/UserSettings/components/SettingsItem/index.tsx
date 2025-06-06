import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';

const MenuButton = styled(TouchableOpacity)<{ isLast?: boolean }>`
  padding: 25px 5px;
  border-bottom-width: ${(props) => (props.isLast ? 0 : 0.5)}px;
  border-bottom-color: lightgray;
`;

interface SettingsItemProps {
  title: string;
  onPress: () => void;
  isLast?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  onPress,
  isLast,
}) => {
  return (
    <MenuButton onPress={onPress} isLast={isLast}>
      <StyledText>{title}</StyledText>
    </MenuButton>
  );
};

export default SettingsItem;
