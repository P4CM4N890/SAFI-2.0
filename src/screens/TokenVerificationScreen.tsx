import React from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo } from '../assets/Logo';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/ResetPassword/Input';
import { Button } from '../components/ResetPassword/Button';
import { BackButton } from '../components/ResetPassword/BackButton';
import { TransparentButton } from '../components/ResetPassword/TransparentButton';

interface Props extends StackScreenProps<any, any> {};

export const TokenVerificationScreen = ({ navigation }: Props) => {
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

                <Text className='mt-9 text-xl font-bold text-primary uppercase tracking-widest'>
                    Verificación
                </Text>

                <Text className='w-5/6 mt-10 text-base text-center font-medium text-black tracking-wider'>
                    Ingresa el código de verificación que fue enviado a tu correo electrónico
                </Text>
                
                <Input 
                    label='Código de verificación' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-14'
                />

                <TransparentButton
                    label='Enviar nuevamente el código de verificación' 
                    textStyle='text-black text-sm mt-3'
                    extraClass='mt-1'
                />

                <Button 
                    label='Verificar' 
                    extraClass='mt-10'
                    onPress={ () => {} }
                />
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}