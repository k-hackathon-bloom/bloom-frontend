import React from 'react';
import Header, { HeaderProps } from '@components/common/Header';
import {
  HeaderButtonProps,
  HeaderButtonContainer,
  LeftButtonWrapper,
  HEADER_BUTTON_SIZE,
} from '@components/common/HeaderButton';
import BackIcon from '@assets/icons/back.svg';
import useNavigate from '@hooks/useNavigate';

const BackButton: React.FC<HeaderButtonProps> = ({ onPress }) => {
  return (
    <LeftButtonWrapper onPress={onPress}>
      <BackIcon width={HEADER_BUTTON_SIZE} height={HEADER_BUTTON_SIZE} />
    </LeftButtonWrapper>
  );
};

const UserSettingsHeader: React.FC<HeaderProps> = ({ title }) => {
  const { goBack } = useNavigate();

  return (
    <Header
      title={title}
      leftContent={
        <HeaderButtonContainer>
          <BackButton onPress={goBack} />
        </HeaderButtonContainer>
      }
    />
  );
};

export default UserSettingsHeader;
