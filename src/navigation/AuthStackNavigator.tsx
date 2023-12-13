import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen';
import { TokenVerificationScreen } from '../screens/TokenVerificationScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';

import { BottomTabNavigator } from './BottomTabNavigator';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <AuthStack.Screen name='LoginScreen' options={{ title: 'LoginScreen' }} component={ LoginScreen }/>
            <AuthStack.Screen name='SignUpScreen' options={{ title: 'SignUpScreen' }} component={ SignUpScreen }/>
            <AuthStack.Screen name='ResetPasswordScreen' options={{ title: 'ResetPasswordScreen' }} component={ ResetPasswordScreen }/>
            <AuthStack.Screen name='ForgotPasswordScreen' options={{ title: 'ForgotPasswordScreen' }} component={ ForgotPasswordScreen }/>
            <AuthStack.Screen name='TokenVerificationScreen' options={{ title: 'TokenVerificationScreen' }} component={ TokenVerificationScreen }/>
            
            <AuthStack.Screen name='BottomTabNavigator' options={{ title: 'BottomTabNavigator' }} component={ BottomTabNavigator }/>
        
        </AuthStack.Navigator>
    );
}