import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { nanoid } from 'nanoid/non-secure';
import StyledText from '@components/common/StyledText';

const TextContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

interface WordBreakTextProps {
  text: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const WordBreakText: React.FC<WordBreakTextProps> = ({
  text,
  containerStyle,
  textStyle,
}) => {
  return (
    <TextContainer style={containerStyle}>
      {text.split(' ').map((word) => (
        <StyledText key={nanoid()} style={textStyle}>
          {`${word} `}
        </StyledText>
      ))}
    </TextContainer>
  );
};

export default WordBreakText;
