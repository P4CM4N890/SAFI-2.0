import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { TokenVerificationScreen } from '../screens/TokenVerificationScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { LoadingScreen } from '../screens/LoadingScreen';

import { BottomTabNavigator } from './BottomTabNavigator';
import { useAppSelector } from '../store/hooks';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
    const { status } = useAppSelector(state => state.auth);

    if( status === 'checking' ) return <LoadingScreen />

    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                (status !== 'authenticated') 
                ? 
                    (
                        <>
                            <AuthStack.Screen name='LoginScreen' options={{ title: 'LogIn' }} component={ LoginScreen }/>
                            <AuthStack.Screen name='SignUpScreen' options={{ title: 'SignUp' }} component={ SignUpScreen }/>
                            <AuthStack.Screen name='ResetPasswordScreen' options={{ title: 'Reset Password' }} component={ ResetPasswordScreen }/>
                            <AuthStack.Screen name='ForgotPasswordScreen' options={{ title: 'Forgot Password' }} component={ ForgotPasswordScreen }/>
                            <AuthStack.Screen name='TokenVerificationScreen' options={{ title: 'Token Verification' }} component={ TokenVerificationScreen }/>
                            <AuthStack.Screen name='LoadingScreen' options={{ title: 'Loading' }} component={ LoadingScreen }/>
                        </>
                    )
                :
                    (
                        <>
                            <AuthStack.Screen name='BottomTabNavigator' options={{ title: 'BottomTabNavigator' }} component={ BottomTabNavigator }/>
                        </>
                    )
            }
        </AuthStack.Navigator>
    );
}