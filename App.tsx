import React from 'react';
import { SafeAreaView } from 'react-native';

// import { LoginScreen } from './src/screens/LoginScreen';
// import { SignUpScreen } from './src/screens/SignUpScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';

function App(): JSX.Element {

    return (
        <SafeAreaView>
            {/* <LoginScreen/> */}
            {/* <SignUpScreen /> */}
            <ForgotPasswordScreen />
        </SafeAreaView>
    );
}

export default App;
