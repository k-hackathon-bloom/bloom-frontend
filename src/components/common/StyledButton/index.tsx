import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';

const Button = styled(TouchableOpacity)<{
  buttonTheme: 'primary' | 'secondary';
}>`
  background-color: ${(props) =>
    props.buttonTheme === 'secondary'
      ? 'white'
      : props.theme.COLORS.BUTTON_PRIMARY};
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled(StyledText)<{
  buttonTheme: 'primary' | 'secondary';
}>`
  font-family: ${(props) =>
    props.buttonTheme === 'secondary'
      ? props.theme.FONT_WEIGHTS.REGULAR
      : props.theme.FONT_WEIGHTS.MEDIUM};
  font-size: 15px;
  color: ${(props) =>
    props.buttonTheme === 'secondary'
      ? props.theme.COLORS.BUTTON_PRIMARY
      : 'white'};
`;

const IconWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

interface ButtonProps {
  buttonTheme?: 'primary' | 'secondary';
  title: string;
  icon?: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  onPress: (...args: any[]) => any;
}

const StyledButton: React.FC<ButtonProps> = ({
  buttonTheme = 'primary',
  title,
  icon,
  buttonStyle,
  titleStyle,
  disabled,
  onPress,
}) => {
  return (
    <Button
      buttonTheme={buttonTheme}
      style={buttonStyle}
      disabled={disabled}
      onPress={onPress}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ButtonTitle buttonTheme={buttonTheme} style={titleStyle}>
        {title}
      </ButtonTitle>
    </Button>
  );
};

export default StyledButton;
