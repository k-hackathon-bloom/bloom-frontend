import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
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
      throw new Error();
    }
  }, [setUserData]);

  return { fetchUserData };
};

export default useFetchUserData;
