import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo } from '../assets/Logo';
import { Input } from '../components/Login-SignIn/Input';
import { Button } from '../components/Login-SignIn/Button';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';
import { TransparentButton } from '../components/Login-SignIn/TransparentButton';

interface Props extends StackScreenProps<any, any> {};

export const LoginScreen = ({ navigation }: Props) => {
    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>
            <View className='w-full h-full items-center justify-center z-10'>
                <Logo/>

                <Input 
                    placeholder='Correo lectrónico' 
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
                    onPress={ () => navigation.navigate('ResetPasswordScreen') }
                />

                <Button 
                    label='Iniciar sesión' 
                    extraClass='mt-10' 
                    onPress={ () => {} }
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