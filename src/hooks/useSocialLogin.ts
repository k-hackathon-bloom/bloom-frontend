import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';

interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
}

const useSocialLogin = (
  onTokenGenerated: (accessToken: string, refreshToken: string) => void,
) => {
  const [fetchedUri, setFetchedUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUri = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<string>('/api/auth/kakao/login');
        setFetchedUri(response.data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '로그인 URI를 가져오는 데 실패했습니다.',
          text2: String(error),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUri();
  }, []);

  const handleAuthorizationCode = async (code: string) => {
    try {
      const response = await apiClient.post<SocialLoginResponse>(
        '/api/auth/kakao',
        { authorizationCode: code },
      );
      onTokenGenerated(response.data.accessToken, response.data.refreshToken);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '인가 코드 처리에 실패했습니다.',
        text2: String(error),
      });
    }
  };

  return { fetchedUri, loading, handleAuthorizationCode };
};

export default useSocialLogin;
