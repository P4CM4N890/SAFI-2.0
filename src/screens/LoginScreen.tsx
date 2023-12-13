import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo } from '../assets/Logo';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/inputs/Input';
import { Button } from '../components/buttons/Button';
import { TransparentButton } from '../components/buttons/TransparentButton';

interface Props extends StackScreenProps<any, any>{};

export const LoginScreen = ({ navigation }: Props) => {
    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>
            <View className='w-full h-full items-center justify-center z-10'>
                <Logo/>

                <Input 
                    placeholder='Correo electrónico' 
                    type='email' 
                    extraClass='mt-12'
                />

                <Input 
                    placeholder='Contraseña' 
                    type='text' 
                    extraClass='mt-6' 
                    secureTextEntry
                />
    
                <TransparentButton 
                    label='Olvidé mi contraseña' 
                    textStyle='text-gray-700 underline text-xs' 
                    extraClass='mt-3'
                    onPress={ () => navigation.navigate('ForgotPasswordScreen') }
                />

                <Button 
                    label='Iniciar sesión' 
                    extraClass='mt-10' 
                    onPress={ () => navigation.navigate('BottomTabNavigator') }
                />

                <View className='w-5/6 border-t-2 border-gray-700 mt-12'/>

                <TransparentButton 
                    label='Crear Cuenta' 
                    textStyle='text-gray-400 text-md uppercase' 
                    extraClass='mt-4'
                    onPress={ () => navigation.navigate('SignUpScreen') }
                />
            </View>
            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}