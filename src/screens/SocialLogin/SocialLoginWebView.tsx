import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import styled from 'styled-components/native';
import useSocialLogin from '@hooks/useSocialLogin';

const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];

  if (queryString) {
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }

  return params;
};

interface SocialLoginWebViewProps {
  onTokenGenerated: (token: string) => void;
}

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
`;

const LoadingIndicator = () => (
  <CenteredView>
    <ActivityIndicator size="large" color="#999999" />
  </CenteredView>
);

const SocialLoginWebView: React.FC<SocialLoginWebViewProps> = ({
  onTokenGenerated,
}) => {
  const { fetchedUri, loading, handleAuthorizationCode } =
    useSocialLogin(onTokenGenerated);

  const handleNavigation = (request: WebViewNavigation) => {
    const redirectedUrl = request.url;

    if (redirectedUrl.includes('?code=')) {
      const { code } = getQueryParams(redirectedUrl);
      if (code) {
        handleAuthorizationCode(code);
        return false;
      }
    }

    return true;
  };

  return loading || !fetchedUri ? (
    <LoadingIndicator />
  ) : (
    <CenteredView>
      <WebView
        style={{ flex: 1, width: '100%' }}
        incognito={true}
        source={{ uri: fetchedUri }}
        onShouldStartLoadWithRequest={handleNavigation}
        javaScriptEnabled
      />
    </CenteredView>
  );
};

export default SocialLoginWebView;
