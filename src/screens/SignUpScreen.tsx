import React from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/SignUp/Input';
import { Button } from '../components/SignUp/Button';
import { TransparentButton } from '../components/SignUp/TransparentButton';

interface Props extends StackScreenProps<any, any> {};

export const SignUpScreen = ({ navigation }: Props) => {
    return (
        <ScrollView className='w-full h-full'>
            <WaveTop/>
            <View className='w-full h-full items-center justify-center z-10 py-6'>
                <Text className='text-3xl font-bold text-primary uppercase tracking-tight'>Crear Cuenta</Text>

                <Input 
                    label='Nombre de usuario' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-12'
                />
                <Input 
                    label='Correo electrónico' 
                    placeholder='' 
                    type='email'
                    extraClass='mt-6'
                />
                <Input 
                    label='Fecha de nacimiento' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-6'
                />
                <Input 
                    label='Contraseña' 
                    placeholder='' 
                    type='text'
                    secureTextEntry
                    extraClass='mt-6'
                />
                <Input 
                    label='Confirmar contraseña' 
                    placeholder='' 
                    type='text'
                    secureTextEntry
                    extraClass='mt-6'
                />

                <Button 
                    label='Registrarme' 
                    extraClass='mt-8'
                    onPress={ () => {} }
                />

                <TransparentButton 
                    label='¿Ya tienes una cuenta? Inicia Sesión' 
                    textStyle='text-black text-sm mt-3' 
                    extraClass='mt-4'
                    onPress={ () => navigation.navigate('LoginScreen') }
                />
            </View>
            <WaveBottom/>
        </ScrollView>
    );
}