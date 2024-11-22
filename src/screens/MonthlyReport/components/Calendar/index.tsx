import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import ItemLayout from '@components/ItemLayout';
import responsive from '@utils/responsive';
import fetchHolidayList from '@apis/fetchHolidayList';
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
        : theme.COLORS.TEXT_DEFAULT};
`;

const DatesWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const FlowerIconWrapper = styled(View)`
  height: ${responsive(25, 'height')}px;
`;

const DateText = styled(StyledText)<{ isToday: boolean; day: number }>`
  font-size: ${responsive(12, 'height')}px;
  font-family: ${(props) =>
    props.isToday
      ? props.theme.FONT_WEIGHTS.BOLD
      : props.theme.FONT_WEIGHTS.REGULAR};
`;

const Calendar = () => {
  const [currentYearMonth, setCurrentYearMonth] = useState(new Date());
  const today = new Date();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const currentYear = currentYearMonth.getFullYear();
  const currentMonth = currentYearMonth.getMonth() + 1;
  const [holidays, setHolidays] = useState<number[]>([]);
  const [holidayCache, setHolidayCache] = useState<{ [key: string]: number[] }>(
    {},
  );

  useEffect(() => {
    const loadHolidays = async () => {
      const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
      let prevMonthKey: string, nextMonthKey: string;

      if (currentMonth === 1) {
        prevMonthKey = `${currentYear - 1}-12`;
      } else {
        prevMonthKey = `${currentYear}-${String(currentMonth - 1).padStart(2, '0')}`;
      }

      if (currentMonth === 12) {
        nextMonthKey = `${currentYear + 1}-01`;
      } else {
        nextMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
      }

      const currentMonthHolidays = holidayCache[monthKey];

      if (currentMonthHolidays) {
        setHolidays(currentMonthHolidays);
      } else {
        const holidayListCurrentMonth = await fetchHolidayList(
          currentYear.toString(),
          currentMonth.toString().padStart(2, '0'),
        );

        setHolidayCache((prevCache) => ({
          ...prevCache,
          [monthKey]: holidayListCurrentMonth || [],
        }));
        setHolidays(holidayListCurrentMonth || []);
      }

      if (!holidayCache[prevMonthKey]) {
        const holidayListPrevMonth = await fetchHolidayList(
          prevMonthKey.split('-')[0],
          prevMonthKey.split('-')[1],
        );
        setHolidayCache((prevCache) => ({
          ...prevCache,
          [prevMonthKey]: holidayListPrevMonth || [],
        }));
      }

      if (!holidayCache[nextMonthKey]) {
        const holidayListNextMonth = await fetchHolidayList(
          nextMonthKey.split('-')[0],
          nextMonthKey.split('-')[1],
        );
        setHolidayCache((prevCache) => ({
          ...prevCache,
          [nextMonthKey]: holidayListNextMonth || [],
        }));
      }
    };

    loadHolidays();
  }, [currentYear, currentMonth, holidayCache]);

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
                        : theme.COLORS.TEXT_DEFAULT,
                }}
              >
                {date}
              </DateText>
              <FlowerIconWrapper />
            </View>
          )}
        </DayCell>,
      );
    }
    return dates;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <YearText>{currentYear}</YearText>
        <MonthText>{currentMonth.toString().padStart(2, '0')}</MonthText>
        <ButtonContainer>
          <Button
            onPress={() =>
              setCurrentYearMonth(
                new Date(
                  currentYearMonth.setMonth(currentYearMonth.getMonth() - 1),
                ),
              )
            }
          >
            <BackIcon
              width={responsive(12, 'height')}
              height={responsive(12, 'height')}
            />
          </Button>
          <Button
            onPress={() => {
              if (
                currentYear !== today.getFullYear() ||
                currentMonth !== today.getMonth() + 1
              ) {
                setCurrentYearMonth(
                  new Date(
                    currentYearMonth.setMonth(currentYearMonth.getMonth() + 1),
                  ),
                );
              }
            }}
          >
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
