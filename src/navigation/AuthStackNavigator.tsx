import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { TokenVerificationScreen } from '../screens/TokenVerificationScreen';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >

            <AuthStack.Screen name='LoginScreen' options={{ title: 'LogIn' }} component={ LoginScreen }/>
            <AuthStack.Screen name='SignUpScreen' options={{ title: 'SignUp' }} component={ SignUpScreen }/>
            <AuthStack.Screen name='ResetPasswordScreen' options={{ title: 'Reset Password' }} component={ ResetPasswordScreen }/>
            <AuthStack.Screen name='TokenVerificationScreen' options={{ title: 'Token Verification' }} component={ TokenVerificationScreen }/>
        
        </AuthStack.Navigator>
    );
}