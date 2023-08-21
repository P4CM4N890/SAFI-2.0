import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, Image} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { modalStyles } from '../theme/appTheme';
import { FotoPerfil } from '../components/FotoPerfil';
import { crearPerfil } from '../api/PostRequests';
import { CuentaResponseModel } from '../interfaces/ApiInterfaces';
import { obtenerCuenta } from '../api/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<any, any> { };

const initialState = {
    nombre: "",
};

export const CrearPerfilScreen = ({ navigation }: Props) => {
    const imagenes = ["skipper", "willy", "girl", "perro", "pokemon", "robot"];

    const { nombre, onChange } = useForm(initialState);
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ navigate, setNavigate ] = useState(false);
    const [ imagen, setImagen ] = useState("skipper");
    const [ refresh, setRefresh ] = useState(false);

    const onCreateProfile = async () => {
        if (nombre.length === 0) {
            setModalText("Ingresa un nombre.");
            setModalVisible(true);
            return;
        } else if (nombre.length > 0 && nombre.length <= 2) {
            setModalText("Ingresa un nombre valido.");
            setModalVisible(true);
            return;
        }

        try{
            const correo = await AsyncStorage.getItem("correo");
            
            if(correo){
                const cuenta: CuentaResponseModel = (await obtenerCuenta(correo)).data
    
                await crearPerfil(nombre, 0, imagen, cuenta.id_cuenta);
    
                setNavigate(true);
                setModalText("Perfil creado con exito.");
                setModalVisible(true);
            }
        }
        catch(err){
            setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            console.error(err);
            
            setModalVisible(true);
        }
    };

    const onSelectProfilePicture = async (imagen: string) => {
        setImagen(imagen);
        handleRefreshData();
    };

    const handleRefreshData = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {

    }, [refresh]);

    return (
        <LinearGradient
        style={ styles.container }
        colors={[
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 58, 16, 1)',
        ]}
        locations={[-0.0745, 0.3689, 1.134]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
                style={{flex: 1}}
            >
                {/* Header */}
                <View style={ styles.header }>
                    <Text style={ styles.headerText }>Crear Perfil</Text>
                </View>

                {/* Contenedor */}
                <View style={ styles.infoContainer }>

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
                                    onPress={ () => {
                                        setModalVisible(!modalVisible)
                                        if(navigate){
                                            navigation.navigate("SeleccionPerfilScreen");
                                        }
                                    } }
                                >
                                    <Text style={ modalStyles.textStyle }>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Input para cambiar el nombre del perfil */}
                    <TextInput 
                        placeholder='Nombre'
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        autoCorrect={ false }
                        autoCapitalize="words"
                        style={ styles.usernameInput }
                        onChangeText={ (value) => onChange(value, 'nombre') }
                    />

                    {/* Imágenes de perfil disponibles */}
                    <Text style={{ ...styles.label, marginTop: 10 }}>
                        Foto de Perfil
                    </Text>

                    <View style={ styles.avatarContainer }>
                        {
                            imagenes.map( (img) =>
                                <TouchableOpacity
                                    key={ img }
                                    activeOpacity={ 0.7 }
                                    style={ {
                                        ...styles.containerImg,
                                        borderColor: (img === imagen) ?  'white' : 'black'
                                    } }
                                    onPress={ () => onSelectProfilePicture(img) }
                                >
                                    <FotoPerfil image={ img } size='medium' />
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    {/* Botones inferiores */}
                    <View style={ styles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            style={{ 
                                ...styles.button,
                                backgroundColor: 'green'
                            }}
                            onPress={ onCreateProfile }
                        >
                            <Text style={ styles.buttonText }>Crear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    containerImg: {
        width: 105,
        height: 105,
        borderWidth: 3,
        marginTop: 15,
        borderRadius: 200,
        overflow: 'hidden',
    },
    header: {
        marginTop: 35
    },
    headerText: {
        fontSize: 35,
        marginLeft: 4,
        color: 'white',
        // fontWeight: '500',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
    },
    infoContainer: {
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 10,
        flex: 1,
    },
    label: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.7,
        paddingHorizontal: 20,
    },
    usernameInput: {
        flex: 0.2,
        fontSize: 24,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: 'white',
        borderWidth: 1,
        paddingHorizontal: 20,
        borderColor: 'transparent',
        fontFamily: 'Roboto-Bold',
        borderBottomColor: 'white'
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        textAlign:'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        backgroundColor: 'blue',
        height: 50,
        marginHorizontal: 15,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto-Bold',
    }
});
