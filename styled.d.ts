import 'styled-components/native';
import type { BloomTheme } from '@styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends BloomTheme {}
}
