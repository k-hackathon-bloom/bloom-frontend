import React from 'react';
import responsive from '@utils/responsive';
import ScreenLayout from '@screens/ScreenLayout';
import StyledText from '@styles/StyledText';

function App(): React.JSX.Element {
  return (
    <ScreenLayout>
      <StyledText style={{ fontSize: responsive(24) }}>bloom</StyledText>
    </ScreenLayout>
  );
}

export default App;
