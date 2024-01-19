import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { WaveTop, WaveBottom } from '../assets';

import { Button, InputLabel, BackButton, 
    TransparentButton, DatePickerLabel } from '../components';
import { useForm } from '../hooks';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    nombre: "",
    correo: "",
    fecha_de_nac: "",
    contrasena: "",
    confirmar_contrasena: "",
}

export const SignUpScreen = ({ navigation }: Props) => {
    const { nombre, correo, fecha_de_nac, contrasena, confirmar_contrasena, onChange } = useForm( initialState ); 

    const onSignUp = async () => {
        console.log(fecha_de_nac);
    };

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView 
                className='w-full h-full'
                showsVerticalScrollIndicator={ false }
            >
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
                        placeholder='Tu nombre'
                        type='text'
                        extraClass='mt-12'
                        value={ nombre }
                        onChange={ (value) => onChange(value, 'nombre') }
                    />
                    <InputLabel 
                        label='Correo electrónico' 
                        placeholder='ejemplo@dominio.com' 
                        type='email'
                        extraClass='mt-6'
                        value={ correo }
                        onChange={ (value) => onChange(value, 'correo') }
                    />
                    <DatePickerLabel 
                        label='Fecha de nacimiento' 
                        extraClass='mt-6'
                        value={ fecha_de_nac }
                        onChange={ (value) => onChange(value, 'fecha_de_nac') }
                    />
                    <InputLabel 
                        label='Contraseña' 
                        placeholder='****' 
                        type='text'
                        secureTextEntry
                        extraClass='mt-6'
                        value={ contrasena }
                        onChange={ (value) => onChange(value, 'contrasena') }
                    />
                    <InputLabel 
                        label='Confirmar contraseña' 
                        placeholder='****' 
                        type='text'
                        secureTextEntry
                        extraClass='mt-6'
                        value={ confirmar_contrasena }
                        onChange={ (value) => onChange(value, 'confirmar_contrasena') }
                    />

                    <Button 
                        label='Registrarme' 
                        extraClass='mt-6'
                        onPress={ onSignUp }
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