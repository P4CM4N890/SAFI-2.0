import React, { useState, useCallback } from 'react';
import { modalStyles, styles_login } from '../theme/appTheme';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, TextInput, Text, Modal, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { InicioSesionBaseModel, InicioSesionExitosoResponseModel } from '../interfaces/ApiInterfaces';
import { login } from '../api/PostRequests';
import { useForm } from '../hooks/useForm';
import { useFocusEffect } from '@react-navigation/native';

interface Props extends StackScreenProps<any, any> {};

const initialState: InicioSesionBaseModel = {
    correo: "",
    password: "",
};

export const LoginSimplificadoScreen = ( { navigation }: Props ) => {
    const { correo, password, onChange } = useForm(initialState);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const isValidEmail = () : Boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regex.test(correo);
    }
    
    useFocusEffect(
        useCallback( () => {
            onChange("", 'correo');
            onChange("", 'password'); 
        }, [])
    );

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

            const data: InicioSesionExitosoResponseModel = response.data;
        
            if (data.session_token){
                navigation.navigate("ConfiguracionScreen");
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
                
                <View style={ styles.header }>
                    <Text style={ styles.text }>
                        <Text style={{ fontFamily: "Roboto-Black"}}>Atención: </Text>
                        <Text style={{ fontFamily: "Roboto-Bold"}}>
                            Antes de continuar, debemos comprobar que seas el adulto responsable de 
                            la cuenta.
                        </Text>
                    </Text>
                </View>

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

                {/* Iniciar sesión */}
                <TouchableOpacity 
                    style={ styles_login.loginBtn }
                    activeOpacity={ 0.8 }
                    onPress={ onLogin }
                >
                    <Text 
                        style={ styles_login.loginText }
                    >
                        Comprobar
                    </Text>
                </TouchableOpacity>
                
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    text: {
        fontFamily: 'Roboto-Black',
        color: 'white',
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center',
        fontSize: 25,
    },
});
