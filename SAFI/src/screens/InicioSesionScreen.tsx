import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageSourcePropType, Image, Keyboard, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { modalStyles, styles_login } from '../theme/appTheme';
import { InicioSesionBaseModel } from '../interfaces/ApiInterfaces';
import { useForm } from '../hooks/useForm';
import { checkToken, login } from '../api/PostRequests';
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<any, any> {};

interface Logo {
    src: ImageSourcePropType;
};

const initialState: InicioSesionBaseModel = {
    correo: "",
    password: "",
};

export const InicioSesionScreen = ( { navigation }: Props ) => {
    
    const logo: Logo = {
        src: require('../assets/logo.png')
    };

    const { correo, password, onChange } = useForm(initialState);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const isValidEmail = () : Boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(correo);
    }
    
    const onLogin = async () => {
        Keyboard.dismiss();


        if (!isValidEmail()) {
            setError("Correo invalido.");
            setModalVisible(true);
            return;
        } else if (password.length === 0) {
            setError("Ingresa tu contraseña.");
            setModalVisible(true);
            return;
        } else if (password.length > 0 && password.length <= 2) {
            setError("Ingresa una contraseña valida.");
            setModalVisible(true);
            return;
        }

        try{
            const response = await login(correo, password);

            const { data } = response;
        
            console.log(data)

            await AsyncStorage.setItem("session_token", data.session_token);
            await AsyncStorage.setItem("correo", data.correo);
            // await AsyncStorage.setItem("id_cuenta", data.id_cuenta);

            const token = await checkToken();

            if (token) { 
                onChange("", 'correo');
                onChange("", 'password');

                navigation.replace('LoadingScreen');
            }
        }
        catch(error){
            const err = error as Error;
            console.log(err);
            
            if (err.message === "Invalid credentials"){
                setError("Los datos ingresados no son correctos.");
            }
            else{
                setError("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            }

            setModalVisible(true);
        }
    };

    const createChannel = () => {
        PushNotification.createChannel({
            channelId: "safi-recordatorios",
            channelName: "SAFI Recordatorios"
        }, () => console.log('Canal de notificaciones creado!'));
    }

    useEffect(() => {
        createChannel();
    }, []);

    return (
        <LinearGradient 
            style={ styles_login.container }
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
            <View style={ styles_login.header }>
                <Image 
                    source={ logo.src }
                    style={{
                        width: 48, 
                        height: 48,
                        resizeMode: 'center'
                    }}
                />
                <Text style={ styles_login.headerText }>SAFI</Text>
            </View>

            <View style={ styles_login.inputContainer }>
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
                            <Text style={ modalStyles.modalText }>{ error }</Text>
                            {
                                (error === 'Los datos ingresados no son correctos.') ?
                                    <Image
                                        style={{width: 200, height: 200}}
                                        source={require('../assets/credenciales_incorrectas.png')}
                                    />
                                : (error === 'Ha ocurrido un error. Intentalo de nuevo más tarde.') ?
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
                
                {/* Inputs */}
                <TextInput 
                    style={ styles_login.input }
                    placeholder="E-Mail"
                    autoCorrect={ false }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'correo')}
                    value={ correo }
                />
                <TextInput 
                    style={ styles_login.input }
                    placeholder="Contraseña"
                    autoCorrect={ false }
                    keyboardType="default"
                    secureTextEntry={ true }
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'password')}
                    value={ password }
                />

                {/* Olvidé mi contraseña */}
                <TouchableOpacity 
                    style={ styles_login.resetPasswordBtn }
                    activeOpacity={ 0.8 }
                    onPress={ () => navigation.navigate('RecuperarCuentaScreen') }
                >
                    <Text 
                        style={ styles_login.resetPasswordText }
                    >
                        Olvidé mi Contraseña
                    </Text>
                </TouchableOpacity>

                {/* Iniciar sesión */}
                <TouchableOpacity 
                    style={ styles_login.loginBtn }
                    activeOpacity={ 0.8 }
                    onPress={ onLogin }
                >
                    <Text 
                        style={ styles_login.loginText }
                    >
                        Iniciar Sesión
                    </Text>
                </TouchableOpacity>

                {/* Registrarme */}
                <TouchableOpacity 
                    style={ styles_login.signUpBtn }
                    activeOpacity={ 0.8 }
                    onPress={ () => { navigation.navigate('CrearCuentaScreen') } }
                >
                    <Text 
                        style={ styles_login.signUpText }
                    >
                        Registrarme
                    </Text>
                </TouchableOpacity>
                
            </View>
        </LinearGradient>
    );
};
