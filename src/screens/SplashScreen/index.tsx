import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useSetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNetInfo } from '@react-native-community/netinfo';
import apiClient from '@apis/client';
import { userDataAtom } from '@recoil/atoms';
import ScreenLayout from '@screens/ScreenLayout';
import AnimatedIcon from '@screens/SplashScreen/AnimatedIcon';
import useNavigate from '@hooks/useNavigate';

const LogoContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SplashScreen = () => {
  const netInfo = useNetInfo();
  const { replaceTo } = useNavigate();
  const setUserData = useSetRecoilState(userDataAtom);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await apiClient.get('/api/user');
      const userDataFromServer = {
        nickname: response.data.nickname,
        age: response.data.age,
        gender: response.data.gender,
        isSurvey: response.data.isSurvey,
      };
      setUserData(userDataFromServer);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '유저 정보를 가져오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, [setUserData]);

  useEffect(() => {
    const checkNetworkAndFetchData = async () => {
      if (!netInfo.isInternetReachable) {
        Toast.show({
          type: 'error',
          text1: '네트워크 연결을 확인해 주세요.',
        });
        return;
      }

      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        await fetchUserData();
        replaceTo('Main');
      } else {
        replaceTo('Login');
      }
    };

    const timeout = setTimeout(checkNetworkAndFetchData, 2100);

    return () => clearTimeout(timeout);
  }, [netInfo.isInternetReachable, replaceTo, fetchUserData]);

  return (
    <ScreenLayout backgroundColor="white">
      <LogoContainer>
        <AnimatedIcon />
      </LogoContainer>
    </ScreenLayout>
  );
};

export default SplashScreen;
