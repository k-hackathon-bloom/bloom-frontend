import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import useDailyQuestionQuery from '@hooks/queries/useDailyQuestionQuery';
import useDoneTasksQuery from '@hooks/queries/useDoneTasksQuery';
import {
  useRegisterDailyQuestionMutation,
  useAddDoneTaskMutation,
  useDeleteDoneTaskMutation,
} from '@hooks/mutations/diaryMutations';
import ScreenLayout from '@screens/ScreenLayout';
import DiaryHeader from '@screens/Diary/components/DiaryHeader';
import getFormatedDate from '@utils/getFormatedDate';
import DailyInspiration from '@screens/Diary/components/DailyInspiration';
import DoneListHeader from '@screens/Diary/components/DoneListHeader';
import DoneListItem, {
  AddTaskButton,
} from '@screens/Diary/components/DoneListItem';
import ModalLayout from '@components/ModalLayout';
import QuestionModalContent, {
  QuestionModalContentHandles,
} from '@screens/Diary/components/QuestionModal/QuestionModalContent';
import TaskModalContent, {
  TaskModalContentHandles,
} from '@screens/Diary/components/TaskModal/TaskModalContent';
import SpacedView from '@components/common/SpacedView';
import responsive from '@utils/responsive';

const Diary = () => {
  const [date, setDate] = useState(new Date());
  const [answer, setAnswer] = useState('');
  const [initialAnswer, setInitialAnswer] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saying, setSaying] = useState('');
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);
  const [isTaskModified, setIsTaskModified] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const questionModalRef = useRef<QuestionModalContentHandles>(null);
  const taskModalRef = useRef<TaskModalContentHandles>(null);

  const getLocalDateString = () => {
    const offset = date.getTimezoneOffset() * 60000;
    const dateOffset = new Date(date.getTime() - offset);
    return dateOffset.toISOString().split('T')[0];
  };

  const localDate = getLocalDateString();

  const { data: questionData, refetch: refetchQuestion } =
    useDailyQuestionQuery(localDate);

  const { data: doneList = [], refetch: refetchTasks } =
    useDoneTasksQuery(localDate);

  const registerQuestionMutation = useRegisterDailyQuestionMutation();
  const addTaskMutation = useAddDoneTaskMutation();
  const deleteTaskMutation = useDeleteDoneTaskMutation();

  useEffect(() => {
    if (questionData) {
      setAnswer(questionData.answer);
      setInitialAnswer(questionData.answer);
    }
  }, [questionData]);

  const isToday = useCallback(() => {
    const today = new Date();
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }, [date]);

  useEffect(() => {
    const registerQuestion = async () => {
      if (isToday() && questionData && !questionData.question) {
        await registerQuestionMutation.mutateAsync();
        refetchQuestion();
      }
    };

    registerQuestion();
  }, [date, questionData, registerQuestionMutation, refetchQuestion, isToday]);

  const saveAnswer = () => {
    if (questionModalRef.current) {
      questionModalRef.current.saveAnswer();
    }
  };

  const handleQuestionModalClose = () => {
    if (initialAnswer !== answer) {
      Alert.alert(
        '변경 사항 저장',
        '저장하지 않은 변경 사항이 있습니다.\n변경 사항을 저장하시겠습니까?',
        [
          {
            text: '저장',
            onPress: () => {
              saveAnswer();
              setQuestionModalVisible(false);
            },
          },
          {
            text: '저장 안 함',
            onPress: () => {
              setQuestionModalVisible(false);
            },
          },
          { text: '취소', style: 'cancel' },
        ],
      );
    } else {
      setQuestionModalVisible(false);
    }
  };

  const handleAddTask = async () => {
    await addTaskMutation.mutateAsync(localDate);
  };

  const handleDeleteTask = async (taskId: number) => {
    Alert.alert('항목 삭제', '이 항목을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          await deleteTaskMutation.mutateAsync({ taskId, date: localDate });
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
        <DailyInspiration
          question={questionData?.question || ''}
          saying={saying}
          handleOpenModal={() => {
            if (questionData?.question) {
              refetchQuestion();
              setQuestionModalVisible(true);
            }
          }}
        />
        <DoneListHeader />
        <SpacedView gap={responsive(8, 'height')}>
          {doneList.map((item) => (
            <DoneListItem
              key={item.id}
              id={item.id}
              title={item.title}
              handleOpenModal={() => {
                setSelectedTask(item.id);
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
        title="오늘의 질문 답변"
        visible={questionModalVisible}
        content={
          <QuestionModalContent
            ref={questionModalRef}
            question={questionData?.question || ''}
            answer={answer}
            setAnswer={setAnswer}
            setInitialAnswer={setInitialAnswer}
            editable={isToday()}
          />
        }
        onClose={handleQuestionModalClose}
      />
      <ModalLayout
        visible={taskModalVisible}
        content={
          <TaskModalContent
            ref={taskModalRef}
            id={selectedTask}
            fetchTasks={refetchTasks}
            setIsTaskModified={setIsTaskModified}
          />
        }
        onClose={handleTaskModalClose}
      />
    </ScreenLayout>
  );
};

export default Diary;
