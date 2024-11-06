import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import ScreenLayout from '@screens/ScreenLayout';
import DiaryHeader from '@screens/Diary/components/DiaryHeader';
import getFormatedDate from '@utils/getFormatedDate';
import DailyInspiration from '@screens/Diary/components/DailyInspiration';
import DoneListHeader from '@screens/Diary/components/DoneListHeader';
import DoneListItem, {
  AddTaskButton,
} from '@screens/Diary/components/DoneListItem';
import apiClient from '@apis/client';
import DoneTask from '@type/DoneTask';
import SpacedView from '@components/common/SpacedView';
import responsive from '@utils/responsive';

const Diary = () => {
  const [date, setDate] = useState(new Date());
  // eslint-disable-next-line
  const [question, setQuestion] = useState('');
  // eslint-disable-next-line
  const [saying, setSaying] = useState('');
  const [doneList, setDoneList] = useState<DoneTask[]>([]);

  const getLocalDateString = () => {
    const offset = date.getTimezoneOffset() * 60000;
    const dateOffset = new Date(date.getTime() - offset);
    return dateOffset.toISOString().split('T')[0];
  };

  const localDate = getLocalDateString();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/done-list/${localDate}`);
      const tasksFromServer = response.data.donelist.map((item: any) => ({
        id: item.itemId,
        title: item.title,
        content: item.content,
      }));
      setDoneList(tasksFromServer);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '던 리스트를 불러오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, [localDate]);

  const addTask = async () => {
    const formData = new FormData();
    const newTask = {
      doneDate: localDate,
      title: '새로운 작업',
      content: '',
    };
    formData.append('data', JSON.stringify(newTask));

    try {
      await apiClient.post('/api/done-list', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await fetchTasks();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '던 리스트 항목 추가에 실패했습니다.',
        text2: String(error),
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [date, fetchTasks]);

  return (
    <ScreenLayout>
      <DiaryHeader title={getFormatedDate(date)} setDate={setDate} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DailyInspiration question={question} saying={saying} />
        <DoneListHeader />
        <SpacedView gap={responsive(8, 'height')}>
          {doneList.map((item) => (
            <DoneListItem key={item.id} title={item.title} />
          ))}
          <AddTaskButton onPress={addTask} />
        </SpacedView>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Diary;
