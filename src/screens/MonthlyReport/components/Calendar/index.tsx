import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import {
  useMonthlyAchievementQuery,
  useHolidaysQuery,
} from '@hooks/queries/calendarQueries';
import { SvgUri } from 'react-native-svg';
import StyledText from '@components/common/StyledText';
import ItemLayout from '@components/ItemLayout';
import responsive from '@utils/responsive';
import theme from '@styles/theme';
import BackIcon from '@assets/icons/back.svg';
import ForwardIcon from '@assets/icons/forward.svg';

const CalendarContainer = styled(ItemLayout)`
  padding: ${responsive(35, 'height')}px ${responsive(20, 'height')}px;
  align-items: center;
`;

const CalendarHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin-bottom: ${responsive(15, 'height')}px;
`;

const YearText = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.LIGHT};
  font-size: ${responsive(28, 'height')}px;
  margin-right: ${responsive(8, 'height')}px;
`;

const MonthText = styled(StyledText)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.MEDIUM};
  font-size: ${responsive(28, 'height')}px;
`;

const ButtonContainer = styled(View)`
  position: absolute;
  flex-direction: row;
  height: ${responsive(48, 'height')}px;
  right: ${responsive(-12, 'height')}px;
`;

const Button = styled(TouchableOpacity)`
  justify-content: center;
  padding: ${responsive(12, 'height')}px;
`;

const DayCell = styled(View)<{ isToday?: boolean }>`
  width: ${100 / 7}%;
  padding: ${responsive(5, 'height')}px;
  align-items: center;
  background-color: ${(props) =>
    props.isToday ? props.theme.COLORS.CELL_TODAY : 'transparent'};
`;

const WeekDayWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${responsive(10, 'height')}px;
`;

const WeekDayCell = styled(DayCell)`
  justify-content: center;
`;

const WeekDayText = styled(StyledText)<{ weekDay: string }>`
  font-size: ${responsive(14, 'height')}px;
  color: ${(props) =>
    props.weekDay === '토'
      ? theme.COLORS.TEXT_SATURDAY
      : props.weekDay === '일'
        ? theme.COLORS.TEXT_HOLIDAY
        : theme.COLORS.TEXT_PRIMARY};
`;

const DatesWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const FlowerIconWrapper = styled(View)`
  height: ${responsive(30, 'height')}px;
  justify-content: center;
`;

const DateText = styled(StyledText)<{ isToday: boolean; day: number }>`
  font-size: ${responsive(12, 'height')}px;
  font-family: ${(props) =>
    props.isToday
      ? props.theme.FONT_WEIGHTS.BOLD
      : props.theme.FONT_WEIGHTS.REGULAR};
  text-align: center;
`;

