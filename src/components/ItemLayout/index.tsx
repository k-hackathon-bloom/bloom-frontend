import React from 'react';
import { View, Platform } from 'react-native';
import styled from 'styled-components/native';
import { ShadowedView } from 'react-native-fast-shadow';
import responsive from '@utils/responsive';

const Container = styled(
  Platform.select({
    android: ShadowedView,
  }) || View,
)<{ shadow?: boolean }>`
  background-color: white;
  padding: ${responsive(15)}px;
  border-radius: ${responsive(8)}px;
  justify-content: center;
  ${(props) =>
    props.shadow &&
    `
      shadow-opacity: 0.01;
      shadow-radius: 20;
      shadow-offset: {
        width: 0;
        height: 0;
      };
    `}
`;

interface LayoutProps {
  children: React.ReactNode;
  hasShadow?: boolean;
}

const ItemLayout: React.FC<LayoutProps> = ({ children, hasShadow = false }) => {
  return <Container shadow={hasShadow}>{children}</Container>;
};

export default ItemLayout;
