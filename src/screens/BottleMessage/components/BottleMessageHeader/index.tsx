import React from 'react';
import Header, { HeaderProps } from '@components/common/Header';
import {
  HeaderButtonProps,
  HeaderButtonContainer,
  RightButtonWrapper,
  HEADER_BUTTON_SIZE,
} from '@components/common/HeaderButton';
import SendIcon from '@assets/icons/send.svg';

interface BottleMessageHeaderProps extends HeaderProps {
  handleSendButtonPress: () => void;
}

const SendButton: React.FC<HeaderButtonProps> = ({ onPress }) => {
  return (
    <RightButtonWrapper onPress={onPress}>
      <SendIcon width={HEADER_BUTTON_SIZE} height={HEADER_BUTTON_SIZE} />
    </RightButtonWrapper>
  );
};

const BottleMessageHeader: React.FC<BottleMessageHeaderProps> = ({
  title,
  handleSendButtonPress,
}) => {
  return (
    <Header
      title={title}
      rightContent={
        <HeaderButtonContainer>
          <SendButton onPress={handleSendButtonPress} />
        </HeaderButtonContainer>
      }
    />
  );
};

export default BottleMessageHeader;
