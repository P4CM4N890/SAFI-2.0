import React from 'react';
import { SafeAreaView } from 'react-native';

import { LoginScreen } from './src/screens/LoginScreen';
// import { TestScreen } from './src/screens/TestScreen';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      {/* <TestScreen /> */}
      <LoginScreen/>
    </SafeAreaView>
  );
}

export default App;
