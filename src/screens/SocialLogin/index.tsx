import React, { useState, useEffect, useCallback } from 'react';
import { ImageBackground, View, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import responsive from '@utils/responsive';
import StyledText from '@components/common/StyledText';
import StyledButton from '@components/common/StyledButton';
import ScreenLayout from '@screens/ScreenLayout';
import SocialLoginWebView from '@screens/SocialLogin/SocialLoginWebView';
import theme from '@styles/theme';
import KakaoIcon from '@assets/icons/kakao.svg';
import backgroundImage from '@assets/backgrounds/login.jpg';
import appIcon from '@assets/icon-512.png';
import useAnimatedValue from '@hooks/useAnimatedValue';
import useNavigate from '@hooks/useNavigate';
import useFetchUserData from '@hooks/useFetchUserData';

const SloganContainer = styled(View)`
  position: absolute;
  top: 35%;
  width: 80%;
`;

const LoginButtonContainer = styled(View)`
  position: absolute;
  bottom: ${responsive(75, 'height')}px;
  width: 88%;
  align-items: center;
`;

const AppIcon = styled(Image)`
  width: ${responsive(60, 'height')}px;
  height: ${responsive(60, 'height')}px;
  margin-bottom: ${responsive(15, 'height')}px;
`;

const SloganText = styled(StyledText)`
  font-size: ${responsive(28, 'height')}px;
  color: ${(props) => props.theme.COLORS.TEXT_SLOGAN};
  letter-spacing: ${responsive(-1, 'height')}px;
`;

const HighlightedText = styled(StyledText)`
  font-family: 'NEXONLv1GothicBold';
  color: ${(props) => props.theme.COLORS.TEXT_SLOGAN};
  letter-spacing: 0;
`;

const NoPaddingLayout = styled(ScreenLayout).attrs(() => ({
  contentStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}))``;

const StyledImageBackground = styled(ImageBackground)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Slogan = () => {
  const { animatedValue: iconY, animateToValue: afterIconY } =
    useAnimatedValue(50);
  const { animatedValue: iconOpacity, animateToValue: afterIconOpacity } =
    useAnimatedValue(0);
  const { animatedValue: textY, animateToValue: afterTextY } =
    useAnimatedValue(50);
  const { animatedValue: textOpacity, animateToValue: afterTextOpacity } =
    useAnimatedValue(0);

  const startAnimation = useCallback(() => {
    afterIconY(0, 800).start();
    afterIconOpacity(1, 800).start();
    afterTextY(0, 800).start();
    afterTextOpacity(1, 800).start();
  }, [afterIconY, afterIconOpacity, afterTextY, afterTextOpacity]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <SloganContainer>
      <Animated.View
        style={{ transform: [{ translateY: iconY }], opacity: iconOpacity }}
      >
        <AppIcon source={appIcon} />
      </Animated.View>
      <Animated.View
        style={{ transform: [{ translateY: textY }], opacity: textOpacity }}
      >
        <SloganText weight="BOLD">
          {'일상에서 찾는 작은 기쁨,\n'}
          <HighlightedText>bloom</HighlightedText>과 함께
        </SloganText>
      </Animated.View>
    </SloganContainer>
  );
};

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress }) => (
  <LoginButtonContainer>
    <StyledButton
      title="카카오 계정으로 로그인"
      icon={
        <KakaoIcon
          width={responsive(20, 'height')}
          height={responsive(20, 'height')}
        />
      }
      titleStyle={{
        color: theme.COLORS.TEXT_KAKAO,
        fontFamily: theme.FONT_WEIGHTS.BOLD,
      }}
      buttonStyle={{ backgroundColor: theme.COLORS.BUTTON_KAKAO }}
      onPress={onPress}
    />
  </LoginButtonContainer>
);

const SocialLogin = () => {
  const [showWebView, setShowWebView] = useState(false);
  const { navigateTo } = useNavigate();
  const { fetchUserData } = useFetchUserData();

  const onTokenGenerated = async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '토큰을 저장하지 못했습니다.',
        text2: String(error),
      });
    }
    await fetchUserData();
    navigateTo('Main');
  };

  if (showWebView) {
    return (
      <NoPaddingLayout backgroundColor="white">
        <SocialLoginWebView onTokenGenerated={onTokenGenerated} />
      </NoPaddingLayout>
    );
  }

  return (
    <StyledImageBackground source={backgroundImage}>
      <Slogan />
      <LoginButton onPress={() => setShowWebView(true)} />
    </StyledImageBackground>
  );
};

export default SocialLogin;
