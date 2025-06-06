import React from 'react';
import { SafeAreaView, View, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(SafeAreaView)<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.COLORS.SCREEN_BACKGROUND};
`;

const Content = styled(View)`
  flex: 1;
  padding: 26px 26px 0 26px;
`;

interface LayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

const ScreenLayout: React.FC<LayoutProps> = ({
  children,
  backgroundColor,
  contentStyle,
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Content style={contentStyle}>{children}</Content>
    </Container>
  );
};

export default ScreenLayout;
