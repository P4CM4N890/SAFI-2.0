import React from 'react';
import { SafeAreaView } from 'react-native';

// import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';

// import { TestScreen } from './src/screens/TestScreen';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      {/* <TestScreen /> */}
      {/* <LoginScreen/> */}
      <SignUpScreen />
    </SafeAreaView>
  );
}

export default App;
