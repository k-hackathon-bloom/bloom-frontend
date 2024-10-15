import { useEffect, useState } from 'react';
import apiClient from '@apis/client';

interface SocialLoginResponse {
  accessToken: string;
}

const useSocialLogin = (onTokenGenerated: (token: string) => void) => {
  const [fetchedUri, setFetchedUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUri = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<string>('/api/auth/kakao/login');
        setFetchedUri(response.data);
      } catch (error) {
        console.error('로그인 URI를 가져오는 데 실패했습니다.', error);
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
      onTokenGenerated(response.data.accessToken);
    } catch (error) {
      console.error('인가 코드 처리에 실패했습니다.', error);
    }
  };

  return { fetchedUri, loading, handleAuthorizationCode };
};

export default useSocialLogin;
