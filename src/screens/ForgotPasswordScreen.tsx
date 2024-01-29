import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo, WaveTop, WaveBottom } from '../assets';
import { InputLabel, Button, BackButton, ErrorMessage } from '../components';
import { useForm } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startLoadingEmails } from '../store/other/thunks';
import { startSendingToken } from '../store/auth/thunks';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    email: '',
};

export const ForgotPasswordScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();
    const { emails } = useAppSelector( state => state.other );
    const [ error, setError ] = useState('');
    
    const { email, onChange } = useForm(initialState);

    useEffect(() => {
        dispatch( startLoadingEmails() );
    }, []);

    const onRequestToken = async () => {
        if(!emails.includes(email)) {
            setError("El correo no esta asociado a ninguna cuenta.");
            return;
        }

        dispatch( startSendingToken(email) );

        navigation.navigate("TokenVerificationScreen");
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
                    placeholder='ejemplo@dominio.com'
                    type='email'
                    autoCapitalize='none'
                    extraClass='mt-14'
                    value={ email }
                    onChange={ (value) => onChange(value, 'email') }
                />

                <ErrorMessage
                    message={ error }
                    showMessage={ !!error }
                />

                <Button 
                    label='Enviar' 
                    extraClass='mt-10'
                    onPress={ onRequestToken }
                />
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}