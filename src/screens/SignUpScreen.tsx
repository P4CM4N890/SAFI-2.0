import React from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';

import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/SignUp/Input';
import { Button } from '../components/SignUp/Button';
import { TransparentButton } from '../components/SignUp/TransparentButton';

export const SignUpScreen = () => {
    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>
            <View className='w-full h-full items-center justify-center z-10'>
                <Text className='text-3xl font-bold text-primary uppercase tracking-tight'>Crear Cuenta</Text>

                <Input 
                    label='Nombre de usuario' 
                    placeholder='Ingresa un nombre de usuario' 
                    type='text'
                    extraClass='mt-12'
                />
                <Input 
                    label='Correo electrónico' 
                    placeholder='Ingresa tu correo electrónico' 
                    type='email'
                    extraClass='mt-6'
                />
                <Input 
                    label='Fecha de nacimiento' 
                    placeholder='Ingresa tu fecha de nacimiento' 
                    type='text'
                    extraClass='mt-6'
                />
                <Input 
                    label='Contraseña' 
                    placeholder='Ingresa una contraseña' 
                    type='text'
                    secureTextEntry
                    extraClass='mt-6'
                />
                <Input 
                    label='Confirmar contraseña' 
                    placeholder='Confirma tu contraseña' 
                    type='text'
                    secureTextEntry
                    extraClass='mt-6'
                />

                <Button label='Registrarme' extraClass='mt-10'/>
                <TransparentButton label='¿Ya tienes una cuenta? Inicia Sesión' textStyle='text-black text-sm mt-3' extraClass='mt-4'/>
            </View>
            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}