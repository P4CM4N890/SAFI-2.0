import React, {useState} from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { modalStyles } from '../../theme/appTheme';
import { HeaderScreens } from '../../components/HeaderScreens';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/MetasStackNavigator';
import { actualizarMeta, actualizarPerfilMetaFijada } from '../../api/PutRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PerfilNinoResponseModel, MetaAhorroResponseModel } from '../../interfaces/ApiInterfaces';
import { obtenerPerfil, obtenerMeta } from '../../api/GetRequests';

interface Props extends StackScreenProps<RootStackParams, "EditMeta"> { };

// función para mostrar la fecha con el formato d/m/aaaa pd: es de Alain

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

export const EditMeta = ({route, navigation} : Props) => {
    // Parametros que fueron compartidos desde la otra interfaz
    const { id, nombre, fecha, dinero, objetivo } = route.params;

    // Datos a almacenar

    const [date, setDate] = useState(editarFecha(fecha));
    const [open, setOpen] = useState(false);
    const [showFecha, setShowFecha] = useState(false);
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ navigate, setNavigate ] = useState(false);

    const initialState = {
        id_meta: id,
        meta: nombre,
        fecha_nueva: toDDMMYYYY(fecha),
        dineroActual: dinero,
        dineroMeta: objetivo,
    };

    const { meta, fecha_nueva, dineroActual, dineroMeta, onChange } = useForm(initialState);

    const stringFecha = (dDate : Date) => {
        const nuevaFecha = dDate.getFullYear() + '-' + (dDate.getMonth() + 1) + '-' + (dDate.getDay() + 1);

        console.log(nuevaFecha);
        return nuevaFecha;
    }
    // Función para editar meta

    const updateMeta = async () => {
        try{
            const metaDatos : MetaAhorroResponseModel = (await obtenerMeta(id.toString())).data;
            
            if(editarFecha(metaDatos.fecha_inicio) < date){
                actualizarMeta(date, meta, dineroActual, dineroMeta, id);
                setNavigate(true);
                setModalText("Meta actualizada con exito.");
                setModalVisible(true);
            }
            else{
                setModalText("La fecha a finalizar no puede ser antes de la fecha de inicio.");
                setModalVisible(true);
            }
        }
        catch(err){
            if(meta.length < 2){
                setModalText("El nombre debe superar los dos caracteres.");
                setModalVisible(true);
            }
            else if(dinero <= 0){
                setModalText("La meta a alcanzar no puede ser menor a un centavo.");
                setModalVisible(true);
            }
            else{
                setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
                setModalVisible(true);
            }
        }
    }

    const fijarMeta = async () => {
        try{
            const perfil = await AsyncStorage.getItem("perfil_actual_id");
            await AsyncStorage.setItem("id_meta_fijada", id.toString());

            if(perfil){
                const idPerfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;
                actualizarPerfilMetaFijada(idPerfil.id_perfil, id);
                setModalText("Meta fijada con exito.");
                setModalVisible(true);
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
                <HeaderScreens title='Editar Meta' />
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
                                    onPress={ () => {
                                        setModalVisible(!modalVisible)
                                        if(navigate){
                                            navigation.navigate("VerMetasScreen");
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
                    />
                </View>
                        {/* Input para establecer la fecha a finalizar */}
                <View style={stylesM.datos}>
                    <Text style={stylesM.header}>Fecha propuesta a finalizar:</Text>
                    <TouchableOpacity
                        onPress={ () => setShowFecha(true) }
                        activeOpacity={1}
                        style={[stylesM.fecha, stylesM.iconos]}
                    >
                        <Icon name="calendar-outline" size={ 24 } color="white" style={stylesM.espacio}/>
                        <Text style={stylesM.textoIconos}>
                            {date.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        theme='dark'
                        open={showFecha}
                        
                        date={date}
                        mode='date'
                        onConfirm={(date) => {
                            setShowFecha(false)
                            onChange(stringFecha(date), 'fecha_nueva')
                            setDate(date)
                        }}
                        onCancel={() => {
                            setShowFecha(false)
                        }}
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
                            editable={true}
                            placeholder='$0'
                            placeholderTextColor={colores.texto}
                            onChangeText={(value) => onChange(value, 'dineroMeta')}
                            value={dineroMeta.toString()}
                        />
                    </View>
                </View>
                {/* Botón de fijar */}
                <View style={stylesM.datos}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            style={[stylesM.botones, stylesM.fijar]}
                            onPress={ fijarMeta }
                        >
                            <Text style={stylesM.textoBttns}>Fijar meta</Text>  
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Botones de guardar y cancelar */}
                <View style={stylesM.bttns}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            style={[stylesM.botones, stylesM.guardar]}
                            onPress={ updateMeta }
                        >
                            <Text style={stylesM.textoBttns}>Guardar</Text>  
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity 
                            style={[stylesM.botones, stylesM.cancelar]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={stylesM.textoBttns}>Regresar</Text>
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
    azul: '#002877',
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

    fijar: {
        backgroundColor: colores.azul,
        marginTop: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
    },

    textoBttns: {
        color: colores.title,
        fontSize: 22,
    },
});