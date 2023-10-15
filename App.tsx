import React from 'react';
import { SafeAreaView } from 'react-native';

import { LoginScreen } from './src/screens/LoginScreen';
// import { SignUpScreen } from './src/screens/SignUpScreen';
// import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
// import { TokenVerificationScreen } from './src/screens/TokenVerificationScreen';
// import { ResetPasswordScreen } from './src/screens/ResetPasswordScreen';

function App(): JSX.Element {

    return (
        <SafeAreaView>
            <LoginScreen/>
            {/* <SignUpScreen/> */}
            {/* <ForgotPasswordScreen/> */}
            {/* <TokenVerificationScreen/> */}
            {/* <ResetPasswordScreen /> */}
        </SafeAreaView>
    );
}

export default App;
