import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';
import toastStyle from '@styles/toastStyle';

const { height: screenHeight } = Dimensions.get('window');

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  flex: 1;
`;

const SheetTitle = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.MEDIUM};
  font-size: 18px;
  margin-bottom: 12px;
`;

const SheetContent = styled(View)`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AnimatedSheetContainer = Animated.createAnimatedComponent(View);

interface ModalProps {
  visible: boolean;
  title?: string;
  content: React.ReactNode;
  onClose: () => void;
}

const BottomSheetLayout: React.FC<ModalProps> = ({
  visible,
  title,
  content,
  onClose,
}) => {
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (e) => {
        if (Platform.OS === 'ios') {
          Animated.spring(keyboardHeight, {
            toValue: e.endCoordinates.height,
            useNativeDriver: false,
            damping: 15,
            stiffness: 100,
          }).start();
        }
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        if (Platform.OS === 'ios') {
          Animated.spring(keyboardHeight, {
            toValue: 0,
            useNativeDriver: false,
            damping: 15,
            stiffness: 100,
          }).start();
        }
      },
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        if (Platform.OS === 'android') {
          Animated.spring(keyboardHeight, {
            toValue: e.endCoordinates.height,
            useNativeDriver: false,
            damping: 15,
            stiffness: 100,
          }).start();
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (Platform.OS === 'android') {
          Animated.spring(keyboardHeight, {
            toValue: 0,
            useNativeDriver: false,
            damping: 15,
            stiffness: 100,
          }).start();
        }
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardHeight]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingContainer
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Overlay>
            <TouchableWithoutFeedback>
              <AnimatedSheetContainer
                style={{
                  width: '100%',
                  height: Animated.add(
                    screenHeight * 0.8,
                    Animated.multiply(keyboardHeight, -1),
                  ),
                  backgroundColor: 'white',
                  alignItems: 'flex-start',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 28,
                }}
              >
                <SheetTitle>{title}</SheetTitle>
                <SheetContent>{content}</SheetContent>
              </AnimatedSheetContainer>
            </TouchableWithoutFeedback>
          </Overlay>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingContainer>
      <Toast
        config={toastStyle}
        position="bottom"
        bottomOffset={responsive(60, 'height')}
        visibilityTime={2000}
      />
    </Modal>
  );
};

export default BottomSheetLayout;
