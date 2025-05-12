import React from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilState } from 'recoil';
import { messageFormAtom } from '@recoil/atoms';
import StyledButton from '@components/common/StyledButton';

const Container = styled(View)`
  width: 100%;
  height: 100%;
`;

const MessageTitle = styled(TextInput)`
  font-size: 14px;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.REGULAR};
  text-align-vertical: top;
  margin: 12px 0;
`;

const MessageContent = styled(TextInput)`
  font-size: 14px;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.REGULAR};
  text-align: justify;
  text-align-vertical: top;
  line-height: 21px;
  flex: 1;
`;

const ButtonContainer = styled(View)`
  padding-bottom: 8px;
`;

const NextButton = styled(StyledButton)``;

interface TextMessageFormProps {
  setNewMessageSheetStep: React.Dispatch<React.SetStateAction<number>>;
}

const TextMessageForm: React.FC<TextMessageFormProps> = ({
  setNewMessageSheetStep,
}) => {
  const [messageForm, setMessageForm] = useRecoilState(messageFormAtom);

  const handleTitleChange = (text: string) => {
    setMessageForm((prev) => ({ ...prev, title: text }));
  };

  const handleContentChange = (text: string) => {
    setMessageForm((prev) => ({ ...prev, content: text }));
  };

  return (
    <Container>
      <MessageTitle
        placeholder="제목"
        maxLength={50}
        value={messageForm.title}
        onChangeText={handleTitleChange}
      />
      <MessageContent
        placeholder={
          '불쾌감을 줄 수 있는 내용 작성을 금지합니다.\n모든 사용자에게 존중을 표현해 주세요. (최대 1,000자)'
        }
        multiline
        maxLength={1000}
        value={messageForm.content}
        onChangeText={handleContentChange}
      />
      <ButtonContainer>
        <NextButton title="다음" onPress={() => setNewMessageSheetStep(1)} />
      </ButtonContainer>
    </Container>
  );
};

export default TextMessageForm;
