import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import ItemLayout from '@components/ItemLayout';

const Container = styled(ItemLayout)`
  margin-top: 12px;
  padding: 24px;
`;

const Title = styled(StyledText)`
  font-size: 18px;
  letter-spacing: -1px;
  margin-bottom: 3px;
`;

const SubTitle = styled(StyledText)`
  color: ${(props) => props.theme.COLORS.TEXT_SECONDARY};
  font-size: 14px;
  letter-spacing: -1px;
  margin-bottom: 16px;
`;

const BarChartContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  height: 160px;
`;

const BarContainer = styled(View)`
  flex: 1;
  align-items: center;
`;

const Bar = styled(Animated.View)<{ isHighest: boolean }>`
  width: 32px;
  border-radius: 6px 6px 0 0;
  background-color: ${(props) =>
    props.isHighest ? props.theme.COLORS.BUTTON_PRIMARY : 'whitesmoke'};
`;

const BarLabel = styled(StyledText)`
  font-size: 12px;
  margin-top: 4px;
`;

const ValueLabel = styled(StyledText)`
  font-size: 12px;
  margin-bottom: 8px;
`;

const Divider = styled(View)`
  border-bottom-width: 1px;
  border-color: whitesmoke;
  margin-bottom: 24px;
`;

type Month =
  | '1월'
  | '2월'
  | '3월'
  | '4월'
  | '5월'
  | '6월'
  | '7월'
  | '8월'
  | '9월'
  | '10월'
  | '11월'
  | '12월';
type MonthlyDataType = Record<Month, number>;

interface MonthlyChartProps {
  monthlyData: Partial<MonthlyDataType>;
  averageValue: number;
  animationDuration?: number;
}

const getLastSixMonths = (): Month[] => {
  const months: Month[] = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  const currentDate = new Date();
  const lastMonth = (currentDate.getMonth() - 1 + 12) % 12;
  const lastSixMonths: Month[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (lastMonth - i + 12) % 12;
    lastSixMonths.push(months[monthIndex]);
  }

  return lastSixMonths;
};

const MonthlyChart: React.FC<MonthlyChartProps> = ({
  monthlyData,
  averageValue,
  animationDuration = 450,
}) => {
  const months = getLastSixMonths();
  const maxValue = Math.max(...months.map((month) => monthlyData[month] || 0));
  const safeMaxValue = maxValue || 1;
  const [barAnimations] = useState<Animated.Value[]>(
    months.map(() => new Animated.Value(0)),
  );

  const getTitle = (): string => {
    if (averageValue === 0) {
      return '아직 꽃을 피우지 않았어요!';
    } else if (averageValue < 10) {
      return '조금씩 꽃이 피어나고 있어요!';
    } else if (averageValue < 20) {
      return '꽃이 활짝 피고 있어요!';
    } else {
      return '많은 꽃이 피었습니다! 대단해요!';
    }
  };

  useEffect(() => {
    const animateBars = () => {
      months.forEach((month, index) => {
        const value = monthlyData[month] || 0;
        const barHeight = (value / safeMaxValue) * 120;
        Animated.timing(barAnimations[index], {
          toValue: barHeight,
          duration: (barHeight * animationDuration) / 120,
          delay: index * 150,
          useNativeDriver: false,
        }).start();
      });
    };
    animateBars();
  }, [monthlyData, animationDuration, months, barAnimations, safeMaxValue]);

  return (
    <Container>
      <Title weight="SEMI_BOLD">{getTitle()}</Title>
      <Divider>
        <SubTitle>
          한 달에 평균 {Math.round(averageValue)}개의 꽃을 피웠어요.
        </SubTitle>
      </Divider>
      <BarChartContainer>
        {months.map((month, index) => {
          const value = monthlyData[month] || 0;
          const isHighest = value === maxValue && maxValue > 0;

          return (
            <BarContainer key={month}>
              <ValueLabel weight="LIGHT">{value}</ValueLabel>
              <Bar
                style={{ height: barAnimations[index] }}
                isHighest={isHighest}
              />
              <BarLabel>{month}</BarLabel>
            </BarContainer>
          );
        })}
      </BarChartContainer>
    </Container>
  );
};

export default MonthlyChart;
