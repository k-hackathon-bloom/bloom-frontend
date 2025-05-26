import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import ScreenLayout from '@screens/ScreenLayout';
import Toast from 'react-native-toast-message';
import useUserDataQuery from '@hooks/queries/useUserDataQuery';
import useRegisteredQuestsQuery from '@hooks/queries/useRegisteredQuestsQuery';
import {
  useDeleteQuestMutation,
  useCompleteQuestMutation,
  useUpdateQuestsMutation,
} from '@hooks/mutations/questMutations';
import HomeHeader from '@screens/Home/components/HomeHeader';
import DailyQuestHeader from '@screens/Home/components/DailyQuestHeader';
import DailyProgress from '@screens/Home/components/DailyProgress';
import apiClient from '@apis/client';
import Quest from '@type/Quest';
import ModalLayout from '@components/ModalLayout';
import QuestModalContent from '@screens/Home/components/QuestModal/QuestModalContent';
import SpacedView from '@components/common/SpacedView';
import ActiveQuestItem from '@screens/Home/components/ActiveQuestItem';

const fetchAllQuests = async (): Promise<Quest[]> => {
  const response = await apiClient.get('/api/quests/available');
  return response.data.quests.map((quest: Quest) => ({
    id: quest.id,
    iconUrl: quest.iconUrl,
    title: quest.title,
  }));
};

const Home = () => {
  const { data: userData } = useUserDataQuery();
  const { data: registeredQuests = [], isSuccess } = useRegisteredQuestsQuery();

  const deleteQuestMutation = useDeleteQuestMutation();
  const completeQuestMutation = useCompleteQuestMutation();
  const updateQuestsMutation = useUpdateQuestsMutation();

  const [allQuests, setAllQuests] = useState<Quest[]>([]);
  const [questModalVisible, setQuestModalVisible] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [, setExp] = useState(0);

  const handleDeleteQuest = async (questId: number) => {
    if (registeredQuests.length > 3) {
      deleteQuestMutation.mutate(questId);
    } else {
      Toast.show({
        type: 'info',
        text1: '데일리 퀘스트는 세 개 이상 유지해야 해요.',
      });
    }
  };

  const handleUpdateQuests = async (
    questIdsToAdd: number[],
    questIdsToRemove: number[],
  ) => {
    updateQuestsMutation.mutate({
      questIdsToAdd,
      questIdsToRemove,
    });
  };

  const handleCompleteQuest = async (questId: number) => {
    completeQuestMutation.mutate(questId, {
      onSuccess: () => {
        setExp((prev) => prev + 1);
      },
    });
  };

  useEffect(() => {
    const loadAllQuests = async () => {
      try {
        const quests = await fetchAllQuests();
        setAllQuests(quests);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '퀘스트 데이터를 가져오는 데 실패했습니다.',
          text2: String(error),
        });
      }
    };

    loadAllQuests();
  }, []);

  useEffect(() => {
    if (isSuccess && registeredQuests.length < 3) {
      setQuestModalVisible(true);
    }
  }, [isSuccess, registeredQuests]);

  return (
    <ScreenLayout>
      <HomeHeader title={`${userData?.nickname}님 안녕하세요!`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isSwiping}
      >
        <DailyProgress />
        <DailyQuestHeader onPress={() => setQuestModalVisible(true)} />
        <SpacedView gap={10}>
          {registeredQuests.map((quest) => (
            <ActiveQuestItem
              key={quest.id}
              id={quest.id}
              title={quest.title}
              iconUrl={quest.iconUrl}
              count={quest.maxCount}
              maxCount={quest.maxCount}
              isDone={quest.isDone}
              onDeleteQuest={handleDeleteQuest}
              onCompleteQuest={handleCompleteQuest}
              setIsSwiping={setIsSwiping}
            />
          ))}
        </SpacedView>
      </ScrollView>
      <ModalLayout
        visible={questModalVisible}
        title="데일리 퀘스트 선택"
        description="데일리 퀘스트는 3개 이상 선택해야 해요."
        content={
          <QuestModalContent
            quests={allQuests}
            setModalVisible={setQuestModalVisible}
            registeredQuestIds={registeredQuests.map((quest) => quest.id)}
            completedQuestIds={
              registeredQuests.length > 0
                ? registeredQuests
                    .filter((quest) => quest.isDone)
                    .map((quest) => quest.id)
                : []
            }
            onUpdateQuests={handleUpdateQuests}
          />
        }
        onClose={() => undefined}
      />
    </ScreenLayout>
  );
};

export default Home;
