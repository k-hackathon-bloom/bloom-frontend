import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from '@type/ScreenParamList';
import SplashScreen from '@screens/SplashScreen';
import SocialLogin from '@screens/SocialLogin';
import BottomTabNavigator from '@screens/navigators/BottomTabNavigator';
import UserSettings from '@screens/UserSettings';
import useAxiosInterceptor from '@hooks/useAxiosInterceptor';
import apiClient from '@apis/client';

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  useAxiosInterceptor(apiClient);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={SocialLogin} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="UserSettings" component={UserSettings} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
