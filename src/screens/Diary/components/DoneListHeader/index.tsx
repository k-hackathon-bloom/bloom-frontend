import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import MenuHeader from '@components/common/MenuHeader';
import responsive from '@utils/responsive';

const HeaderContainer = styled(View)`
  gap: ${responsive(8, 'height')}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DoneListHeader = () => {
  return (
    <HeaderContainer>
      <MenuHeader title="던 리스트" />
    </HeaderContainer>
  );
};

export default DoneListHeader;
