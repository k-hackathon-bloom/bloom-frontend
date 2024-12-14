import React from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import StyledButton from '@components/common/StyledButton';
import WordBreakText from '@components/common/WordBreakText';
import SpacedView from '@components/common/SpacedView';
import responsive from '@utils/responsive';

const ContentContainer = styled(View)`
  width: 100%;
`;

const QuestionText = styled(WordBreakText).attrs(() => ({
  containerStyle: {
    justifyContent: 'center',
    paddingHorizontal: responsive(30),
  },
  textStyle: {
    fontFamily: 'GowunDodum-Regular',
    fontSize: responsive(16, 'height'),
    letterSpacing: responsive(-1, 'height'),
  },
}))``;

const ButtonContainer = styled(View)`
  width: 100%;
  align-items: center;
  gap: ${responsive(5, 'height')}px;
  margin-top: ${responsive(10, 'height')}px;
`;

const AnswerInput = styled(TextInput)`
  height: ${responsive(120, 'height')}px;
  font-family: 'GowunDodum-Regular';
  font-size: ${responsive(14, 'height')}px;
  text-align: justify;
  text-align-vertical: top;
  letter-spacing: ${responsive(-0.5, 'height')}px;
  line-height: ${responsive(24, 'height')}px;
  padding: 0 ${responsive(15)}px;
`;

interface QuestionModalContentProps {
  question: string;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  editable: boolean;
}

const QuestionModalContent: React.FC<QuestionModalContentProps> = ({
  question,
  answer,
  setAnswer,
  editable,
}) => {
  return (
    <ContentContainer>
      <SpacedView gap={responsive(20, 'height')}>
        <QuestionText text={question} />
        <AnswerInput
          multiline
          value={answer}
          onChangeText={setAnswer}
          placeholder="해당 날짜에만 작성할 수 있어요. (최대 500자)"
          maxLength={500}
          editable={editable}
        />
        <ButtonContainer>
          <StyledButton title="저장" onPress={() => {}} />
        </ButtonContainer>
      </SpacedView>
    </ContentContainer>
  );
};

export default QuestionModalContent;
