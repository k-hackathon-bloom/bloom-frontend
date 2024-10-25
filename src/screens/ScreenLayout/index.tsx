import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import responsive from '@utils/responsive';

const Container = styled(SafeAreaView)<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.COLORS.SCREEN_BACKGROUND};
`;

const Content = styled(View)<{ padding?: number }>`
  flex: 1;
  padding: ${(props) =>
    props.padding !== undefined && props.padding !== null
      ? `${responsive(props.padding)}px`
      : `${responsive(26)}px`};
`;

interface LayoutProps {
  children: React.ReactNode;
  padding?: number;
  backgroundColor?: string;
}

const ScreenLayout: React.FC<LayoutProps> = ({
  children,
  padding,
  backgroundColor,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Content padding={padding}>{children}</Content>
    </Container>
  );
};

export default ScreenLayout;
