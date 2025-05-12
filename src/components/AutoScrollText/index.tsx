import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, Animated, LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/common/StyledText';
import responsive from '@utils/responsive';

const ScrollWrapper = styled(View)`
  flex: 1;
`;

const ScrollableText = styled(StyledText)`
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.6px;
`;

interface SlidingTextProps {
  text: string;
}

export interface SlidingTextHandles {
  stopScrollAnimation: () => void;
}

const AutoScrollText = forwardRef<SlidingTextHandles, SlidingTextProps>(
  ({ text }, ref) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollWidth = useRef(0);
    const screenWidth = useRef(0);
    const [scrolling, setScrolling] = useState(false);
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

    const onLayoutScreen = (e: LayoutChangeEvent) => {
      screenWidth.current = e.nativeEvent.layout.width;
    };

    const onLayoutText = (e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout;
      scrollWidth.current = width;
      setScrolling(width > screenWidth.current);
    };

    const startScrollAnimation = useCallback(() => {
      const scrollDistance = scrollWidth.current - screenWidth.current;
      if (scrollDistance <= responsive(3)) return;

      Animated.timing(scrollX, {
        toValue: -scrollDistance,
        duration: Math.max(scrollDistance * 70, 1500),
        delay: 2000,
        useNativeDriver: true,
      }).start(() => {
        if (animationTimeout.current) {
          clearTimeout(animationTimeout.current);
        }
        animationTimeout.current = setTimeout(() => {
          scrollX.setValue(0);
          startScrollAnimation();
        }, 2000);
      });
    }, [scrollX]);

    const stopScrollAnimation = useCallback(() => {
      setScrolling(false);
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
      scrollX.stopAnimation();
      scrollX.setValue(0);
    }, [scrollX]);

    useImperativeHandle(ref, () => ({
      stopScrollAnimation,
    }));

    useEffect(() => {
      if (scrolling) {
        startScrollAnimation();
      } else {
        stopScrollAnimation();
      }
    }, [scrolling, startScrollAnimation, stopScrollAnimation]);

    return (
      <ScrollWrapper>
        <Animated.ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          onLayout={onLayoutScreen}
        >
          <Animated.View
            style={{
              transform: [{ translateX: scrollX }],
            }}
            onLayout={onLayoutText}
          >
            <ScrollableText numberOfLines={1}>{text}</ScrollableText>
          </Animated.View>
        </Animated.ScrollView>
      </ScrollWrapper>
    );
  },
);

export default AutoScrollText;
