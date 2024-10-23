import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const Button = styled(TouchableOpacity)<{ backgroundColor?: string }>`
  padding: ${responsive(20, 'height')}px;
  width: 88%;
  border-radius: ${responsive(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.COLORS.BUTTON_PRIMARY};
`;

interface ButtonProps {
  title: string;
  color?: string;
  fontSize?: number;
  weight?: 'THIN' | 'LIGHT' | 'REGULAR' | 'MEDIUM' | 'BOLD';
  backgroundColor?: string;
  onPress: () => void;
  children?: React.ReactNode;
}

const StyledButton: React.FC<ButtonProps> = ({
  title,
  color,
  fontSize,
  weight,
  onPress,
  backgroundColor,
  children,
}) => {
  return (
    <Button onPress={onPress} backgroundColor={backgroundColor}>
      {children && <View>{children}</View>}
      <StyledText
        weight={weight}
        style={{
          marginLeft: children ? responsive(10, 'height') : 0,
          color,
          fontSize: fontSize || responsive(16, 'height'),
        }}
      >
        {title}
      </StyledText>
    </Button>
  );
};

export default StyledButton;
