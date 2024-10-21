import React from 'react';
import Header, { HeaderProps } from '@components/common/Header';
import {
  HeaderButtonProps,
  HeaderButtonContainer,
  RightButtonWrapper,
  HEADER_BUTTON_SIZE,
} from '@components/common/HeaderButton';
import UserSettingsIcon from '@assets/icons/user_info.svg';
import ShopIcon from '@assets/icons/shop.svg';
import useNavigate from '@hooks/useNavigate';

const UserSettingsButton: React.FC<HeaderButtonProps> = ({ onPress }) => {
  return (
    <RightButtonWrapper onPress={onPress}>
      <UserSettingsIcon
        width={HEADER_BUTTON_SIZE}
        height={HEADER_BUTTON_SIZE}
      />
    </RightButtonWrapper>
  );
};

const ShopButton: React.FC = () => {
  return (
    <RightButtonWrapper>
      <ShopIcon width={HEADER_BUTTON_SIZE} height={HEADER_BUTTON_SIZE} />
    </RightButtonWrapper>
  );
};

const HomeHeader: React.FC<HeaderProps> = ({ title }) => {
  const { navigateTo } = useNavigate();

  return (
    <Header
      title={title}
      rightContent={
        <HeaderButtonContainer>
          <UserSettingsButton onPress={() => navigateTo('UserSettings')} />
          <ShopButton />
        </HeaderButtonContainer>
      }
    />
  );
};

export default HomeHeader;
