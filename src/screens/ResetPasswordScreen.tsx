import { useState } from 'react';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo, WaveTop, WaveBottom } from '../assets';
import { InputLabel, Button, BackButton, ErrorMessage } from '../components';
import { useForm } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startChangingPassword } from '../store/auth/thunks';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    password: '',
    confirm_password: '',
}

export const ResetPasswordScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();
    const { recoverToken } = useAppSelector( state => state.auth );
    const [ error, setError ] = useState('');

    const { password, confirm_password, onChange } = useForm(initialState);

    const onChangePassword = async () => {
        if(!password || !confirm_password){
            setError("Debes llenar los campos.");
            return;
        }
        else if(password.length <= 2){
            setError("La contraseña debe ser mayor a dos caracteres.");
            return;
        }
        else if(password !== confirm_password){
            setError("Las contraseñas no coinciden.");
            return;
        }

        dispatch( startChangingPassword({ correo: recoverToken?.correo || '', password}) );

        navigation.navigate("LoginScreen");
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
                    Cambia tu Contraseña
                </Text>
                
                <InputLabel 
                    label='Nueva contraseña' 
                    placeholder='****' 
                    type='text'
                    secureTextEntry
                    extraClass='mt-10'
                    autoCapitalize='none'
                    value={ password }
                    onChange={ (value) => onChange(value, 'password') }
                />

                <InputLabel 
                    label='Confirmar contraseña' 
                    placeholder='****' 
                    type='text'
                    secureTextEntry
                    extraClass='mt-8'
                    autoCapitalize='none'
                    value={ confirm_password }
                    onChange={ (value) => onChange(value, 'confirm_password') }
                />

                <ErrorMessage
                    message={ error }
                    showMessage={ !!error }
                />

                <Button 
                    label='Confirmar' 
                    extraClass='mt-10'
                    onPress={ onChangePassword }
                />
            </View>

            <WaveBottom/>
        </KeyboardAvoidingView>
    );
}