import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Toast from 'react-native-toast-message';
import theme from '@styles/theme';
import responsive from '@utils/responsive';
import toastStyle from '@styles/toastStyle';
import StackNavigator from '@screens/navigators/StackNavigator';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
        <Toast
          config={toastStyle}
          position="bottom"
          bottomOffset={responsive(50, 'height')}
          visibilityTime={2000}
        />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
