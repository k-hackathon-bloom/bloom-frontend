import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import ScreenLayout from '@screens/ScreenLayout';
import DiaryHeader from '@screens/Diary/components/DiaryHeader';
import getFormatedDate from '@utils/getFormatedDate';
import DailyInspiration from '@screens/Diary/components/DailyInspiration';
import DoneListHeader from '@screens/Diary/components/DoneListHeader';
import DoneListItem, {
  AddTaskButton,
} from '@screens/Diary/components/DoneListItem';
import ModalLayout from '@components/ModalLayout';
import TaskModalContent, {
  TaskModalContentHandles,
} from '@screens/Diary/components/TaskModal/TaskModalContent';
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
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setselectedTask] = useState(0);
  const [isTaskModified, setIsTaskModified] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const taskModalRef = useRef<TaskModalContentHandles>(null);

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

  const handleAddTask = async () => {
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

  const handleDeleteTask = async (taskId: number) => {
    Alert.alert('항목 삭제', '이 항목을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          try {
            await apiClient.delete(`/api/done-list/${taskId}`);
            await fetchTasks();
          } catch (error) {
            Toast.show({
              type: 'error',
              text1: '던 리스트 항목을 삭제하는 데 실패했습니다.',
              text2: String(error),
            });
          }
        },
      },
    ]);
  };

  const saveTask = () => {
    if (taskModalRef.current) {
      taskModalRef.current.saveTask();
    }
  };

  const handleTaskModalClose = () => {
    if (isTaskModified) {
      Alert.alert(
        '변경 사항 저장',
        '저장하지 않은 변경 사항이 있습니다.\n변경 사항을 저장하시겠습니까?',
        [
          {
            text: '저장',
            onPress: () => {
              saveTask();
              setTaskModalVisible(false);
            },
          },
          {
            text: '저장 안 함',
            onPress: () => {
              setTaskModalVisible(false);
            },
          },
          { text: '취소', style: 'cancel' },
        ],
      );
    } else {
      setTaskModalVisible(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [date, fetchTasks]);

  return (
    <ScreenLayout>
      <DiaryHeader
        title={getFormatedDate(date)}
        date={date}
        setDate={setDate}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isSwiping}
      >
        <DailyInspiration question={question} saying={saying} />
        <DoneListHeader />
        <SpacedView gap={responsive(8, 'height')}>
          {doneList.map((item) => (
            <DoneListItem
              key={item.id}
              id={item.id}
              title={item.title}
              handleOpenModal={() => {
                setselectedTask(item.id);
                setTaskModalVisible(true);
              }}
              handleDeleteTask={handleDeleteTask}
              setIsSwiping={setIsSwiping}
            />
          ))}
          <AddTaskButton onPress={handleAddTask} />
        </SpacedView>
      </ScrollView>
      <ModalLayout
        title={getFormatedDate(date)}
        visible={taskModalVisible}
        content={
          <TaskModalContent
            ref={taskModalRef}
            id={selectedTask}
            fetchTasks={fetchTasks}
            setIsTaskModified={setIsTaskModified}
          />
        }
        onClose={handleTaskModalClose}
      />
    </ScreenLayout>
  );
};

export default Diary;
