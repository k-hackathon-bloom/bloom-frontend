import React, {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { messageFormAtom } from '@recoil/atoms';
import StyledButton from '@components/common/StyledButton';
import apiClient from '@apis/client';

const { width } = Dimensions.get('window');

const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: 12px;
`;

const PostCardButton = styled(TouchableOpacity)<{
  selected: boolean;
}>`
  width: ${(width - 56) / 3 - 8}px;
  margin-bottom: 12px;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;

const PostCardButtonImageWrapper = styled(View)`
  width: 100%;
  aspect-ratio: 2/3;
`;

const PostCardButtonImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  gap: 8px;
  padding-bottom: 8px;
  background-color: white;
`;

export interface PostCardPickerHandles {
  resetSelection: () => void;
}

interface PostCardPickerProps {
  setNewMessageSheetStep: () => void;
  onSendMessage: (title: string, content: string, postcardId: number) => void;
  setIsMessageModified: (modified: boolean) => void;
}

interface PostCard {
  id: number;
  url: string;
}

const PostCardPicker = forwardRef<PostCardPickerHandles, PostCardPickerProps>(
  ({ setNewMessageSheetStep, onSendMessage, setIsMessageModified }, ref) => {
    const [postCardImages, setPostCardImages] = useState<PostCard[]>([]);
    const [selectedPostCard, setSelectedPostCard] = useState<number | null>(
      null,
    );
    const [initialSelectedPostCard, setInitialSelectedPostCard] = useState<
      number | null
    >(null);
    const messageForm = useRecoilValue(messageFormAtom);
    const setMessageForm = useSetRecoilState(messageFormAtom);

    useEffect(() => {
      setInitialSelectedPostCard(selectedPostCard);
    }, []);

    useEffect(() => {
      const isPostCardModified = selectedPostCard !== initialSelectedPostCard;
      const hasMessageContent =
        messageForm.title.trim() !== '' || messageForm.content.trim() !== '';
      const isModified = isPostCardModified || hasMessageContent;
      setIsMessageModified(isModified);
    }, [
      selectedPostCard,
      initialSelectedPostCard,
      messageForm,
      setIsMessageModified,
    ]);

    useImperativeHandle(ref, () => ({
      resetSelection: () => {
        setSelectedPostCard(null);
        setInitialSelectedPostCard(null);
        setMessageForm({ title: '', content: '' });
        setIsMessageModified(false);
      },
    }));

    const fetchPostCards = useCallback(async () => {
      try {
        const response = await apiClient.get('/api/postcard/all');
        setPostCardImages(response.data.postcards);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '편지지를 불러오는 데 실패했습니다.',
          text2: String(error),
        });
      }
    }, []);

    useEffect(() => {
      fetchPostCards();
    }, [fetchPostCards]);

    const handlePostCardSelection = (postcardId: number) => {
      setSelectedPostCard(postcardId);
    };

    const handleSubmit = useCallback(() => {
      if (selectedPostCard) {
        onSendMessage(messageForm.title, messageForm.content, selectedPostCard);
        setMessageForm({ title: '', content: '' });
        setSelectedPostCard(null);
        setInitialSelectedPostCard(null);
        setIsMessageModified(false);
      } else {
        Toast.show({
          type: 'error',
          text1: '편지지를 선택해 주세요.',
        });
      }
    }, [
      selectedPostCard,
      messageForm,
      onSendMessage,
      setMessageForm,
      setIsMessageModified,
    ]);

    const handlePrevious = () => {
      setNewMessageSheetStep();
    };

    const renderItem = ({ item }: { item: PostCard }) => (
      <PostCardButton
        selected={selectedPostCard === item.id}
        onPress={() => handlePostCardSelection(item.id)}
      >
        <PostCardButtonImageWrapper>
          <PostCardButtonImage source={{ uri: item.url }} resizeMode="cover" />
        </PostCardButtonImageWrapper>
      </PostCardButton>
    );

    return (
      <Container>
        <ListContainer>
          <FlatList
            data={postCardImages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 12,
            }}
          />
        </ListContainer>
        <ButtonContainer>
          <StyledButton
            title="이전"
            buttonTheme="secondary"
            onPress={handlePrevious}
          />
          <StyledButton title="전송" onPress={handleSubmit} />
        </ButtonContainer>
      </Container>
    );
  },
);

export default PostCardPicker;
