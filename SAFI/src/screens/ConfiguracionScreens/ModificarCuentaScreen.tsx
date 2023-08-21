import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageSourcePropType, Image, Modal, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { datePickerStyles, modalStyles, styles_signup } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../../hooks/useForm';
import { obtenerCuenta } from '../../api/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CuentaResponseModel } from '../../interfaces/ApiInterfaces';
import { actualizarCuenta } from '../../api/PutRequests';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    nombre: "",
    correo: "",
    fecha_de_nac: "",
    password: "",
};

export const ModificarCuentaScreen = ({ navigation }: Props) => {
    const { nombre, correo, fecha_de_nac, password, onChange } = useForm(initialState);

    const [ fechaText, setFechaText ] = useState("Fecha de Nacimiento");
    const [ date, setDate ] = useState(new Date());
    const [ open, setOpen ] = useState(false);
    const [ alertVisibility, setAlertMessageVisibility] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ navigate, setNavigate ] = useState(false);
    const [ cuentaActual, setCuentaActual ] = useState<CuentaResponseModel | undefined>()

    const isValidEmail = (email: string) : Boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const parseDateString = (date: string) => {
        const sections = date.split('/');
        const day = parseInt(sections[0], 10);
        const month = parseInt(sections[1], 10) - 1;
        const year = parseInt(sections[2], 10);
      
        return new Date(year, month, day);
    }

    const obtenerCuentaActual = async () => {
        try{
            const correo = await AsyncStorage.getItem("correo");

            if(correo){
                const cuenta: CuentaResponseModel = (await obtenerCuenta(correo)).data
                
                setCuentaActual(cuenta);
                
                setFechaText(cuenta.fecha_de_nac);
            }
        }
        catch(err){
            console.error(err);
        }
    };

    const onEdit = async () => {
        let oldName = "", oldCorreo = "", oldFecha = "";

        if(!nombre){
            oldName = cuentaActual?.nombre || '';
        }

        if(!correo){
            oldCorreo = cuentaActual?.correo || '';
        }

        if(!fecha_de_nac){
            oldFecha = cuentaActual?.fecha_de_nac || '';
        }

        if (!isValidEmail(oldCorreo ? oldCorreo : correo)) {
            setModalText("Email invalido.");
            setModalVisible(true);

            return;
        }

        if(nombre ? nombre.length <= 2 : oldName.length <= 2){
            setModalText("El nombre debe ser mayor a dos caracteres.");
            setModalVisible(true);

            return;
        }

        try{
            const response = await actualizarCuenta(
                nombre ? nombre : oldName,
                correo ? correo : oldCorreo,
                fecha_de_nac ? new Date(fecha_de_nac) : new Date(oldFecha),
                password ? password : undefined
            );

            console.log(response);

            setNavigate(true);
            setModalText("Cuenta editada con exito.");
            setModalVisible(true);
        }
        catch(err){
            console.error(err);

            setModalText("Ha ocurrido un error, intentalo de nuevo más tarde.");
            setModalVisible(true);
        }

    };

    useEffect(() => {
        obtenerCuentaActual();
    }, [])
    
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
            <View style={ styles.header }>
                <Text style={ styles.headerText }>Editar Cuenta</Text>
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
                                    source={require('../../assets/4.png')}
                                    />
                                :
                                    <></>
                            }
                            <TouchableOpacity
                                style={ [modalStyles.button, modalStyles.buttonClose] }
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    if(navigate){
                                        navigation.navigate("MiCuentaScreen");
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
                    defaultValue={ cuentaActual?.nombre }
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
                    defaultValue={ cuentaActual?.correo }
                    autoCorrect={ false }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'correo') }
                />

                <TextInput 
                    style={ styles_signup.input }
                    placeholder="Nueva Contraseña"
                    autoCorrect={ false }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor="#484851"
                    placeholderTextColor="#484848"
                    onChangeText={ (value) => onChange(value, 'password') }
                />

                <View 
                    style={ styles.containerMensajePassword } 
                >
                    <Text style={ styles.textMensajePassword }>
                        Si desea mantener la contraseña, deje el campo en blanco.
                    </Text>
                </View>
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
                    onPress={ onEdit }
                >
                    <Text 
                        style={ styles_signup.signUpText }
                    >
                        Confirmar
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
        marginTop: 120
    },
    headerText: {
        fontSize: 35,
        marginLeft: 4,
        color: 'white',
        // fontWeight: '500',
        fontFamily: 'Roboto-Regular',
    },
    containerMensajePassword: {
        height: 40,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
    },
    textMensajePassword: {
        color: '#ff3333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
