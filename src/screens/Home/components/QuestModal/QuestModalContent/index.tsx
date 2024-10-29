import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import StyledButton from '@components/common/StyledButton';
import SelectableItem from '@screens/Home/components/QuestModal/SelectableItem';
import responsive from '@utils/responsive';
import Quest from '@type/Quest';

const ContentContainer = styled(View)`
  width: 100%;
`;

const QuestListContainer = styled(ScrollView)`
  aspect-ratio: 1;
`;

const SpacedView = styled(View)`
  gap: ${responsive(5, 'height')}px;
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
  onSelectQuest: (questId: number) => void;
}

const QuestList: React.FC<QuestListProps> = ({
  quests,
  selectedQuestIds,
  onSelectQuest,
}) => {
  return (
    <QuestListContainer>
      <SpacedView>
        {quests.map((quest) => (
          <SelectableItem
            key={quest.id}
            title={quest.title}
            iconUrl={`http://${quest.iconUrl}`}
            isSelected={selectedQuestIds.includes(quest.id)}
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
}

const QuestModalContent: React.FC<QuestModalContentProps> = ({
  quests,
  setModalVisible,
}) => {
  const [selectedQuestIds, setSelectedQuestIds] = useState<number[]>([]);

  const handleSelectQuest = (questId: number) => {
    setSelectedQuestIds((prev) => {
      if (prev.includes(questId)) {
        return prev.filter((id) => id !== questId);
      } else {
        return [...prev, questId];
      }
    });
  };

  return (
    <ContentContainer>
      <QuestList
        quests={quests}
        selectedQuestIds={selectedQuestIds}
        onSelectQuest={handleSelectQuest}
      />
      <ButtonContainer>
        <StyledButton
          buttonTheme="secondary"
          title="선택 항목 초기화"
          onPress={() => setSelectedQuestIds([])}
        />
        <StyledButton title="확인" onPress={() => setModalVisible(false)} />
      </ButtonContainer>
    </ContentContainer>
  );
};

export default QuestModalContent;
