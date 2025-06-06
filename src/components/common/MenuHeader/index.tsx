import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';

const MenuWrapper = styled(View)<{ isTopLevel?: boolean }>`
  margin-bottom: 25px;
  margin-top: ${(props) => (props.isTopLevel ? 0 : 25)}px;
`;

const MenuTitle = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.BOLD};
  font-size: 16px;
  align-self: flex-start;
`;

interface MenuHeaderProps {
  title: string;
  isTopLevel?: boolean;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title, isTopLevel }) => {
  return (
    <MenuWrapper isTopLevel={isTopLevel}>
      <MenuTitle>{title}</MenuTitle>
    </MenuWrapper>
  );
};

export default MenuHeader;
