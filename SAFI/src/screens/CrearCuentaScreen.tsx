import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageSourcePropType, Image, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { datePickerStyles, modalStyles, styles_signup } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';
import { crearCuenta } from '../api/PostRequests';

interface Props extends StackScreenProps<any, any> {};

interface Logo {
    src: ImageSourcePropType;
};

const initialState = {
    nombre: "",
    correo: "",
    password: "",
    confirmPass: "",
    fecha_de_nac: "",
};

export const CrearCuentaScreen = ( { navigation }: Props ) => {
    const logo: Logo = {
        src: require('../assets/logo.png')
    };

    const { nombre, correo, password, confirmPass, fecha_de_nac, onChange } = useForm(initialState);
    const [ fechaText, setFechaText ] = useState("Fecha de Nacimiento");
    const [ date, setDate ] = useState(new Date());
    const [ open, setOpen ] = useState(false);
    const [ passwordMessageVisibility, setPasswordMessageVisibility] = useState(false);
    const [ alertVisibility, setAlertMessageVisibility] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ navigate, setNavigate ] = useState(false);

    const isValidEmail = () : Boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(correo);
    }

    const parseDateString = (date: string) => {
        const sections = date.split('/');
        const day = parseInt(sections[0], 10);
        const month = parseInt(sections[1], 10) - 1;
        const year = parseInt(sections[2], 10);
      
        return new Date(year, month, day);
    }

    const onSignup = async () => {
        if (confirmPass != password) {
            setPasswordMessageVisibility(true);
            return;
        }

        setPasswordMessageVisibility(false);

        if (!nombre || !password || !fecha_de_nac || !correo) {
            setAlertMessageVisibility(true);
            return;
        }

        setAlertMessageVisibility(false);
        
        if (!isValidEmail()) {
            setModalText("Email invalido.");
            setModalVisible(true);

            return;
        }
        
        try{
            await crearCuenta(nombre, correo, new Date(fecha_de_nac), password);

            setNavigate(true);
            setModalText("Usuario registrado con exito.");
            setModalVisible(true);
        }
        catch(err){
            const error = err as Error;

            if(password.length <= 2){
                setModalText("La contraseña debe ser mayor a dos caracteres.");
            }
            else if(nombre.length <= 2){
                setModalText("El nombre debe ser mayor a dos caracteres.");
            }
            else if(error.message === "El correo ya esta en uso"){
                setModalText(error.message);
            }
            else if(!error.message){ 
                setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            }

            setModalVisible(true);
        }
    };

    return (
        <LinearGradient 
            style={ styles_signup.container }
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
            <View style={ styles_signup.header }>
                <Image 
                    source={ logo.src }
                    style={{
                        width: 48, 
                        height: 48,
                        resizeMode: 'center'
                    }}
                />
                <Text style={ styles_signup.headerText }>SAFI</Text>
            </View>

            <View style={{
                alignItems: 'center',
                marginTop: 50
            }}>
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
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    if(navigate){
                                        navigation.navigate("InicioSesionScreen");
                                    }
                                }}
                            >
                                <Text style={ modalStyles.textStyle }>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Input nombre */}
                <TextInput 
                    style={ styles_signup.input }
                    placeholder="Nombre"
                    autoCorrect={ false }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'nombre') }
                />

                {/* Input e-mail */}
                <TextInput 
                    style={ styles_signup.input }
                    placeholder="E-Mail"
                    autoCorrect={ false }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'correo') }
                />

                {/* Input contraseña */}
                <TextInput 
                    style={ styles_signup.input }
                    placeholder="Contraseña"
                    autoCorrect={ false }
                    keyboardType="default"
                    secureTextEntry={ true }
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'password') }
                />

                {/* Input confirmar contraseña */}
                <TextInput 
                    style={ styles_signup.input }
                    placeholder="Confirmar Contraseña"
                    autoCorrect={ false }
                    keyboardType="default"
                    secureTextEntry={ true }
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'confirmPass') }
                />

                {   passwordMessageVisibility && 
                    <View 
                        style={ styles_signup.containerMensajePassword }
                        
                    >
                        <Text style={ styles_signup.textMensajePassword }>
                            Las contraseñas no coinciden
                        </Text>
                    </View>
                }

                {/* Input fecha de nacimiento */}
                {/* Si quieren usar el DatePicker, copien todo el codigo de abajo y los useState */}
                <>
                    <TouchableOpacity
                        style={ styles_signup.containerFecha }
                        onPress={ () => setOpen(true) }
                        activeOpacity={1}
                    >
                        <Text style={ 
                            (fechaText==="Fecha de Nacimiento") ?
                            datePickerStyles.textoFecha : 
                            { ...datePickerStyles.textoFecha, color: 'black' } }>{ fechaText }
                        </Text>
                        <Icon name="calendar-outline" size={ 30 } color='black' 
                        style={ datePickerStyles.iconoFecha }/>
                    </TouchableOpacity>
                    <DatePicker 
                        modal
                        open={ open }
                        date={ date }
                        mode='date'
                        maximumDate={ new Date() }
                        onConfirm={ (date) => {
                            const dateString = new Date(date).toLocaleDateString('es-MX');
                            const newDate = parseDateString(dateString);
                            
                            setOpen(false)
                            setDate(newDate)
                            setFechaText( newDate.toISOString().split('T')[0] )
                            onChange(newDate.toISOString().split('T')[0], 'fecha_de_nac')
                        } }
                        onCancel={ () => {
                            setOpen(false)
                        } }
                    />
                </>
                {/* Hasta aqui */}

                {   
                    (alertVisibility) && 
                        <View 
                            style={ styles_signup.containerMensajePassword } 
                        >
                            <Text style={ styles_signup.textMensajePassword }>
                                Debe llenar todos los campos
                            </Text>
                        </View>
                }

                {/* Registrarme */}
                <TouchableOpacity 
                    style={ styles_signup.signUpBtn }
                    activeOpacity={ 0.8 }
                    onPress={ onSignup }
                >
                    <Text 
                        style={ styles_signup.signUpText }
                    >
                        Registrarme
                    </Text>
                </TouchableOpacity>

                {/* Volver al login */}
                <TouchableOpacity 
                    style={ styles_signup.loginBtn }
                    activeOpacity={ 0.8 }
                    onPress={ () => { navigation.navigate('InicioSesionScreen') } }
                >
                    <Text 
                        style={ styles_signup.loginText }
                    >
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
};
