import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import MenuHeader from '@components/common/MenuHeader';

const HeaderContainer = styled(View)`
  gap: 8px;
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
