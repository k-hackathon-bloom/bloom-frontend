import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import WriteIcon from '@assets/icons/write.svg';

const Container = styled(View)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 270px;
  padding: 25px;
  border-radius: 14px;
  gap: 10px;
`;

const Title = styled(StyledText)<{ color: string }>`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.BOLD};
  font-size: 16px;
  color: ${(props) => props.color};
`;

const ContentWrapper = styled(View)`
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const Content = styled(StyledText)`
  font-family: 'GowunDodum-Regular';
  font-size: 18px;
  letter-spacing: -1px;
  text-align: justify;
`;

const WriteButton = styled(TouchableOpacity)`
  padding: 5px;
  align-items: flex-end;
`;

interface CardLayoutProps {
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  showWriteButton?: boolean;
  handleOpenModal?: () => void;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  title,
  content,
  backgroundColor,
  textColor,
  showWriteButton = false,
  handleOpenModal,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Title color={textColor}>{title}</Title>
      <ContentWrapper>
        <Content>{content}</Content>
      </ContentWrapper>
      {showWriteButton && (
        <WriteButton onPress={handleOpenModal}>
          <WriteIcon width={24} height={24} />
        </WriteButton>
      )}
    </Container>
  );
};

export default CardLayout;
