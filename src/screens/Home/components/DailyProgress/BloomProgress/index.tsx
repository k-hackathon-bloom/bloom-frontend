import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import ItemLayout from '@components/ItemLayout';
import theme from '@styles/theme';
import { API_BASE_URL } from '@env';
import useAnimatedValue from '@hooks/useAnimatedValue';

const BloomProgressContainer = styled(ItemLayout)`
  width: 160px;
  aspect-ratio: 1;
  align-items: center;
`;

const DailyFlowerWrapper = styled(View)`
  height: 65px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled(View)`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: 20px;
`;

const FlowerIconWrapper = styled(View)`
  width: 12px;
  aspect-ratio: 1;
  margin-right: 8px;
`;

const ProgressBar = styled(View)`
  width: 100px;
  height: 7px;
  background-color: ${(props) => props.theme.COLORS.PROGRESS_BAR_BACKGROUND};
  border-radius: 3.5px;
  overflow: hidden;
`;

const CurrentProgress = styled(LinearGradient)`
  height: 100%;
  flex: 1;
  border-radius: 3.5px;
`;

interface BloomProgressProps {
  exp: number;
}

const BloomProgress: React.FC<BloomProgressProps> = ({ exp }) => {
  const { animatedValue: progressRight, animateToValue: afterProgressRight } =
    useAnimatedValue(100 - (exp / 9) * 100);

  useEffect(() => {
    afterProgressRight(100 - (exp / 9) * 100, 500, 0, false).start();
  }, [afterProgressRight, exp]);

  return (
    <BloomProgressContainer>
      <DailyFlowerWrapper>
        {exp < 2 ? (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/seed.svg`}
            width={30}
            height={30}
          />
        ) : exp < 5 ? (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/sprout1.svg`}
            width={55}
            height={55}
          />
        ) : exp < 9 ? (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/sprout2.svg`}
            width={65}
            height={65}
          />
        ) : (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/rose.svg`}
            width={65}
            height={65}
          />
        )}
      </DailyFlowerWrapper>
      <ProgressBarContainer>
        <FlowerIconWrapper>
          <SvgUri
            width={12}
            height={12}
            uri={`${API_BASE_URL}/flower-icons/rose-small.svg`}
          />
        </FlowerIconWrapper>
        <ProgressBar>
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ right: progressRight, flex: 1 }}
          >
            <CurrentProgress
              colors={[
                theme.COLORS.PROGRESS_BAR_SECONDARY,
                theme.COLORS.PROGRESS_BAR_PRIMARY,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </ProgressBar>
      </ProgressBarContainer>
    </BloomProgressContainer>
  );
};

export default BloomProgress;
