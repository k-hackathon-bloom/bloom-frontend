import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header, { HeaderProps } from '@components/common/Header';
import {
  HeaderButtonProps,
  HeaderButtonContainer,
  LeftButtonWrapper,
  HEADER_BUTTON_SIZE,
} from '@components/common/HeaderButton';
import BackIcon from '@assets/icons/back.svg';

const BackButton: React.FC<HeaderButtonProps> = ({ onPress }) => {
  return (
    <LeftButtonWrapper onPress={onPress}>
      <BackIcon width={HEADER_BUTTON_SIZE} height={HEADER_BUTTON_SIZE} />
    </LeftButtonWrapper>
  );
};

const UserSettingsHeader: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Header
      title={title}
      leftContent={
        <HeaderButtonContainer>
          <BackButton onPress={handleBackPress} />
        </HeaderButtonContainer>
      }
    />
  );
};

export default UserSettingsHeader;
