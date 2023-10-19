import React from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo } from '../assets/Logo';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/ResetPassword/Input';
import { Button } from '../components/ResetPassword/Button';
import { BackButton } from '../components/ResetPassword/BackButton';

interface Props extends StackScreenProps<any, any> {};

export const ResetPasswordScreen = ({ navigation }: Props) => {
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
                    Cambia tu Contraseña
                </Text>
                
                <Input 
                    label='Nueva contraseña' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-10'
                />

                <Input 
                    label='Confirmar contraseña' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-8'
                />

                <Button 
                    label='Confirmar' 
                    extraClass='mt-10'
                    onPress={ () => {} }
                />
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}