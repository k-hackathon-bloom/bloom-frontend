import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';

export interface HeaderProps {
  title: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled(StyledText)<{ isCentered: boolean }>`
  font-size: 20px;
  letter-spacing: -0.5px;
  text-align: ${(props) => (props.isCentered ? 'center' : 'left')};
`;

const LeftContent = styled(View)`
  flex: 1;
  align-items: flex-start;
`;

const RightContent = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

const Header: React.FC<HeaderProps> = ({
  title,
  leftContent,
  rightContent,
}) => {
  const isLeftContentPresent = !!leftContent;

  return (
    <HeaderContainer>
      {leftContent && <LeftContent>{leftContent}</LeftContent>}
      <HeaderTitle isCentered={isLeftContentPresent} weight="BOLD">
        {title}
      </HeaderTitle>
      {rightContent ? (
        <RightContent>{rightContent}</RightContent>
      ) : (
        <RightContent />
      )}
    </HeaderContainer>
  );
};

export default Header;
