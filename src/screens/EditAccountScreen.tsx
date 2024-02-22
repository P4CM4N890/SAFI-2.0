import { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Ionicons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startUpdatingUser } from '../store/auth';
import { useForm, useUiStore } from '../hooks';

import { Button, DatePickerLabel, ErrorMessage, FotoPerfil, ImageModal, InputLabel } from '../components';

import { getImageSource, showToastInfoMessage } from '../utils';
import { UsuarioEdit } from '../interfaces/ApiInterfaces';

interface Props extends StackScreenProps<any, any> {};

export const EditAccountScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();
    
    const { 
        nombre: nT, fecha_de_nac: fnT, email, ruta_imagen, errorMessage, experiencia, high_score 
    } = useAppSelector( state => state.auth );
    
    const { changeBarVisibility } = useUiStore();
    
    const [ error, setError ] = useState(errorMessage || "");
    const [ imageModalVisible, setImageModalVisible ] = useState(false);
    const [ selectedImage, setSelectedImage ] = useState(ruta_imagen as string);

    const initialState = {
        nombre: nT as string,
        fecha_de_nac: fnT as string,
        contrasena: "",
        confirmar_contrasena: "",
    }

    const { 
        nombre, fecha_de_nac, contrasena, confirmar_contrasena, onChange 
    } = useForm( initialState );

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
        };
    }, []);

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
    };

    const onUpdateProfile = () => {
        if (!nombre || !fecha_de_nac) { 
            setError("Debes rellenar todos los campos.");
            return;
        }
        else if(nombre.length <= 2){
            setError("El nombre debe ser mayor a dos caracteres.");
            return;
        }
        else if(contrasena.length > 0) {
            if(contrasena.length <= 2){
                setError("La contraseña debe ser mayor a dos caracteres.");
                return;
            }
            else if(contrasena !== confirmar_contrasena){
                setError("Las contraseñas no coinciden.");
                return;
            }
        }

        const newUser: UsuarioEdit = {
            nombre,
            correo: email as string,
            experiencia: experiencia as number,
            fecha_de_nac: fecha_de_nac.split('T')[0],
            high_score: high_score as number,
            ruta_imagen: selectedImage,
            contrasena: contrasena.length !== 0 ? contrasena : undefined,
        };

        // console.log(newUser);
        dispatch( startUpdatingUser(newUser) );

        navigation.navigate("SettingsScreen");
        showToastInfoMessage("Modificación realizada", "La información se actualizo");
    };

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>
                    <Text 
                        className='mt-12 text-2xl font-bold text-primary uppercase 
                        tracking-widest'
                    >
                        Modificar Cuenta
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

                    <DatePickerLabel 
                        label='Fecha de nacimiento'
                        extraClass='mt-6'
                        fechaInicial={ new Date('2002-05-25') }
                        fechaInicialFormatted={ format(new Date('2002-05-25'), "dd'/'MM'/'yyyy") }
                        onChange={ (value) => onChange(value, 'fecha_de_nac') }
                    />

                    <InputLabel 
                        label='Contraseña (Dejar vacio si no quieres cambiarla)' 
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

                    <View className='mt-12 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Actualizar' 
                            onPress={ onUpdateProfile }
                        />

                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.goBack() }
                        />
                    </View>

                </View>

                <ImageModal 
                    isModalVisible={ imageModalVisible }
                    selectImage={ selectProfilePicture }
                />

            </ScrollView>
        </KeyboardAvoidingView>
    );
};
