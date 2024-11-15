import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import Toast from 'react-native-toast-message';
import apiClient from '@apis/client';
import { userDataAtom } from '@recoil/atoms';

const useFetchUserData = () => {
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
      Toast.show({
        type: 'error',
        text1: '유저 정보를 가져오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, [setUserData]);

  return { fetchUserData };
};

export default useFetchUserData;
