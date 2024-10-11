import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '@screens/navigators/BottomTabNavigator';
import UserSettings from '@screens/UserSettings';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="UserSettings" component={UserSettings} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
