import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header, { HeaderProps } from '@components/common/Header';
import {
  HeaderButtonProps,
  HeaderButtonContainer,
  RightButtonWrapper,
  HEADER_BUTTON_SIZE,
} from '@components/common/HeaderButton';
import CalendarIcon from '@assets/icons/calendar.svg';

const CalendarButton: React.FC<HeaderButtonProps> = ({ onPress }) => {
  return (
    <RightButtonWrapper onPress={onPress}>
      <CalendarIcon width={HEADER_BUTTON_SIZE} height={HEADER_BUTTON_SIZE} />
    </RightButtonWrapper>
  );
};

interface DiaryHeaderProps extends HeaderProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({ title, setDate }) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setDatePickerVisible(false);
  };

  return (
    <Header
      title={title}
      rightContent={
        <HeaderButtonContainer>
          <CalendarButton onPress={() => setDatePickerVisible(true)} />
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
          />
        </HeaderButtonContainer>
      }
    />
  );
};

export default DiaryHeader;
