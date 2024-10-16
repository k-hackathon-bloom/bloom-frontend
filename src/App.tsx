import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import theme from '@styles/theme';
import StackNavigator from '@screens/navigators/StackNavigator';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
