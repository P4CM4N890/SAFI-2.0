import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TestScreen } from './src/screens/TestScreen';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <TestScreen />
    </SafeAreaView>
  );
}

export default App;
