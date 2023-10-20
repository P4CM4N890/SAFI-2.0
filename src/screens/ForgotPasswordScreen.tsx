import React from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo } from '../assets/Logo';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';
import { BackButton } from '../components/buttons/BackButton';

interface Props extends StackScreenProps<any, any> {};

export const ForgotPasswordScreen = ({ navigation }: Props) => {
    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>

            <View className='w-full h-full items-center justify-center z-10'>
                <BackButton 
                    iconColor='#000' 
                    iconSize={ 30 } 
                    extraClass='bg-white'
                    onPress={ () => navigation.goBack() }
                />

                <Logo width={ 178 } height={ 168 } extraClass='-mt-14'/>

                <Text className='mt-9 text-xl font-bold text-primary uppercase tracking-wider'>
                    ¿Olvidaste tu Contraseña?
                </Text>

                <Text className='w-5/6 mt-10 text-base text-center font-medium text-black tracking-wider'>
                    Ingresa el correo electrónico asociado a tu cuenta
                </Text>

                <Text className='w-5/6 mt-4 text-sm text-center font-medium text-gray-500 tracking-wider'>
                    Te enviaremos un código a tu correo electrónico para reestablecer tu contraseña
                </Text>
                
                <InputLabel
                    label='Correo electrónico' 
                    placeholder='' 
                    type='email'
                    extraClass='mt-14'
                />

                <Button 
                    label='Enviar' 
                    extraClass='mt-10'
                    onPress={ () => navigation.navigate('TokenVerificationScreen') }
                />
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}