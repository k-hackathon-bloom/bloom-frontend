import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import responsive from '@utils/responsive';
import theme from '@styles/theme';

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
    <ThemeProvider theme={theme}>
      <Container>
        <Content>{children}</Content>
      </Container>
    </ThemeProvider>
  );
};

export default ScreenLayout;
