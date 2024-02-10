import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { WaveTop, WaveBottom } from '../assets';
import { Button, InputLabel, BackButton, ErrorMessage,
    TransparentButton, DatePickerLabel, ImageModal, FotoPerfil } from '../components';
import { useForm } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startSignUp } from '../store/auth/thunks';
import { isValidEmail, getImageSource } from '../utils';
import { startLoadingEmails } from '../store/other/thunks';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    nombre: "",
    correo: "",
    fecha_de_nac: "",
    contrasena: "",
    confirmar_contrasena: "",
}

export const SignUpScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();
    const { errorMessage } = useAppSelector( state => state.auth );
    const { emails } = useAppSelector( state => state.other );
    
    const [ error, setError ] = useState(errorMessage || "");
    
    const [ imageModalVisible, setImageModalVisible ] = useState(false);
    const [ selectedImage, setSelectedImage ] = useState("");
    
    const { nombre, correo, fecha_de_nac, contrasena, 
        confirmar_contrasena, onChange 
    } = useForm( initialState );

    const onSignUp = async () => {
        if (!nombre || !contrasena || !fecha_de_nac || !correo) { 
            setError("Debes rellenar todos los campos.");
            return;
        }
        else if(nombre.length <= 2){
            setError("El nombre debe ser mayor a dos caracteres.");
            return;
        }
        else if (!isValidEmail(correo)) {
            setError("El correo es invalido.");
            return;
        }
        else if (emails.includes(correo)){
            setError("El correo ya esta en uso.");
            return;
        }
        else if(contrasena.length <= 2){
            setError("La contraseña debe ser mayor a dos caracteres.");
            return;
        }
        else if(contrasena !== confirmar_contrasena){
            setError("Las contraseñas no coinciden.");
            return;
        }
        
        dispatch( startSignUp( {
            correo,
            contrasena,
            nombre,
            fecha_de_nac: fecha_de_nac.split('T')[0],
            experiencia: 0,
            high_score: 0,
            ruta_imagen: selectedImage,
        } ) );
    };
    
    const openImageModal = () => {
        setImageModalVisible(true);
    };
    
    const closeImageModal = () => {
        setImageModalVisible(false);
    };
    
    const isErrorOfField = (field: string) => {
        return error.includes(field);
    };
    
    const selectProfilePicture = (imageRoute: string) => {
        setSelectedImage(imageRoute);
        closeImageModal();
    }

    useEffect(() => {
        dispatch( startLoadingEmails() );
    }, []);

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

                    <Text 
                        className='text-3xl font-bold text-primary uppercase 
                        tracking-tight mt-10'
                    >
                        Crear Cuenta
                    </Text>

                    <Text 
                        className='mt-12 w-5/6 mb-1 font-semibold text-base text-primary'
                    >
                       Foto de Perfil
                    </Text>


                    <TouchableOpacity onPress={ openImageModal }>
                        { selectedImage !== ""
                            ?
                                <FotoPerfil image={ getImageSource(selectedImage) } size={ 'small' } />
                            :
                                <View
                                    className='w-full flex flex-row items-center bg-primary
                                    rounded-full border-primary border-2 p-2'
                                >
                                    <Icon name={ 'person-outline' } size={ 32 } color='#fff'/>
                                </View>

                        }
                    </TouchableOpacity>

                    <InputLabel 
                        label='Nombre de usuario'
                        placeholder='Tu nombre'
                        type='text'
                        extraClass='mt-6'
                        value={ nombre }
                        onChange={ (value) => onChange(value, 'nombre') }
                    />

                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error && isErrorOfField('nombre')}
                    />

                    <InputLabel 
                        label='Correo electrónico' 
                        placeholder='ejemplo@dominio.com' 
                        type='email'
                        extraClass='mt-6'
                        autoCapitalize='none'
                        value={ correo }
                        onChange={ (value) => onChange(value, 'correo') }
                    />

                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error && isErrorOfField('correo')}
                    />

                    <DatePickerLabel 
                        label='Fecha de nacimiento' 
                        extraClass='mt-6'
                        onChange={ (value) => onChange(value, 'fecha_de_nac') }
                        maximumDate={ new Date() }
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

                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error && isErrorOfField('contraseña')}
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

                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error && isErrorOfField('coinciden')}
                    />
                    
                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error && isErrorOfField('campos')}
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

                <ImageModal 
                    isModalVisible={ imageModalVisible }
                    selectImage={ selectProfilePicture }
                />

                <WaveBottom/>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}