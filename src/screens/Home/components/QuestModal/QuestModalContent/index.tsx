import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import StyledButton from '@components/common/StyledButton';
import SpacedView from '@components/common/SpacedView';
import SelectableItem from '@screens/Home/components/QuestModal/SelectableItem';
import responsive from '@utils/responsive';
import Quest from '@type/Quest';

const ContentContainer = styled(View)`
  width: 100%;
`;

const QuestListContainer = styled(ScrollView)`
  aspect-ratio: 1;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  align-items: center;
  gap: ${responsive(5, 'height')}px;
  margin-top: ${responsive(10, 'height')}px;
`;

interface QuestListProps {
  quests: Quest[];
  selectedQuestIds: number[];
  completedQuestIds: number[];
  onSelectQuest: (questId: number) => void;
}

const QuestList: React.FC<QuestListProps> = ({
  quests,
  selectedQuestIds,
  completedQuestIds,
  onSelectQuest,
}) => {
  return (
    <QuestListContainer>
      <SpacedView gap={5}>
        {quests.map((quest) => (
          <SelectableItem
            key={quest.id}
            title={quest.title}
            iconUrl={`http://${quest.iconUrl}`}
            isSelected={selectedQuestIds.includes(quest.id)}
            isDone={completedQuestIds.includes(quest.id)}
            onPress={() => onSelectQuest(quest.id)}
          />
        ))}
      </SpacedView>
    </QuestListContainer>
  );
};

interface QuestModalContentProps {
  quests: Quest[];
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  registeredQuestIds: number[];
  completedQuestIds: number[];
  onUpdateQuests: (questToAddIds: number[], questToDeleteIds: number[]) => void;
}

const QuestModalContent: React.FC<QuestModalContentProps> = ({
  quests,
  setModalVisible,
  registeredQuestIds,
  completedQuestIds,
  onUpdateQuests,
}) => {
  const [selectedQuestIds, setSelectedQuestIds] =
    useState<number[]>(registeredQuestIds);

  const handleSelectQuest = (questId: number) => {
    setSelectedQuestIds((prev) =>
      prev.includes(questId)
        ? prev.filter((id) => id !== questId)
        : [...prev, questId],
    );
  };

  const handleConfirm = async () => {
    if (selectedQuestIds.length < 3) {
      Toast.show({
        type: 'info',
        text1: '데일리 퀘스트는 세 개 이상 선택해야 해요.',
      });
      return;
    }

    const questsToAdd = selectedQuestIds.filter(
      (id) => !registeredQuestIds.includes(id),
    );

    const questsToDelete = registeredQuestIds.filter(
      (id) => !selectedQuestIds.includes(id),
    );

    onUpdateQuests(questsToAdd, questsToDelete);
    setModalVisible(false);
  };

  return (
    <ContentContainer>
      <QuestList
        quests={quests}
        selectedQuestIds={selectedQuestIds}
        completedQuestIds={completedQuestIds}
        onSelectQuest={handleSelectQuest}
      />
      <ButtonContainer>
        <StyledButton
          buttonTheme="secondary"
          title="선택 항목 초기화"
          onPress={() => setSelectedQuestIds([])}
        />
        <StyledButton title="확인" onPress={handleConfirm} />
      </ButtonContainer>
    </ContentContainer>
  );
};

export default QuestModalContent;
