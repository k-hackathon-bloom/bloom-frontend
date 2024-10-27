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
import responsive from '@utils/responsive';

const Button = styled(TouchableOpacity)<{
  buttonTheme: 'primary' | 'secondary';
}>`
  background-color: ${(props) =>
    props.buttonTheme === 'secondary'
      ? 'white'
      : props.theme.COLORS.BUTTON_PRIMARY};
  width: 100%;
  padding: ${responsive(16, 'height')}px;
  border-radius: ${responsive(6, 'height')}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled(StyledText)<{
  buttonTheme: 'primary' | 'secondary';
}>`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.REGULAR};
  font-size: ${responsive(15, 'height')}px;
  color: ${(props) =>
    props.buttonTheme === 'secondary'
      ? props.theme.COLORS.BUTTON_PRIMARY
      : 'white'};
`;

const IconWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-right: ${responsive(10, 'height')}px;
`;

interface ButtonProps {
  buttonTheme?: 'primary' | 'secondary';
  title: string;
  icon?: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

const StyledButton: React.FC<ButtonProps> = ({
  buttonTheme = 'primary',
  title,
  icon,
  buttonStyle,
  titleStyle,
  onPress,
}) => {
  return (
    <Button onPress={onPress} buttonTheme={buttonTheme} style={buttonStyle}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ButtonTitle buttonTheme={buttonTheme} style={titleStyle}>
        {title}
      </ButtonTitle>
    </Button>
  );
};

export default StyledButton;
