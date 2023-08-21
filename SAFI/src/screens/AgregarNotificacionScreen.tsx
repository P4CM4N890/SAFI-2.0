import { Button } from 'react-native-paper';
import { HeaderScreens } from '../components/HeaderScreens';
import { modalStyles } from '../theme/appTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '../theme/appTheme';
import { StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Dimensions, TouchableWithoutFeedback, LogBox, TouchableOpacity, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from "react-native-push-notification";
import React, { useState } from 'react'
import RNFS from 'react-native-fs';

interface Props extends StackScreenProps<any, any> {};


export const AgregarNotificacionScreen = ({navigation}: Props) => {
    const windowWidth = Dimensions.get('window').width;
    const textInputWidth = windowWidth * 0.85;
    const route = useRoute();
    const { notificaciones, setNotificaciones }: any = route.params;
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);

    // States necesarios para el correcto funcionamiento
    const [titulo, setTitulo] = useState('');
    const [fechaHora, setFechaHora] = useState(new Date(new Date().getTime() + 1 * 60000));
    const [showFechaHora, setShowFechaHora] = useState(false);
    const [annotations, setAnnotations] = useState('');


    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const goBack = () => {
        navigation.goBack();
    };


    const onSubmit = async () => {
        if (titulo.length === 0) {
            setModalText("Ingresa un titulo para la notificación.")
            setModalVisible(true);
            return;
        } else if (titulo.length <= 2) {
            setModalText("Ingresa un titulo valido para la notificación.")
            setModalVisible(true);
            return;
        } 

        try {
            const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
            const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';
            const idContent = await RNFS.readFile(pathId, 'utf8')
            const idDict = JSON.parse(idContent);
            
                
            const nuevoContenido = [...notificaciones, {
                id: (idDict.lastId + 1),
                title: titulo,
                datetime: fechaHora,
                annotations: annotations,
                isActive: true,
            }];
    
            setNotificaciones(nuevoContenido);
    
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: titulo,
                date: fechaHora,
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: (idDict.lastId + 1),
            });
    
            RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8')
                .then(() => {
                    console.log('Archivo JSON actualizado con éxito.');
                })
                .catch((error) => {
                    console.log(error);
                });
            
            RNFS.writeFile(pathId, JSON.stringify({lastId: (idDict.lastId + 1)}), 'utf8')
                .then(() => {
                    console.log('LastID actualizado con éxito.');
                })
                .catch((error) => {
                    console.log(error);
                });
    
            navigation.goBack();           
        } catch (err) {
            console.error(err)
        }
    };


    const styles_card = StyleSheet.create({
        card: {
            backgroundColor: 'rgba(27, 34, 31, 0.5)',
            borderRadius: 10,
            paddingTop: 5,
            borderWidth: 1,
            borderColor: '#51595D',
            margin: 10,
            height: '95%',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },

    card_body: {
      paddingHorizontal: 15,
    },
  
    texto_titulo: {
      color: '#ffffff',
      borderBottomWidth: 1,
      borderColor: '#FFFFFF',
      fontSize: 24,
      // fontWeight: '800',
      fontFamily: 'Roboto-Black',
      width: textInputWidth,
    },
    
    texto_indicativo: {
      color: '#ffffff',
      fontSize: 24,
      fontFamily: 'Roboto-Black',
      // fontWeight: '800',
      width: textInputWidth
    },
  
    card_text: {
      color: '#888888',
      width: '100%',
      marginVertical: 5,
    },
  
    flex_title: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },

        picker_container: {
            borderColor: '#FFFFFF',
            borderWidth: 1,
            padding: 8,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginVertical: 5
        },

        picker_icon: {
            marginRight: 10
        },

        picker_text: {
            fontSize: 18,        
            fontFamily: 'Roboto-Bold',
      // fontWeight: 'bold',
            color: '#fff'
        },

        container_buttons: {
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row'
        },

        btnGuardar: {
            backgroundColor: 'rgba(0, 119, 68, 0.5)',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            width: '50%'
        },

        btnEliminar: {
            backgroundColor: 'rgba(109, 0, 20, 0.5)',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            width: '50%',
        }
    });


    return (
        <LinearGradient style={styles.container}
            colors={[
                '#003A10',
                '#001406',
                '#000902'
            ]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[-0.0745, 0.2513, 0.9512]}
        >
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
                        <TouchableOpacity
                            style={ [modalStyles.button, modalStyles.buttonClose] }
                            onPress={ () => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={ modalStyles.textStyle }>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <HeaderScreens title='Nueva Notificación' />
            <View style={styles.content}>
                <View style={styles_card.card}>
                    <View style={styles_card.card_body}>
                        <View style={styles_card.flex_title}>
                            <View>
                                <TextInput
                                    style={styles_card.texto_titulo}
                                    value={titulo}
                                    onChangeText={setTitulo}
                                    placeholder='Pago de ...'
                                    placeholderTextColor="#888888"
                                />
                            </View>
                        </View>
                        <Text style={styles_card.card_text}>Configuración del recordatorio</Text>

                        {/* DatePicker */}
                        <TouchableWithoutFeedback onPress={() => setShowFechaHora(true)}>
                            <View style={styles_card.picker_container}>
                                <Icon name="calendar-outline" size={24} color="white" style={styles_card.picker_icon} />
                                <Text style={styles_card.picker_text}>{fechaHora.toLocaleDateString()} - {fechaHora.toLocaleTimeString()}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <DatePicker
                            modal
                            open={showFechaHora}
                            date={fechaHora}
                            mode='datetime'
                            minimumDate={new Date()}
                            onConfirm={(datetime) => {
                                setShowFechaHora(false)
                                setFechaHora(datetime)
                            }}
                            onCancel={() => {
                                setShowFechaHora(false)
                            }}
                        />


                        {/* Anotaciones */}
                        <Text style={styles_card.texto_indicativo}>Anotaciones:</Text>
                        <TextInput
                            editable
                            multiline
                            value={annotations}
                            style={{...styles_card.picker_container, textAlignVertical: 'top', color: 'white'}}
                            onChangeText={setAnnotations}
                            placeholderTextColor="#888888"
                            placeholder='Aqui puedes escribir detalles acerca de la notificacion, como numéros de cuenta, instrucciones, direcciones, etc.'
                        />
                    </View>

                    <View style={styles_card.container_buttons}>
                        <Button style={styles_card.btnGuardar} textColor='#FFFFFF' onPress={onSubmit}>Guardar</Button>
                        <Button style={styles_card.btnEliminar} textColor='#FFFFFF' onPress={goBack}>Cancelar</Button>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};


