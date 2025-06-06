import React, { useState, useEffect, useCallback } from 'react';
import { ImageBackground, View, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import StyledText from '@components/common/StyledText';
import StyledButton from '@components/common/StyledButton';
import ScreenLayout from '@screens/ScreenLayout';
import SocialLoginWebView from '@screens/SocialLogin/SocialLoginWebView';
import theme from '@styles/theme';
import KakaoIcon from '@assets/icons/kakao.svg';
import backgroundImage from '@assets/backgrounds/login.jpg';
import appIcon from '@assets/icon-512.png';
import useUserDataQuery from '@hooks/queries/useUserDataQuery';
import useAnimatedValue from '@hooks/useAnimatedValue';
import useNavigate from '@hooks/useNavigate';

const SloganContainer = styled(View)`
  position: absolute;
  top: 35%;
  width: 80%;
`;

const LoginButtonContainer = styled(View)`
  position: absolute;
  bottom: 75px;
  width: 88%;
  align-items: center;
`;

const AppIcon = styled(Image)`
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
`;

const SloganText = styled(StyledText)`
  font-size: 28px;
  color: ${(props) => props.theme.COLORS.TEXT_SLOGAN};
  letter-spacing: -1px;
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
      icon={<KakaoIcon width={20} height={20} />}
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
  const { refetch: refetchUserData } = useUserDataQuery();

  const onTokenGenerated = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    try {
      await AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
      ]);

      const { error } = await refetchUserData();
      if (error) throw error;

      navigateTo('Main');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '로그인 실패',
        text2: String(error),
      });
    }
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
