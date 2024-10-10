import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import responsive from '@utils/responsive';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: responsive(24) }}>bloom</Text>
      <Text style={{ fontSize: 24 }}>bloom</Text>
    </SafeAreaView>
  );
}

export default App;
