import { Dimensions } from 'react-native';

const BASE_DESIGN_SCREEN_WIDTH = 393;
const BASE_DESIGN_SCREEN_HEIGHT = 852;

const { width, height } = Dimensions.get('window');

const calculateScreenRatio = (baseSize: number, screenSize: number): number => {
  return baseSize / screenSize;
};

export default function responsive(
  baseDesignElementSize: number,
  basis?: 'width' | 'height',
): number {
  const screenRatio =
    basis === 'height'
      ? calculateScreenRatio(height, BASE_DESIGN_SCREEN_HEIGHT)
      : calculateScreenRatio(width, BASE_DESIGN_SCREEN_WIDTH);

  return baseDesignElementSize * screenRatio;
}
