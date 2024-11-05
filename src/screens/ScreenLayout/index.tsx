import React from 'react';
import { SafeAreaView, View, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import responsive from '@utils/responsive';

const Container = styled(SafeAreaView)<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.COLORS.SCREEN_BACKGROUND};
`;

const Content = styled(View)`
  flex: 1;
  padding: ${responsive(26)}px ${responsive(26)}px 0 ${responsive(26)}px;
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
