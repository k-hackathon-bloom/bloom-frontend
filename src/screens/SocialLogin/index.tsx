import React, { useState } from 'react';
import { ImageBackground, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import responsive from '@utils/responsive';
import StyledText from '@styles/StyledText';
import StyledButton from '@styles/StyledButton';
import ScreenLayout from '@screens/ScreenLayout';
import SocialLoginWebView from '@screens/SocialLogin/SocialLoginWebView';
import KakaoIcon from '@assets/icons/kakao.svg';
import backgroundImage from '@assets/backgrounds/login.jpg';
import appIcon from '@assets/icon-512.png';

const SloganContainer = styled(View)`
  position: absolute;
  top: 35%;
  width: 80%;
`;

const LoginButtonContainer = styled(View)`
  position: absolute;
  bottom: ${responsive(75, 'height')}px;
  width: 100%;
  align-items: center;
`;

const AppIcon = styled(Image)`
  width: ${responsive(60, 'height')}px;
  height: ${responsive(60, 'height')}px;
  margin-bottom: ${responsive(15, 'height')}px;
`;

const SloganText = styled(StyledText)`
  font-size: ${responsive(28, 'height')}px;
  color: #5d41ff;
  letter-spacing: ${responsive(-1, 'height')}px;
`;

const HighlightedText = styled(StyledText)`
  font-family: 'NEXONLv1GothicBold';
  color: #5d41ff;
  letter-spacing: 0;
`;

const Slogan = () => (
  <SloganContainer>
    <AppIcon source={appIcon} />
    <SloganText weight="bold">
      {'일상에서 찾는 작은 기쁨,\n'}
      <HighlightedText>bloom</HighlightedText>과 함께
    </SloganText>
  </SloganContainer>
);

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress }) => (
  <LoginButtonContainer>
    <StyledButton
      title="카카오 계정으로 로그인"
      color="#191600"
      weight="bold"
      backgroundColor="#FEE500"
      onPress={onPress}
    >
      <KakaoIcon
        width={responsive(20, 'height')}
        height={responsive(20, 'height')}
      />
    </StyledButton>
  </LoginButtonContainer>
);

const SocialLogin = () => {
  const [showWebView, setShowWebView] = useState(false);
  const navigation = useNavigation();

  const onTokenGenerated = (token: string) => {
    console.log('생성된 토큰: ', token);
    // @ts-ignore
    navigation.navigate('Main');
  };

  if (showWebView) {
    return (
      <ScreenLayout backgroundColor="white" padding={0}>
        <SocialLoginWebView onTokenGenerated={onTokenGenerated} />
      </ScreenLayout>
    );
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Slogan />
      <LoginButton onPress={() => setShowWebView(true)} />
    </ImageBackground>
  );
};

export default SocialLogin;