const Calendar = () => {
  const [currentYearMonth, setCurrentYearMonth] = useState(new Date());
  const iconScalesRef = useRef<{ [key: string]: Animated.Value }>({});

  const currentYear = currentYearMonth.getFullYear();
  const currentMonth = currentYearMonth.getMonth() + 1;
  const today = new Date();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const yearMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

  const { data: monthlyAchievement = [], isLoading: achievementLoading } =
    useMonthlyAchievementQuery(yearMonth);

  const { data: holidays = [], isLoading: holidaysLoading } = useHolidaysQuery(
    currentYear.toString(),
    String(currentMonth).padStart(2, '0'),
  );

  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

  useHolidaysQuery(prevYear.toString(), String(prevMonth).padStart(2, '0'));
  useHolidaysQuery(nextYear.toString(), String(nextMonth).padStart(2, '0'));

  const isLoading = achievementLoading || holidaysLoading;

  useEffect(() => {
    monthlyAchievement.forEach((item) => {
      if (!iconScalesRef.current[item.date]) {
        iconScalesRef.current[item.date] = new Animated.Value(0);
      }
    });
  }, [monthlyAchievement]);

  const renderDates = () => {
    const datesInMonth = new Date(
      currentYearMonth.getFullYear(),
      currentYearMonth.getMonth() + 1,
      0,
    ).getDate();

    const firstDayOfMonth = new Date(
      currentYearMonth.getFullYear(),
      currentYearMonth.getMonth(),
      1,
    ).getDay();

    const isToday = (date: number) => {
      return (
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth() + 1 &&
        date === today.getDate()
      );
    };

    const getDay = (date: number) => {
      return new Date(
        currentYearMonth.getFullYear(),
        currentYearMonth.getMonth(),
        date,
      ).getDay();
    };

    const totalDates = datesInMonth + firstDayOfMonth;
    const dates = [];

    for (let i = 0; i < totalDates; i++) {
      const date = i - firstDayOfMonth + 1;
      const isCurrentMonth = date > 0 && date <= datesInMonth;

      const isHoliday = holidays.includes(date);
      const dayOfWeek = getDay(date);
      const dailyAchievement =
        !isLoading &&
        monthlyAchievement.find(
          (item) => parseInt(item.date.split('-')[2], 10) === date,
        );

      dates.push(
        <DayCell key={i} isToday={isCurrentMonth && isToday(date)}>
          {isCurrentMonth && (
            <View>
              <DateText
                isToday={isToday(date)}
                day={dayOfWeek}
                style={{
                  color: isHoliday
                    ? theme.COLORS.TEXT_HOLIDAY
                    : dayOfWeek === 0
                      ? theme.COLORS.TEXT_HOLIDAY
                      : dayOfWeek === 6
                        ? theme.COLORS.TEXT_SATURDAY
                        : theme.COLORS.TEXT_PRIMARY,
                }}
              >
                {date}
              </DateText>
              <FlowerIconWrapper>
                {!isLoading &&
                  dailyAchievement &&
                  dailyAchievement.flowerIconUrl && (
                    <Animated.View
                      style={{
                        transform: [
                          {
                            scale:
                              iconScalesRef.current[dailyAchievement.date] ||
                              new Animated.Value(0),
                          },
                        ],
                      }}
                    >
                      <SvgUri
                        key={dailyAchievement.date}
                        uri={dailyAchievement.flowerIconUrl}
                        width={responsive(15, 'height')}
                        height={responsive(15, 'height')}
                        onLoad={() => {
                          if (iconScalesRef.current[dailyAchievement.date]) {
                            Animated.timing(
                              iconScalesRef.current[dailyAchievement.date],
                              {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true,
                              },
                            ).start();
                          }
                        }}
                      />
                    </Animated.View>
                  )}
              </FlowerIconWrapper>
            </View>
          )}
        </DayCell>,
      );
    }
    return dates;
  };

  const handlePrevMonth = () => {
    setCurrentYearMonth(
      new Date(currentYearMonth.setMonth(currentYearMonth.getMonth() - 1)),
    );
  };

  const handleNextMonth = () => {
    if (
      currentYear !== today.getFullYear() ||
      currentMonth !== today.getMonth() + 1
    ) {
      setCurrentYearMonth(
        new Date(currentYearMonth.setMonth(currentYearMonth.getMonth() + 1)),
      );
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <YearText>{currentYear}</YearText>
        <MonthText>{currentMonth.toString().padStart(2, '0')}</MonthText>
        <ButtonContainer>
          <Button onPress={handlePrevMonth}>
            <BackIcon
              width={responsive(12, 'height')}
              height={responsive(12, 'height')}
            />
          </Button>
          <Button onPress={handleNextMonth}>
            <ForwardIcon
              width={responsive(12, 'height')}
              height={responsive(12, 'height')}
            />
          </Button>
        </ButtonContainer>
      </CalendarHeader>
      <WeekDayWrapper>
        {weekDays.map((weekDay) => (
          <WeekDayCell key={weekDay}>
            <WeekDayText weekDay={weekDay}>{weekDay}</WeekDayText>
          </WeekDayCell>
        ))}
      </WeekDayWrapper>
      <DatesWrapper>{renderDates()}</DatesWrapper>
    </CalendarContainer>
  );
};

export default Calendar;
