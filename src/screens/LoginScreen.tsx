import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Keyboard, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Logo, WaveTop, WaveBottom } from '../assets';
import { Input, Button, MessageModal, TransparentButton } from '../components';
import { useForm } from '../hooks';
import { createNotificationChannel } from '../utils/notificationFunctions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startLogin } from '../store/auth/thunks';

interface Props extends StackScreenProps<any, any>{};

const initialState = {
    correo: "",
    contrasena: "",
};

export const LoginScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();
    const { errorMessage } = useAppSelector(state => state.auth);

    const { correo, contrasena, onChange } = useForm(initialState);
    const [ error, setError ] = useState<string>('');
    const [ modalVisible, setModalVisible ] = useState(false);

    const isValidEmail = () : Boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(correo);
    };

    const onLogin = async () => {
        Keyboard.dismiss();

        if (!isValidEmail()) {
            setError("Correo invalido.");
            setModalVisible(true);
            return;
        } else if (contrasena.length === 0) {
            setError("Ingresa tu contraseña.");
            setModalVisible(true);
            return;
        } else if (contrasena.length > 0 && contrasena.length <= 2) {
            setError("Ingresa una contraseña valida.");
            setModalVisible(true);
            return;
        }
        
        dispatch( startLogin(correo, contrasena) );

        onChange("", 'correo');
        onChange("", 'contrasena');
    }

    useEffect(() => {
        createNotificationChannel();
    }, []);

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <WaveTop/>
            <MessageModal 
                message={ error }
                modalVisible={ modalVisible }
                setModalVisible={ setModalVisible }
            />
            <View className='w-full h-full items-center justify-center z-10'>
                <Logo/>

                <Input 
                    placeholder='Correo electrónico' 
                    type='email' 
                    extraClass='mt-12'
                    autoCapitalize='none'
                    value={ correo }
                    onChange={ (value) => onChange(value, 'correo') }
                />

                <Input 
                    placeholder='Contraseña' 
                    type='text'
                    extraClass='mt-6'
                    secureTextEntry
                    autoCapitalize='none'
                    value={ contrasena }
                    onChange={ (value) => onChange(value, 'contrasena') }
                />
    
                <TransparentButton 
                    label='Olvidé mi contraseña' 
                    textStyle='text-gray-700 underline text-xs' 
                    extraClass='mt-3'
                    onPress={ () => navigation.navigate('ForgotPasswordScreen') }
                />

                <View style={{ display: !!errorMessage ? undefined : 'none' }} >
                    <Text className="text-l text-red font-bold pt-4">
                        { errorMessage }
                    </Text>
                </View>

                <Button 
                    label='Iniciar sesión' 
                    extraClass='mt-10' 
                    onPress={ onLogin }
                    // onPress={ () => navigation.navigate('BottomTabNavigator') }
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