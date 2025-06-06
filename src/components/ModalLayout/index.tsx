import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import StyledText from '@components/common/StyledText';
import toastStyle from '@styles/toastStyle';

const KeyboardAvoidingContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ModalContainer = styled(View)`
  width: 320px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 28px 0 20px 0;
`;

const ModalTitle = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.MEDIUM};
  font-size: 16px;
  margin-bottom: 16px;
`;

const ModalDescription = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.LIGHT};
  font-size: 13px;
  letter-spacing: -0.5px;
  color: gray;
  margin-top: -12px;
  margin-bottom: 16px;
`;

const ModalContent = styled(View)`
  width: 100%;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`;

interface ModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  content: React.ReactNode;
  onClose: () => void;
}

const ModalLayout: React.FC<ModalProps> = ({
  visible,
  title,
  description,
  content,
  onClose,
}) => {
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
              <ModalContainer>
                {title && <ModalTitle>{title}</ModalTitle>}
                {description && (
                  <ModalDescription>{description}</ModalDescription>
                )}
                <ModalContent>{content}</ModalContent>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </Overlay>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingContainer>
      <Toast
        config={toastStyle}
        position="bottom"
        bottomOffset={60}
        visibilityTime={2000}
      />
    </Modal>
  );
};

export default ModalLayout;
