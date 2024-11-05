import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import responsive from '@utils/responsive';

const GappedView = styled(View)<{ gap: number }>`
  gap: ${(props) => responsive(props.gap, 'height')}px;
`;

interface SpacedViewProps {
  gap: number;
  children: React.ReactNode;
}

const SpacedView: React.FC<SpacedViewProps> = ({ gap, children }) => {
  return <GappedView gap={gap}>{children}</GappedView>;
};

export default SpacedView;
