import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgProps } from 'react-native-svg';
import Home from '@screens/Home';
import Diary from '@screens/Diary';
import MonthlyReport from '@screens/MonthlyReport';
import BottleMessage from '@screens/BottleMessage';
import HomeIcon from '@assets/icons/home.svg';
import DiaryIcon from '@assets/icons/diary.svg';
import MonthlyReportIcon from '@assets/icons/monthly-report.svg';
import BottleMessageIcon from '@assets/icons/bottle-message.svg';
import responsive from '@utils/responsive';
import theme from '@styles/theme';

const Tab = createBottomTabNavigator();

const tabScreens = [
  { name: 'Home', component: Home, icon: HomeIcon },
  { name: 'Diary', component: Diary, icon: DiaryIcon },
  { name: 'MonthlyReport', component: MonthlyReport, icon: MonthlyReportIcon },
  { name: 'BottleMessage', component: BottleMessage, icon: BottleMessageIcon },
];

const renderTabIcon = (
  Icon: React.FC<SvgProps>,
  focused: boolean,
  iconSize: number,
) => (
  <Icon
    fill={focused ? theme.COLORS.BUTTON_PRIMARY : theme.COLORS.BUTTON_DISABLED}
    width={iconSize}
    height={iconSize}
  />
);

const BottomTabNavigator = (): JSX.Element => {
  const iconSize = responsive(32, 'height');

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: responsive(100, 'height'),
          backgroundColor: theme.COLORS.SCREEN_BACKGROUND,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      {tabScreens.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon(icon, focused, iconSize),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
