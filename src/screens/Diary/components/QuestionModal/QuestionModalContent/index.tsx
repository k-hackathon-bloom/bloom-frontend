import React, { forwardRef, useImperativeHandle } from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useUpdateAnswerMutation } from '@hooks/mutations/questionMutations';
import StyledButton from '@components/common/StyledButton';
import WordBreakText from '@components/common/WordBreakText';
import SpacedView from '@components/common/SpacedView';

const ContentContainer = styled(View)`
  width: 100%;
`;

const QuestionText = styled(WordBreakText).attrs(() => ({
  containerStyle: {
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  textStyle: {
    fontFamily: 'GowunDodum-Regular',
    fontSize: 16,
    letterSpacing: -1,
  },
}))``;

const ButtonContainer = styled(View)`
  width: 100%;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`;

const AnswerInput = styled(TextInput)`
  height: 120px;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.REGULAR};
  font-size: 14px;
  text-align: justify;
  text-align-vertical: top;
  letter-spacing: -0.5px;
  line-height: 24px;
  padding: 0 15px;
`;

export interface QuestionModalContentHandles {
  saveAnswer: () => Promise<void>;
}

interface QuestionModalContentProps {
  question: string;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setInitialAnswer: React.Dispatch<React.SetStateAction<string>>;
  editable: boolean;
}

const QuestionModalContent = forwardRef<
  QuestionModalContentHandles,
  QuestionModalContentProps
>(({ question, answer, setAnswer, setInitialAnswer, editable }, ref) => {
  const updateAnswerMutation = useUpdateAnswerMutation();

  const handleSaveAnswer = async () => {
    await updateAnswerMutation.mutateAsync(answer);
    setInitialAnswer(answer);
  };

  useImperativeHandle(ref, () => ({
    saveAnswer: handleSaveAnswer,
  }));

  return (
    <ContentContainer>
      <SpacedView gap={20}>
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
          <StyledButton
            title="저장"
            onPress={handleSaveAnswer}
            disabled={updateAnswerMutation.isPending}
          />
        </ButtonContainer>
      </SpacedView>
    </ContentContainer>
  );
});

export default QuestionModalContent;
