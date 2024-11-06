import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';
import WriteIcon from '@assets/icons/write.svg';

const Container = styled(View)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: ${responsive(270)}px;
  padding: ${responsive(25, 'height')}px;
  border-radius: ${responsive(14, 'height')}px;
  gap: ${responsive(10, 'height')}px;
`;

const Title = styled(StyledText)<{ color: string }>`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.BOLD};
  font-size: ${responsive(16, 'height')}px;
  color: ${(props) => props.color};
`;

const ContentWrapper = styled(View)`
  height: ${responsive(100, 'height')}px;
  align-items: center;
  justify-content: center;
`;

const Content = styled(StyledText)`
  font-family: 'GowunDodum-Regular';
  font-size: ${responsive(18, 'height')}px;
  letter-spacing: ${responsive(-1, 'height')}px;
  text-align: justify;
`;

const WriteButton = styled(TouchableOpacity)`
  padding: ${responsive(5, 'height')}px;
  align-items: flex-end;
`;

interface BoxLayoutProps {
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  showWriteButton?: boolean;
}

const BoxLayout: React.FC<BoxLayoutProps> = ({
  title,
  content,
  backgroundColor,
  textColor,
  showWriteButton = false,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Title color={textColor}>{title}</Title>
      <ContentWrapper>
        <Content>{content}</Content>
      </ContentWrapper>
      {showWriteButton && (
        <WriteButton>
          <WriteIcon
            width={responsive(24, 'height')}
            height={responsive(24, 'height')}
          />
        </WriteButton>
      )}
    </Container>
  );
};

export default BoxLayout;
