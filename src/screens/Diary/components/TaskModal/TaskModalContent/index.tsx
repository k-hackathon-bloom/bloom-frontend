import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import StyledButton from '@components/common/StyledButton';
import responsive from '@utils/responsive';
import SpacedView from '@components/common/SpacedView';
import apiClient from '@apis/client';

const ContentContainer = styled(View)`
  width: 100%;
`;

const TaskTitle = styled(TextInput)`
  font-size: ${responsive(14, 'height')}px;
  padding: 0 ${responsive(15)}px;
  margin-top: ${responsive(5, 'height')}px;
`;

const PhotoView = styled(View)`
  flex-direction: row;
  padding: 0 ${responsive(10)}px;
`;

const TaskPhoto = styled(Image)`
  width: ${responsive(160)}px;
  height: ${responsive(120)}px;
  gap: ${responsive(8)}px;
`;

const TaskContent = styled(TextInput)`
  height: ${responsive(120, 'height')}px;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.LIGHT};
  font-size: ${responsive(14, 'height')}px;
  text-align: justify;
  text-align-vertical: top;
  letter-spacing: ${responsive(-0.5, 'height')}px;
  line-height: ${responsive(24, 'height')}px;
  padding: 0 ${responsive(15)}px;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  align-items: center;
  gap: ${responsive(5, 'height')}px;
  margin-top: ${responsive(10, 'height')}px;
`;

const TaskModalContent = ({ id }: { id: number }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskContent, setTaskContent] = useState<string>('');
  const [taskPhotos, setTaskPhotos] = useState([]);

  const fetchTaskDetail = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/done-list/detail/${id}`);
      const { doneItem } = response.data;
      const { photoUrls } = response.data;

      setTaskTitle(doneItem.title);
      setTaskContent(doneItem.content);
      setTaskPhotos(photoUrls);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '던 리스트를 불러오는 데 실패했습니다.',
        text2: String(error),
      });
    }
  }, [id]);

  useEffect(() => {
    fetchTaskDetail();
  }, [fetchTaskDetail]);

  return (
    <ContentContainer>
      <SpacedView gap={responsive(20, 'height')}>
        <TaskTitle
          value={taskTitle}
          onChangeText={setTaskTitle}
          placeholder="제목"
          maxLength={50}
        />
        {taskPhotos.length > 0 && (
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <PhotoView>
              {taskPhotos.map((photo: { id: number; url: string }) => (
                <TouchableOpacity key={photo.id}>
                  <TaskPhoto source={{ uri: photo.url }} />
                </TouchableOpacity>
              ))}
            </PhotoView>
          </ScrollView>
        )}
        <TaskContent
          value={taskContent}
          onChangeText={setTaskContent}
          placeholder="어떤 일을 하셨나요? (최대 500자)"
          maxLength={500}
          multiline={true}
        />
      </SpacedView>
      <ButtonContainer>
        <StyledButton
          buttonTheme="secondary"
          title={`사진 추가 (${taskPhotos.length}/3)`}
          onPress={() => console.log('사진 추가')}
        />
        <StyledButton title="저장" onPress={() => console.log('저장')} />
      </ButtonContainer>
    </ContentContainer>
  );
};

export default TaskModalContent;
