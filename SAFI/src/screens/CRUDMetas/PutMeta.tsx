import React, {useState} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { modalStyles } from '../../theme/appTheme';
import { HeaderScreens } from '../../components/HeaderScreens';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../../hooks/useForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/MetasStackNavigator';
import { actualizarMeta, actualizarPerfil } from '../../api/PutRequests';
import { crearIngreso } from '../../api/PostRequests';
import { PerfilNinoResponseModel } from '../../interfaces/ApiInterfaces';
import { obtenerPerfil } from '../../api/GetRequests';

interface Props extends StackScreenProps<RootStackParams, "PutMeta"> { };

const editarFecha = (sFecha : string) => {
    const dateParts = sFecha.split('-');

    const day = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]); 
    const year = parseInt(dateParts[0]);
    
    const fechaDate = new Date(year, month - 1, day);
    
    return fechaDate;
}

const toDDMMYYYY = (sFecha : string) => {
    const dateParts = sFecha.split('-');

    const day = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]); 
    const year = parseInt(dateParts[0]);
    
    return `${day}/${month}/${year}`;
}

export const PutMeta = ({route, navigation} : Props) => {
    // Parametros que fueron compartidos desde la otra interfaz
    const { id, nombre, fecha, dinero, objetivo } = route.params;

    // Datos a almacenar

    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ navigate, setNavigate ] = useState(false);
    const [date, setDate] = useState(editarFecha(fecha));

    const initialState = {
        id_meta: id,
        meta: nombre,
        fecha_final: fecha,
        dineroActual: dinero,
        dineroMeta: objetivo,
        abono: 0,
    };

    const { meta, dineroActual, dineroMeta, abono, onChange } = useForm(initialState);

    const abonarMeta = async () => {
        try{
            const perfil = await AsyncStorage.getItem("perfil_actual_id");
            if(perfil){
                const id_perfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;
                
                if(abono > 0){
                    let nuevo = (+dineroActual + +abono);
                    let temp2 = (+abono + +id_perfil.ahorro);

                    if(nuevo <= dineroMeta){
                        actualizarMeta(date, meta, nuevo, dineroMeta, id)
                        crearIngreso(new Date(), abono, meta, id_perfil.id_perfil);
                        actualizarPerfil(id_perfil.id_perfil, id_perfil.nombre, id_perfil.nombre, temp2, id_perfil.ruta_imagen);
                        setNavigate(true);
                        setModalText("Abono hecho con exito.");
                        setModalVisible(true);
                    }
                    else{
                        setModalText("Excedes el limite de la meta.");
                        setModalVisible(true);
                    }
                }
                else{
                    setModalText("No se puede abonar menos de un centavo.");
                    setModalVisible(true);
                }
            }
        }
        catch(err){
            setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            setModalVisible(true);
        }
    }

    return (
        <LinearGradient style={ stylesM.container }
        colors={[
                'rgba(0, 58, 16, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
            ]}
            start={{x : 1, y : 0}}
            end={{x : 0, y: 1}}
            locations={[0, 0.4, 1]}
        >
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={{flex: 1}}>
                <HeaderScreens title='Abonar a Meta' />
                <View style={stylesM.containerContent}>
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
                                    (modalText === 'No se puede abonar menos de un centavo.') ?
                                        <Image
                                            style={{width: 150, height: 150}}
                                            source={require('../../assets/decepcionado.png')}
                                        />
                                    : (modalText === 'Ha ocurrido un error. Intentalo de nuevo más tarde.') ?
                                        <Image
                                            style={{ width: 150, height: 150, marginBottom: 10 }}
                                            source={require('../../assets/4.png')}
                                        />
                                    :
                                        <></>
                                }
                                {
                                    (modalText === 'Abono hecho con exito.') ?
                                        <Image
                                            style={{width: 150, height: 150, marginBottom: 10}}
                                            source={require('../../assets/dinero.png')}
                                        />
                                    :
                                        <></>
                                }
                                <TouchableOpacity
                                    style={ [modalStyles.button, modalStyles.buttonClose] }
                                    onPress={ () => {
                                        setModalVisible(!modalVisible)
                                        if(navigate){
                                            navigation.navigate("MetasScreen");
                                        }
                                        else{
                                            setModalVisible(false);
                                        }
                                    } }
                                >
                                    <Text style={ modalStyles.textStyle }>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {/* Input para el nombre de la meta */}
                <View style={[stylesM.datos, stylesM.margen]}>
                    <Text style={stylesM.header}>Nombre de la meta:</Text>
                    <TextInput
                        style={stylesM.inputs}
                        underlineColorAndroid='transparent'
                        onChangeText={(value) => onChange(value, 'meta')}
                        value={meta}
                        editable={false}
                    />
                </View>
                    {/* Dinero actual */}
                <View style={stylesM.datos}>
                    <Text style={stylesM.header}>Dinero actual:</Text>
                    <View style={[stylesM.iconos, stylesM.border]}>
                        <Icon name="cash-outline" size={ 24 } color="white" style={stylesM.espacio}/>
                        <TextInput
                            style={[stylesM.inputs, stylesM.dinero]}
                            inputMode='numeric'
                            editable={false}
                            value={dineroActual.toString()}
                        />
                    </View>
                </View>
                    {/* Meta */}
                <View style={stylesM.datos}>
                    <Text style={stylesM.header}>Meta a alcanzar:</Text>
                    <View style={[stylesM.iconos, stylesM.border]}>
                        <Icon name="trophy-outline" size={ 24 } color="white" style={stylesM.espacio}/>
                        <TextInput
                            style={[stylesM.inputs, stylesM.dinero]}
                            inputMode='numeric'
                            editable={false}
                            placeholder='$0'
                            placeholderTextColor={colores.texto}
                            value={dineroMeta.toString()}
                        />
                    </View>
                </View>
                {/* Abonar */}
                <View style={stylesM.datos}>
                    <Text style={stylesM.header}>Abonar:</Text>
                    <View style={[stylesM.iconos, stylesM.border]}>
                        <Icon name="card-outline" size={ 24 } color="white" style={stylesM.espacio}/>
                        <TextInput
                            style={[stylesM.inputs, stylesM.dinero]}
                            inputMode='numeric'
                            placeholder='$0'
                            placeholderTextColor={colores.texto}
                            onChangeText={(value) => onChange(value, 'abono')}
                        />
                    </View>
                </View>
                <View style={stylesM.bttns}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            style={[stylesM.botones, stylesM.guardar]}
                            onPress={ abonarMeta }
                        >
                            <Text style={stylesM.textoBttns}>Abonar</Text>  
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            style={[stylesM.botones, stylesM.cancelar]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={stylesM.textoBttns}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export const colores = {
    primary: '#1E1E1E',
    footer: '#090B0A',
    title: 'white',
    tabsActiveColor: '#7a7979',
    tabsInactiveColor: '#ffffff',
    bg: '#1B221F',
    borderC: '#51595D',
    texto: '#888888',
    verde: '#214E28',
    azul: '#212B4E',
    verdeLimon: '#5CE998',
    rojo: '#6D0014',
};

const stylesM = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerContent: {
        flex: 9,
        backgroundColor: colores.bg,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colores.borderC, 
        marginVertical: 20,
        marginHorizontal: 15,
    },

    datos: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 5,
    },

    fecha: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        paddingVertical: 5,
    },

    margen: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },

    espacio: {
        marginHorizontal: 10,
        marginVertical: 2,
        flex: 1,
    },

    dinero: {
        padding: 5,
        borderRadius: 15,
        flex: 10,
    },

    header: {
        color: colores.texto,
        fontSize: 16,
    },

    inputs: {
        borderRadius: 2,
        fontSize: 22,
        color: 'white',
    },

    bttns: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconos: {
        flexDirection: 'row',
    },

    textoIconos: {
        fontSize: 22,
        color: 'white',
        marginHorizontal: 5,
        flex: 10,
    },

    border: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
    },

    botones: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },

    guardar: {
        backgroundColor: colores.verde,
        borderBottomLeftRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelar: {
        backgroundColor: colores.rojo,
        borderBottomRightRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textoBttns: {
        color: colores.title,
        fontSize: 22,
    },
});