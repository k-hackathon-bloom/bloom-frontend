import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Toast from 'react-native-toast-message';
import theme from '@styles/theme';
import toastStyle from '@styles/toastStyle';
import StackNavigator from '@screens/navigators/StackNavigator';

const queryClient = new QueryClient();

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
          <Toast
            config={toastStyle}
            position="bottom"
            bottomOffset={60}
            visibilityTime={2000}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
