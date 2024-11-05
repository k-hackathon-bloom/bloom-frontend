import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import ItemLayout from '@components/ItemLayout';
import responsive from '@utils/responsive';
import theme from '@styles/theme';
import { API_BASE_URL } from '@env';
import useAnimatedValue from '@hooks/useAnimatedValue';

const BloomProgressContainer = styled(ItemLayout)`
  width: ${responsive(160)}px;
  aspect-ratio: 1;
  align-items: center;
`;

const DailyFlowerWrapper = styled(View)`
  height: ${responsive(65)}px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

const ProgressBarContainer = styled(View)`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: ${responsive(20)}px;
`;

const FlowerIconWrapper = styled(View)`
  width: ${responsive(12)}px;
  aspect-ratio: 1;
  margin-right: ${responsive(8)}px;
`;

const ProgressBar = styled(View)`
  width: ${responsive(100)}px;
  height: ${responsive(7)}px;
  background-color: ${(props) => props.theme.COLORS.PROGRESS_BAR_BACKGROUND};
  border-radius: ${responsive(3.5)}px;
  overflow: hidden;
`;

const CurrentProgress = styled(LinearGradient)`
  height: 100%;
  flex: 1;
  border-radius: ${responsive(3.5)}px;
`;

interface BloomProgressProps {
  exp: number;
}

const BloomProgress: React.FC<BloomProgressProps> = ({ exp }) => {
  const { animatedValue: progressRight, animateToValue: afterProgressRight } =
    useAnimatedValue(responsive(100) - (exp / 9) * 100);

  useEffect(() => {
    afterProgressRight(
      responsive(100) - (exp / 9) * responsive(100),
      500,
      0,
      false,
    ).start();
  }, [afterProgressRight, exp]);

  return (
    <BloomProgressContainer>
      <DailyFlowerWrapper>
        {exp < 2 ? (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/seed.svg`}
            width={responsive(30)}
            height={responsive(30)}
          />
        ) : exp < 5 ? (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/sprout1.svg`}
            width={responsive(55)}
            height={responsive(55)}
          />
        ) : exp < 9 ? (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/sprout2.svg`}
            width={responsive(65)}
            height={responsive(65)}
          />
        ) : (
          <SvgUri
            uri={`${API_BASE_URL}/flower-icons/rose.svg`}
            width={responsive(65)}
            height={responsive(65)}
          />
        )}
      </DailyFlowerWrapper>
      <ProgressBarContainer>
        <FlowerIconWrapper>
          <SvgUri
            width={responsive(12)}
            height={responsive(12)}
            uri={`${API_BASE_URL}/flower-icons/rose-small.svg`}
          />
        </FlowerIconWrapper>
        <ProgressBar>
          <Animated.View style={{ right: progressRight, flex: 1 }}>
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
