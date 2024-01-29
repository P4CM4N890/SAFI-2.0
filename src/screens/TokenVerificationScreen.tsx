import { useState } from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo, WaveTop, WaveBottom } from '../assets';
import { InputLabel, Button, BackButton, TransparentButton, ErrorMessage } from '../components';
import { useForm } from '../hooks';
import { useAppSelector } from '../store/hooks';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    token: '',
};

export const TokenVerificationScreen = ({ navigation }: Props) => {
    const { recoverToken } = useAppSelector( state => state.auth );
    const [ error, setError ] = useState('');

    const { token, onChange } = useForm(initialState);

    const onSubmitToken = () => {
        if (token !== recoverToken?.token){
            setError("El token no es valido.");
            return;
        }

        navigation.navigate("ResetPasswordScreen");
    };

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
                
                <InputLabel 
                    label='Código de verificación' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-14'
                    autoCapitalize='none'
                    value={ token }
                    onChange={ (value) => onChange(value, 'token') }
                />

                <TransparentButton
                    label='Enviar nuevamente el código de verificación' 
                    textStyle='text-black text-sm mt-3'
                    extraClass='mt-1'
                />

                <ErrorMessage
                    message={ error }
                    showMessage={ !!error }
                />

                <Button 
                    label='Verificar' 
                    extraClass='mt-10'
                    onPress={ onSubmitToken }
                />
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}