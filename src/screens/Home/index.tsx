import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import ScreenLayout from '@screens/ScreenLayout';
import { userDataAtom } from '@recoil/atoms';
import Toast from 'react-native-toast-message';
import HomeHeader from '@screens/Home/components/HomeHeader';
import DailyProgress from '@screens/Home/components/DailyProgress';
import apiClient from '@apis/client';
import Quest from '@type/Quest';

const Home = () => {
  const userData = useRecoilValue(userDataAtom);
  const [allQuests, setAllQuests] = useState<Quest[]>([]);

  const fetchAllQuests = useCallback(async () => {
    try {
      const response = await apiClient.get('/api/quests/available');
      const questsFromServer = response.data.quests.map((quest: Quest) => ({
        id: quest.id,
        iconUrl: quest.iconUrl,
        title: quest.title,
        maxCount: quest.maxCount,
      }));
      setAllQuests(questsFromServer);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '퀘스트 데이터를 가져오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, []);

  useEffect(() => {
    fetchAllQuests();
  }, [fetchAllQuests]);

  return (
    <ScreenLayout>
      <HomeHeader title={`${userData.nickname}님 안녕하세요!`} />
      <DailyProgress />
    </ScreenLayout>
  );
};

export default Home;
