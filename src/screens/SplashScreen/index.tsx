import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useSetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      console.error('유저 정보를 가져오는 데 실패했습니다.:', error);
    }
  }, [setUserData]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          await fetchUserData();
          replaceTo('Main');
        } else {
          replaceTo('Login');
        }
      } catch (error) {
        console.error('인증 토큰을 가져오는 데 실패했습니다.', error);
        replaceTo('Login');
      }
    }, 2800);

    return () => clearTimeout(timeout);
  }, [replaceTo, fetchUserData]);

  return (
    <ScreenLayout backgroundColor="white">
      <LogoContainer>
        <AnimatedIcon />
      </LogoContainer>
    </ScreenLayout>
  );
};

export default SplashScreen;
