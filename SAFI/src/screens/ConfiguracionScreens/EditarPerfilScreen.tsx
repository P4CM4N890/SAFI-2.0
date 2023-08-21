import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { RootStackParams } from '../../navigation/ConfiguracionStackNavigator';
import { useForm } from '../../hooks/useForm';
import { actualizarPerfil } from '../../api/PutRequests';
import { modalStyles } from '../../theme/appTheme';
import { FotoPerfil } from '../../components/FotoPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<RootStackParams, "EditarPerfilScreen"> { };

export const EditarPerfilScreen = ({ route, navigation }: Props) => {
    const imagenes = ["skipper", "willy", "girl", "perro", "pokemon", "robot"];

    const { id, username, ahorro, ruta_imagen } = route.params;

    console.log({id});
    

    const initialState = {
        nombre: username,
    };

    const { nombre, onChange } = useForm(initialState);
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ navigate, setNavigate ] = useState(false);
    const [ imagen, setImagen ] = useState(ruta_imagen);
    const [ refresh, setRefresh ] = useState(false);

    const onEditProfile = async () => {        
        if (nombre.length === 0) {
            setModalText("Ingresa el nombre del perfil.")
            setModalVisible(true);
            return;
        } else if (nombre.length <= 2) {
            setModalText("Ingresa un nombre valido para el perfil.")
            setModalVisible(true);
            return;
        } 

        try{
            // No hagan perfiles con el mismo nombre en dos cuentas diferentes. Truena.
            await actualizarPerfil(id, username, nombre, ahorro, imagen);
            await AsyncStorage.setItem("perfil_actual", nombre);
            await AsyncStorage.setItem("ruta_imagen", imagen);
            
            setNavigate(true);
            setModalText("Perfil modificado con exito.");
            setModalVisible(true);
        }
        catch(err){
            // console.error(err);
            setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
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
            {/* Header */}
            <View style={ styles.header }>
                <Text style={ styles.headerText }>Editar Perfil</Text>
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
                                        navigation.navigate("ConfiguracionScreen");
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
                    placeholder={ username }
                    placeholderTextColor="#888888"
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
                        onPress={ onEditProfile }
                    >
                        <Text style={ styles.buttonText }>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        // backgroundColor: 'red',
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
        // textAlign: 'center',
    },
    infoContainer: {
        marginTop: 20,
        borderWidth: 1,
        flex: 1,
        borderColor: 'white',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        height: 560
    },
    label: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.7,
        paddingHorizontal: 20,
    },
    usernameInput: {
        height: 50,
        marginVertical: 10,
        fontSize: 28,
        // fontWeight: 'bold',
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
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        // position: 'absolute',
        alignItems: 'center',
        // flexDirection: 'row',
        textAlign:'center',
        width: '100%',
        marginTop: 40,
        marginBottom: 40,
        // marginLeft: 4,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        backgroundColor: 'blue',
        height: 55,
        marginHorizontal: 15,
        borderRadius: 10,
        marginTop: 8
    },
    buttonText: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Roboto-Bold',
    }
});