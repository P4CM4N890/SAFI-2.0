import React from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Button } from '../components/buttons/Button';
import { InputLabel } from '../components/inputs/InputLabel';
import { BackButton } from '../components/buttons/BackButton';
import { TransparentButton } from '../components/buttons/TransparentButton';
import { DatePickerLabel } from '../components/datepickers/DatePickerLabel';

interface Props extends StackScreenProps<any, any> {};

export const SignUpScreen = ({ navigation }: Props) => {

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <WaveTop/>

                <View className='w-full h-full items-center justify-center z-10 py-6 mt-5'>
                    <BackButton 
                        iconColor='#000' 
                        iconSize={ 30 } 
                        extraClass='bg-white'
                        onPress={ () => navigation.goBack() }
                    />

                    <Text className='text-3xl font-bold text-primary uppercase tracking-tight mt-10'>Crear Cuenta</Text>

                    <InputLabel 
                        label='Nombre de usuario' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-12'
                    />
                    <InputLabel 
                        label='Correo electrónico' 
                        placeholder='' 
                        type='email'
                        extraClass='mt-6'
                    />
                    <DatePickerLabel 
                        label='Fecha de nacimiento' 
                        extraClass='mt-6'
                    />
                    <InputLabel 
                        label='Contraseña' 
                        placeholder='' 
                        type='text'
                        secureTextEntry
                        extraClass='mt-6'
                    />
                    <InputLabel 
                        label='Confirmar contraseña' 
                        placeholder='' 
                        type='text'
                        secureTextEntry
                        extraClass='mt-6'
                    />

                    <Button 
                        label='Registrarme' 
                        extraClass='mt-6'
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
        </KeyboardAvoidingView>
    );
}