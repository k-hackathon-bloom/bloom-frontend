import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';

export interface HeaderButtonProps {
  onPress: () => void;
}

export const HeaderButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const LeftButtonWrapper = styled(TouchableOpacity)`
  padding-right: 10px;
`;

export const RightButtonWrapper = styled(TouchableOpacity)`
  padding-left: 10px;
`;

export const HEADER_BUTTON_SIZE = 25;
