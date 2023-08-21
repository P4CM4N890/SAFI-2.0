import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageSourcePropType, Image, Modal, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { modalStyles, styles_recuperarCuenta } from '../theme/appTheme';
import { useForm } from '../hooks/useForm';
import { RecuperarCuentaBaseModel } from '../interfaces/ApiInterfaces';
import { obtenerTokenRecuperacion, validarTokenRecuperacion } from '../api/PostRequests';
import { cambiarContraseña } from '../api/PutRequests';

interface Props extends StackScreenProps<any, any> {};

interface Logo {
    src: ImageSourcePropType;
};

const initialState: RecuperarCuentaBaseModel = {
    correo: "",
    token: "",
    password: "",
    passwordConfirm: ""
};

export const RecuperarCuentaScreen = ( { navigation }: Props ) => {
    
    const logo: Logo = {
        src: require('../assets/logo.png')
    };

    const { correo, token, password, passwordConfirm, onChange } = useForm(initialState);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalText, setModalText ] = useState<string | null>(null);

    const [ passwordMessageVisibility, setPasswordMessageVisibility] = useState(false);
    const [ alertVisibility, setAlertMessageVisibility] = useState(false);

    const [ showTokenInput, setShowTokenInput ] = useState(false);
    const [ showPasswordInput, setShowPasswordInput ] = useState(false);

    const [ passwordChanged,  setPasswordChanged ] = useState(false);

    useEffect(() => {
        goToLogin();
    }, [ modalVisible ])

    const goToLogin = () => {
        if( passwordChanged  && !modalVisible ) navigation.replace('InicioSesionScreen');
    }

    const sendToken = async () => {
        Keyboard.dismiss();

        if (!correo) {
            setAlertMessageVisibility(true);
            return;
        }

        setAlertMessageVisibility(false);
    
        try{
            await obtenerTokenRecuperacion(correo);
        }
        catch(error){
            const err = error as Error;

            if(!err.message){ 
                setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            }
        }

        setModalText("Si el correo está registrado, le enviaremos un token para recuperar su cuenta.");
        setModalVisible(true);
        setShowTokenInput(true);
    };

    const validateToken = async () => {
        Keyboard.dismiss();

        setAlertMessageVisibility(false);
    
        try{
            await validarTokenRecuperacion(correo, token);
            setModalText("Token correcto, ingrese su nueva contraseña.");

            setShowPasswordInput(true);
            setShowTokenInput(false);
        }
        catch(error){
            setModalText("Token no válido");
        }

        setModalVisible(true);
    };

    const changePassword = async () => {
        Keyboard.dismiss();
        
        if (!password || !passwordConfirm) {
            setAlertMessageVisibility(true);
            return;
        }

        setAlertMessageVisibility(false);

        if (password !== passwordConfirm) {
            setPasswordMessageVisibility(true);
            return;
        }

        setPasswordMessageVisibility(false);
    
        try{
            await cambiarContraseña(correo, password)
            setModalText("Contraseña modificada correctamente.");

            setPasswordChanged(true);
        }
        catch(err){
            if(password.length < 3){
                setModalText("La contraseña debe ser mayor a dos caracteres.");
            } else {
                setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            }
        }

        setModalVisible(true);
    };

    const setEmailAgain = () => {
        setShowTokenInput(false);
    }

    return (
        <LinearGradient 
            style={ styles_recuperarCuenta.container }
            colors={[
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 58, 16, 1)',
            ]}
            locations={[-0.0745, 0.3689, 1.134]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            {/* Header */}
            <View style={ styles_recuperarCuenta.header }>
                <Image 
                    source={ logo.src }
                    style={{
                        width: 48, 
                        height: 48,
                        resizeMode: 'center'
                    }}
                />
                <Text style={ styles_recuperarCuenta.headerText }>SAFI</Text>
            </View>

            <View style={ styles_recuperarCuenta.inputContainer }>

                <Modal 
                    animationType="fade"
                    transparent={ true }
                    visible={ modalVisible }
                    onRequestClose={ () => {
                        setModalVisible(!modalVisible);
                    } }
                >
                    <View style={ modalStyles.centeredView }>
                        <View style={ modalStyles.modalView }>
                            <Text style={ modalStyles.modalText }>{ modalText }</Text>
                            {
                                (modalText === 'Ha ocurrido un error. Intentalo de nuevo más tarde.') ?
                                    <Image
                                    style={{ width: 150, height: 150, marginBottom: 10 }}
                                    source={require('../assets/4.png')}
                                    />
                                :
                                    <></>
                            }
                            <TouchableOpacity
                                style={ [modalStyles.button, modalStyles.buttonClose] }
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={ modalStyles.textStyle }>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                
                {/* Input email */}
                {
                    (!showPasswordInput && !showTokenInput) && (
                        <TextInput 
                            style={ styles_recuperarCuenta.input }
                            placeholder="E-mail"
                            autoCorrect={ false }
                            keyboardType="email-address"
                            autoCapitalize="none"
                            selectionColor="#484851"
                            placeholderTextColor="#484848"
                            onChangeText={ (value) => onChange(value, 'correo')}
                            value={ correo }
                        />
                    )
                }

                {/* Input token */}
                {
                    (!showPasswordInput && showTokenInput) && (
                        <TextInput 
                            style={ styles_recuperarCuenta.input }
                            placeholder="Ingrese el token"
                            autoCorrect={ false }
                            autoCapitalize="none"
                            selectionColor="#484851"
                            placeholderTextColor="#484848"
                            onChangeText={ (value) => onChange(value, 'token')}
                            value={ token }
                        />
                    )
                }

                {/* Input contraseña */}
                {
                    (showPasswordInput && !showTokenInput) && (
                        <>
                            <TextInput 
                                style={ styles_recuperarCuenta.input }
                                placeholder="Nueva contraseña"
                                autoCorrect={ false }
                                keyboardType="default"
                                secureTextEntry={ true }
                                autoCapitalize="none"
                                selectionColor="#484851"
                                placeholderTextColor="#484848"
                                onChangeText={ (value) => onChange(value, 'password')}
                                value={ password }
                            />

                            <TextInput 
                                style={ styles_recuperarCuenta.input }
                                placeholder="Confirmar contraseña"
                                autoCorrect={ false }
                                keyboardType="default"
                                secureTextEntry={ true }
                                autoCapitalize="none"
                                selectionColor="#484851"
                                placeholderTextColor="#484848"
                                onChangeText={ (value) => onChange(value, 'passwordConfirm')}
                                value={ passwordConfirm }
                            />
                        </>
                    )
                }

                {/* Alerta de las contraseñas no coinciden */}
                {   (passwordMessageVisibility) 
                    && (
                        <View 
                            style={ styles_recuperarCuenta.containerMensajePassword }
                        >
                            <Text style={ styles_recuperarCuenta.textMensajePassword }>
                                Las contraseñas no coinciden
                            </Text>
                        </View>
                    )
                }

                {/* Botón pequeño: Ir a crear cuenta */}
                {
                    (!showPasswordInput && !showTokenInput)
                    && (
                        <TouchableOpacity 
                            style={ styles_recuperarCuenta.smallBtn }
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('CrearCuentaScreen') }
                        >
                            <Text 
                                style={ styles_recuperarCuenta.smallBtnText }
                            >
                                Registrarme
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {/* Botón pequeño: Enviar nuevamente el token */}
                {
                    (!showPasswordInput && showTokenInput) 
                    && (
                        <>
                            <TouchableOpacity 
                                style={ styles_recuperarCuenta.smallBtn }
                                activeOpacity={ 0.8 }
                                onPress={ sendToken }
                            >
                                <Text 
                                    style={ styles_recuperarCuenta.smallBtnText }
                                >
                                    Enviar nuevamente el token
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={ styles_recuperarCuenta.smallBtn }
                                activeOpacity={ 0.8 }
                                onPress={ setEmailAgain }
                            >
                                <Text 
                                    style={ styles_recuperarCuenta.smallBtnText }
                                >
                                    Cambiar el e-mail
                                </Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                
                {/* Alerta de llenar todos los campos */}
                {   
                    (alertVisibility) 
                    && (
                        <View 
                            style={ styles_recuperarCuenta.containerMensajePassword }
                        >
                            <Text style={ styles_recuperarCuenta.textMensajePassword }>
                                Debe llenar todos los campos
                            </Text>
                        </View>
                    )
                }

                {/* Botón principal: enviar el token */}
                {
                    (!showPasswordInput && !showTokenInput) 
                    && (
                        <TouchableOpacity 
                            style={ styles_recuperarCuenta.resetPasswordBtn }
                            activeOpacity={ 0.8 }
                            onPress={ sendToken }
                        >
                            <Text 
                                style={ styles_recuperarCuenta.resetPasswordText }
                            >
                                Enviar instrucciones
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {/* Botón principal: válidar token */}
                {
                    (!showPasswordInput && showTokenInput) 
                    && (
                        <TouchableOpacity 
                            style={ styles_recuperarCuenta.resetPasswordBtn }
                            activeOpacity={ 0.8 }
                            onPress={ validateToken }
                        >
                            <Text 
                                style={ styles_recuperarCuenta.resetPasswordText }
                            >
                                Válidar token
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {/* Botón principal: cambiar contraseña */}
                {
                    (showPasswordInput && !showTokenInput) 
                    && (
                        <TouchableOpacity 
                            style={ styles_recuperarCuenta.resetPasswordBtn }
                            activeOpacity={ 0.8 }
                            onPress={ changePassword }
                        >
                            <Text 
                                style={ styles_recuperarCuenta.resetPasswordText }
                            >
                                Cambiar contraseña
                            </Text>
                        </TouchableOpacity>
                    )
                }

                {/* Ir al inico de sesión */}
                <TouchableOpacity 
                    style={ styles_recuperarCuenta.loginBtn }
                    activeOpacity={ 0.8 }
                    onPress={ () => { navigation.replace('InicioSesionScreen') } }
                >
                    <Text 
                        style={ styles_recuperarCuenta.loginText }
                    >
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>
                
            </View>
        </LinearGradient>
    );
};

