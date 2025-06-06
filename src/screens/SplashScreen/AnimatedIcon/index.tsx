import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import innerHtml from '@screens/SplashScreen/AnimatedIcon/innerHtml';

const WebViewContainer = styled(View)`
  width: 110px;
  height: 155px;
`;

const StyledWebView = styled(WebView)`
  background-color: transparent;
`;

const AnimatedIcon = () => {
  return (
    <TouchableWithoutFeedback>
      <WebViewContainer>
        <StyledWebView
          originWhitelist={['*']}
          source={{ html: innerHtml }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </WebViewContainer>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedIcon;
