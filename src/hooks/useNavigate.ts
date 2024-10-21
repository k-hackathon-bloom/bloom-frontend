import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@type/ScreenParamList';

const useNavigate = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const navigateTo = (screen: keyof StackParamList) => {
    navigation.navigate(screen);
  };

  const replaceTo = (screen: keyof StackParamList) => {
    navigation.replace(screen);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return {
    navigateTo,
    replaceTo,
    goBack,
  };
};

export default useNavigate;
