import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header, { HeaderProps } from '@components/common/Header';
import {
  HeaderButtonProps,
  HeaderButtonContainer,
  RightButtonWrapper,
  HEADER_BUTTON_SIZE,
} from '@components/common/HeaderButton';
import UserSettingsIcon from '@assets/icons/user_info.svg';
import ShopIcon from '@assets/icons/shop.svg';
import { StackParamList } from '@type/ScreenParamList.ts';

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
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const handleUserSettingsPress = () => {
    navigation.navigate('UserSettings');
  };

  return (
    <Header
      title={title}
      rightContent={
        <HeaderButtonContainer>
          <UserSettingsButton onPress={handleUserSettingsPress} />
          <ShopButton />
        </HeaderButtonContainer>
      }
    />
  );
};

export default HomeHeader;
