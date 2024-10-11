import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import responsive from '@utils/responsive';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const Content = styled(View)`
  flex: 1;
  padding: ${responsive(10)}px;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const ScreenLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default ScreenLayout;
