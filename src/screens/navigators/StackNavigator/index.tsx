import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from '@type/ScreenParamList';
import SocialLogin from '@screens/SocialLogin';
import BottomTabNavigator from '@screens/navigators/BottomTabNavigator';
import UserSettings from '@screens/UserSettings';

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Login" component={SocialLogin} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="UserSettings" component={UserSettings} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
