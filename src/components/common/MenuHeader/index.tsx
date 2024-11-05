import React from 'react';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const MenuTitle = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.BOLD};
  font-size: ${responsive(16, 'height')}px;
  align-self: flex-start;
  margin: ${responsive(25, 'height')}px 0;
`;

interface MenuHeaderProps {
  title: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  return <MenuTitle>{title}</MenuTitle>;
};

export default MenuHeader;
