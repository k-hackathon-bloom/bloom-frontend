import React from 'react';
import { View, Modal } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import SpinnerIcon from '@assets/icons/animated/spinner.json';

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const AnimatedSpinner = styled(LottieView)`
  width: 100px;
  height: 100px;
`;

const LoadingSpinner = () => {
  return (
    <Modal transparent={true} animationType="fade">
      <Overlay>
        <AnimatedSpinner source={SpinnerIcon} autoPlay loop />
      </Overlay>
    </Modal>
  );
};

export default LoadingSpinner;
