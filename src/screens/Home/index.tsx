import React from 'react';
import { useRecoilValue } from 'recoil';
import ScreenLayout from '@screens/ScreenLayout';
import { userDataAtom } from '@recoil/atoms';
import HomeHeader from '@screens/Home/components/HomeHeader';
import DailyProgress from '@screens/Home/components/DailyProgress';

const Home = () => {
  const userData = useRecoilValue(userDataAtom);

  return (
    <ScreenLayout>
      <HomeHeader title={`${userData.nickname}님 안녕하세요!`} />
      <DailyProgress />
    </ScreenLayout>
  );
};

export default Home;
