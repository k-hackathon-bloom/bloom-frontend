import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const MenuWrapper = styled(View)<{ isTopLevel?: boolean }>`
  margin-bottom: ${responsive(25, 'height')}px;
  margin-top: ${(props) => (props.isTopLevel ? 0 : responsive(25, 'height'))}px;
`;

const MenuTitle = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.BOLD};
  font-size: ${responsive(16, 'height')}px;
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
