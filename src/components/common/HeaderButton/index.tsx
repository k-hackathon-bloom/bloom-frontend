import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import responsive from '@utils/responsive.ts';

export interface HeaderButtonProps {
  onPress: () => void;
}

export const HeaderButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const LeftButtonWrapper = styled(TouchableOpacity)`
  padding-right: ${responsive(10, 'height')}px;
`;

export const RightButtonWrapper = styled(TouchableOpacity)`
  padding-left: ${responsive(10, 'height')}px;
`;

export const HEADER_BUTTON_SIZE = responsive(25, 'height');
