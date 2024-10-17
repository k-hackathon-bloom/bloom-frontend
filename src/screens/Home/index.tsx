import React from 'react';
import { useRecoilValue } from 'recoil';
import StyledText from '@components/common/StyledText';
import ScreenLayout from '@screens/ScreenLayout';
import { userDataAtom } from '@recoil/atoms';

const Home = () => {
  const userData = useRecoilValue(userDataAtom);

  return (
    <ScreenLayout>
      <StyledText>{userData.nickname}</StyledText>
    </ScreenLayout>
  );
};

export default Home;
