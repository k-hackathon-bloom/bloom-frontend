import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import theme from '@styles/theme';
import BottomTabNavigator from '@screens/navigators/BottomTabNavigator';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
