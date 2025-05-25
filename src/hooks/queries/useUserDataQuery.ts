import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/client';

const fetchUserData = async () => {
  const response = await apiClient.get('/api/user');
  const { nickname, age, gender, isSurvey } = response.data.userInfo;
  return { nickname, age, gender, isSurvey };
};

const useUserDataQuery = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    enabled: false,
  });
};

export default useUserDataQuery;
