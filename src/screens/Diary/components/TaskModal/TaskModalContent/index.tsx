import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { useTaskDetailQuery } from '@hooks/queries/taskQueries';
import { useUpdateTaskMutation } from '@hooks/mutations/taskMutations';
import StyledButton from '@components/common/StyledButton';
import responsive from '@utils/responsive';
import SpacedView from '@components/common/SpacedView';

const ContentContainer = styled(View)`
  width: 100%;
`;

const TaskTitle = styled(TextInput)`
  font-family: ${(props) => props.theme.FONT_WEIGHTS.REGULAR};
  font-size: ${responsive(14, 'height')}px;
  padding: 0 ${responsive(15)}px;
`;

const StyledScrollView = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
}))``;

const PhotoView = styled(View)`
  flex-direction: row;
  padding: 0 ${responsive(10)}px;
  gap: ${responsive(10)}px;
`;

const TaskPhoto = styled(Image)`
  width: ${responsive(160)}px;
  height: ${responsive(120)}px;
  gap: ${responsive(8)}px;
`;

const TaskContent = styled(TextInput)`
  height: ${responsive(120, 'height')}px;
  font-family: ${(props) => props.theme.FONT_WEIGHTS.REGULAR};
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

const IMAGE_QUALITY = 1;
const MAX_PHOTO_COUNT = 3;

interface Photo {
  id: number;
  url: string;
  name?: string;
  type?: string;
}

interface Task {
  title: string;
  content: string;
  photos: Photo[];
}

interface TaskUpdate {
  title?: string;
  content?: string;
  deletedPhotoIds?: number[];
}

export interface TaskModalContentHandles {
  saveTask: () => Promise<void>;
}

interface TaskModalContentProps {
  id: number;
  fetchTasks: () => void;
  setIsTaskModified: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModalContent = forwardRef<
  TaskModalContentHandles,
  TaskModalContentProps
>(({ id, fetchTasks, setIsTaskModified }, ref) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskContent, setTaskContent] = useState<string>('');
  const [taskPhotos, setTaskPhotos] = useState<Photo[]>([]);
  const [initialTaskState, setInitialTaskState] = useState<Task | null>(null);

  const { data: taskDetail } = useTaskDetailQuery(id);
  const updateTaskMutation = useUpdateTaskMutation();

  useEffect(() => {
    if (taskDetail) {
      const { doneItem, photoUrls } = taskDetail;
      setTaskTitle(doneItem.title);
      setTaskContent(doneItem.content);
      setTaskPhotos(photoUrls);
      setInitialTaskState({
        title: doneItem.title,
        content: doneItem.content,
        photos: photoUrls,
      });
    }
  }, [taskDetail]);

  const handlePickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: IMAGE_QUALITY,
      selectionLimit: MAX_PHOTO_COUNT - taskPhotos.length,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        const addedPhotos: Photo[] = [];
        response.assets.forEach((asset, index) => {
          if (asset.uri) {
            const tempId =
              taskPhotos.length === 0
                ? index
                : Math.max(...taskPhotos.map((photo) => photo.id)) + 1 + index;
            const file = {
              id: tempId,
              url:
                Platform.OS === 'android'
                  ? asset.uri
                  : asset.uri.replace('file://', ''),
              name: asset.fileName,
              type: asset.type,
            };
            addedPhotos.push(file);
          }
        });
        setTaskPhotos((prev) => [...prev, ...addedPhotos]);
      }
    });
  };

  const handleRemoveImage = (photoId: number) => {
    Alert.alert('사진 삭제', '이 사진을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        onPress: () =>
          setTaskPhotos((prev) => prev.filter((photo) => photo.id !== photoId)),
      },
    ]);
  };

  const prepareTaskData = () => {
    const formData = new FormData();
    const taskData: TaskUpdate = {};

    if (initialTaskState?.title !== taskTitle) taskData.title = taskTitle;
    if (initialTaskState?.content !== taskContent) {
      taskData.content = taskContent;
    }

    if (
      JSON.stringify(initialTaskState?.photos) !== JSON.stringify(taskPhotos)
    ) {
      const deletedPhotoIds = initialTaskState?.photos
        .filter((photo) => !taskPhotos.some((p) => p.url === photo.url))
        .map((photo) => photo.id);

      const photosToUpload = taskPhotos
        .filter(
          (photo) => !initialTaskState?.photos.some((p) => p.url === photo.url),
        )
        .map((photo) => ({
          uri: photo.url,
          name: photo.name,
          type: photo.type,
        }));

      taskData.deletedPhotoIds = deletedPhotoIds;
      photosToUpload.forEach((photo) => formData.append('files', photo));
    }

    formData.append('data', JSON.stringify(taskData));
    return formData;
  };

  const handleSaveTask = async () => {
    if (!initialTaskState) return;

    const formData = prepareTaskData();

    await updateTaskMutation.mutateAsync({ id, formData });
    fetchTasks();
    setIsTaskModified(false);
  };

  useEffect(() => {
    if (
      initialTaskState &&
      (taskTitle !== initialTaskState.title ||
        taskContent !== initialTaskState.content ||
        JSON.stringify(taskPhotos) !== JSON.stringify(initialTaskState.photos))
    ) {
      setIsTaskModified(true);
    } else {
      setIsTaskModified(false);
    }
  }, [taskTitle, taskContent, taskPhotos, initialTaskState, setIsTaskModified]);

  useImperativeHandle(ref, () => ({ saveTask: handleSaveTask }));

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
          <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
            <PhotoView>
              {taskPhotos.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  onPress={() => handleRemoveImage(photo.id)}
                >
                  <TaskPhoto source={{ uri: photo.url }} />
                </TouchableOpacity>
              ))}
            </PhotoView>
          </StyledScrollView>
        )}
        <TaskContent
          value={taskContent}
          onChangeText={setTaskContent}
          placeholder="어떤 일을 했었나요? (최대 500자)"
          maxLength={500}
          multiline
        />
      </SpacedView>
      <ButtonContainer>
        <StyledButton
          buttonTheme="secondary"
          title={`사진 추가 (${taskPhotos.length}/${MAX_PHOTO_COUNT})`}
          disabled={taskPhotos.length === MAX_PHOTO_COUNT}
          onPress={handlePickImage}
        />
        <StyledButton
          title="저장"
          onPress={handleSaveTask}
          disabled={updateTaskMutation.isPending}
        />
      </ButtonContainer>
    </ContentContainer>
  );
});

export default TaskModalContent;
