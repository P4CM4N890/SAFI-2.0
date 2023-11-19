import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo } from '../assets/Logo';
import { WaveTop } from '../assets/WaveTop';
import { WaveBottom } from '../assets/WaveBottom';

import { Input } from '../components/inputs/Input';
import { Button } from '../components/buttons/Button';
import { TransparentButton } from '../components/buttons/TransparentButton';
import { useForm } from '../hooks/useForm';
import { login } from '../api/PostRequests';
import { checkToken } from '../api/instance';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    correo: "",
    contrasena: "",
};

export const LoginScreen = ({ navigation }: Props) => {
    const { correo, contrasena, onChange } = useForm(initialState);

    const isValidEmail = () : Boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(correo);
    }

    const onLogin = async () => {
        Keyboard.dismiss()

        try{
            console.log(correo, contrasena)

            const response = await login(correo, contrasena);

            const { data } = response;
        
            console.log(data)

            // await AsyncStorage.setItem("session_token", data.session_token);
            // await AsyncStorage.setItem("correo", data.correo);
            // await AsyncStorage.setItem("id_cuenta", data.id_cuenta);

            // const token = await checkToken();

            // if (token) { 
            //     onChange("", 'correo');
            //     onChange("", 'contrasena');

            //     navigation.replace('LoadingScreen');
            // }
        }
        catch(error){
            const err = error as Error;
            console.log(err);
            
            if (err.message === "Invalid credentials"){
                console.log("Los datos ingresados no son correctos.");
            }
            else{
                console.log("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            }

            // setModalVisible(true);
        }
    }

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>
            <View className='w-full h-full items-center justify-center z-10'>
                <Logo/>

                <Input 
                    placeholder='Correo electrónico' 
                    type='email' 
                    extraClass='mt-12'
                    value={ correo }
                    onChange={ (value) => onChange(value, 'correo') }
                />

                <Input 
                    placeholder='Contraseña' 
                    type='text'
                    extraClass='mt-6'
                    secureTextEntry
                    value={ contrasena }
                    onChange={ (value) => onChange(value, 'contrasena') }
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
                    onPress={ onLogin }
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