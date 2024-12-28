import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import responsive from '@utils/responsive';
import innerHtml from '@screens/SplashScreen/AnimatedIcon/innerHtml';

const WebViewContainer = styled(View)`
  width: ${responsive(110, 'height')}px;
  height: ${responsive(155, 'height')}px;
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
