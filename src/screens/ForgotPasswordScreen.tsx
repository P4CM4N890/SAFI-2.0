import React from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';

import { Logo } from '../assets/Logo';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/ResetPassword/Input';
import { Button } from '../components/ResetPassword/Button';
import { BackButton } from '../components/ResetPassword/BackButton';

export const ForgotPasswordScreen = () => {
    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>

            <View className='w-full h-full items-center justify-center z-10'>
                <BackButton iconColor='#000' iconSize={ 30 } extraClass='bg-white'/>

                <Logo width={ 178 } height={ 168 } extraClass='-mt-14'/>

                <Text className='mt-9 text-xl font-semibold text-primary uppercase tracking-wider'>
                    ¿Olvidaste tu Contraseña?
                </Text>

                <Text className='w-5/6 mt-10 text-base text-center font-medium text-black tracking-wider'>
                    Ingresa el correo electrónico asociado a tu cuenta
                </Text>

                <Text className='w-5/6 mt-4 text-sm text-center font-medium text-gray-500 tracking-wider'>
                    Te enviaremos un código a tu correo electrónico para reestablecer tu contraseña
                </Text>
                
                <Input 
                    label='Correo electrónico' 
                    placeholder='' 
                    type='email'
                    extraClass='mt-14'
                />

                <Button label='Enviar' extraClass='mt-10'/>
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}