import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNetInfo } from '@react-native-community/netinfo';
import ScreenLayout from '@screens/ScreenLayout';
import AnimatedIcon from '@screens/SplashScreen/AnimatedIcon';
import useUserDataQuery from '@hooks/queries/useUserDataQuery';
import useNavigate from '@hooks/useNavigate';

const LogoContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SplashScreen = () => {
  const netInfo = useNetInfo();
  const { replaceTo } = useNavigate();
  const { refetch: refetchUserData } = useUserDataQuery();

  useEffect(() => {
    const checkNetworkAndFetchData = async () => {
      if (!netInfo.isInternetReachable) {
        Toast.show({
          type: 'error',
          text1: '네트워크 연결을 확인해 주세요.',
        });
        return;
      }

      const accessToken = await AsyncStorage.getItem('accessToken');

      if (accessToken) {
        console.log('accessToken', accessToken);
        try {
          const { error } = await refetchUserData();
          if (error) throw error;
          replaceTo('Main');
        } catch {
          replaceTo('Login');
        }
      } else {
        replaceTo('Login');
      }
    };

    const timeout = setTimeout(checkNetworkAndFetchData, 2100);
    return () => clearTimeout(timeout);
  }, [netInfo.isInternetReachable, replaceTo, refetchUserData]);

  return (
    <ScreenLayout backgroundColor="white">
      <LogoContainer>
        <AnimatedIcon />
      </LogoContainer>
    </ScreenLayout>
  );
};

export default SplashScreen;
