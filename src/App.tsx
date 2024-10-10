import React from 'react';
import responsive from '@utils/responsive';
import ScreenLayout from '@screens/ScreenLayout';
import StyledText from '@styles/StyledText';
import ItemLayout from '@components/ItemLayout';

function App(): React.JSX.Element {
  return (
    <ScreenLayout>
      <StyledText style={{ fontSize: responsive(24) }}>bloom</StyledText>
      <ItemLayout hasShadow={true}>
        <StyledText>Item</StyledText>
      </ItemLayout>
    </ScreenLayout>
  );
}

export default App;
