import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import ItemLayout from '@components/ItemLayout';
import AIIcon from '@assets/icons/ai.svg';

const Container = styled(ItemLayout)`
  margin-top: 12px;
  padding: 24px;
`;

const Title = styled(StyledText)`
  font-size: 18px;
  letter-spacing: -1px;
  margin-left: 8px;
`;

const Summary = styled(StyledText)`
  color: ${(props) => props.theme.COLORS.TEXT_SECONDARY};
  font-size: 14px;
  letter-spacing: -1px;
  line-height: 22px;
  text-align: justify;
  margin-top: 8px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

interface AISummaryProps {
  summary: string;
  typingSpeed?: number;
  onTypingComplete?: () => void;
}

const AISummary: React.FC<AISummaryProps> = ({
  summary,
  typingSpeed = 30,
  onTypingComplete,
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typingCompletedRef = useRef<boolean>(false);
  const typingIndexRef = useRef<number>(0);

  useEffect(() => {
    if (summary && !typingCompletedRef.current) {
      setDisplayedText('');
      typingIndexRef.current = 0;

      const startTyping = () => {
        timerRef.current = setInterval(() => {
          if (typingIndexRef.current < summary.length) {
            setDisplayedText((prev) => prev + summary[typingIndexRef.current]);
            typingIndexRef.current++;
          } else {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            if (!typingCompletedRef.current && onTypingComplete) {
              typingCompletedRef.current = true;
              onTypingComplete();
            }
          }
        }, typingSpeed);
      };

      startTyping();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [summary, typingSpeed]);

  return (
    <Container>
      <TitleContainer>
        <AIIcon width={20} height={20} />
        <Title weight="SEMI_BOLD">총평</Title>
      </TitleContainer>
      <Summary>{displayedText}</Summary>
    </Container>
  );
};

export default AISummary;
