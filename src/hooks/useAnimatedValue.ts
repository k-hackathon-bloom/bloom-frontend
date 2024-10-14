import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimatedValue = (initialValue: number) => {
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  const animateToValue = (
    toValue: number,
    duration: number,
    delay?: number,
    useNativeDriver: boolean = true,
  ): Animated.CompositeAnimation => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver,
    });
  };

  return { animatedValue, animateToValue };
};

export default useAnimatedValue;
