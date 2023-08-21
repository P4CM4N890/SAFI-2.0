import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Dimensions, TouchableWithoutFeedback, LogBox, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../theme/appTheme';
import { StyleSheet } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { Button } from 'react-native-paper';
import { HeaderScreens } from '../components/HeaderScreens';
import PushNotification from 'react-native-push-notification';
import { modalStyles } from '../theme/appTheme';


interface Props {
    id: number;
    title: string;
    datetime: Date;
    isActive: boolean;
    annotations: string;
    toggleSwitch: Function;
    deleteNotification: Function;
    updateNotification: Function;
}


export const ModificarNotificacionScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, title, datetime, isActive, annotations, deleteNotification, updateNotification }: Props = route.params?.props;
    const windowWidth = Dimensions.get('window').width;
    const textInputWidth = windowWidth * 0.7;
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);

    // States necesarios para el correcto funcionamiento
    const [isEnabled, setIsEnabled] = useState(isActive || false);
    const [titulo, setTitulo] = useState(title);

    // DatePicker
    const [fechaHora, setFechaHora] = useState(datetime);
    const [showFechaHora, setShowFechaHora] = useState(false);


    // AnnotationsPicker
    const [anotaciones, setAnotaciones] = useState(annotations);

    const onDelete = () => {
        deleteNotification(id);
        PushNotification.cancelLocalNotification(id.toString());

        navigation.goBack();
    }
    
    const onUpdate = () => {
        if (titulo.length === 0) {
            setModalText("Ingresa un titulo para la notificación.")
            setModalVisible(true);
            return;
        } else if (titulo.length <= 2) {
            setModalText("Ingresa un titulo valido para la notificación.")
            setModalVisible(true);
            return;
        } 

        updateNotification({
            id: id,
            title: titulo,
            datetime: fechaHora,
            annotations: anotaciones,
            isActive: isEnabled,
            prevActive: isActive 
        });

        navigation.goBack();
    }

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

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
      width: textInputWidth
    },
    
    texto_indicativo: {
      color: '#ffffff',
      fontSize: 24,
      // fontWeight: '800',
      fontFamily: 'Roboto-Black',
      width: textInputWidth
    },
  
    card_text: {
      color: '#888888',
      width: '75%',
      marginVertical: 5,
    },
  
    card_toggle_switch: {
      width: '25%', 
      alignItems: 'center', 
      justifyContent: 'center',
    },
  
    flex_title: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },

    picker_container: {
      borderColor: '#FFFFFF',
      color: '#fff',
      fontFamily: 'Roboto-Regular',
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
      color: '#ffff',
      fontFamily: 'Roboto-Bold',
      // fontWeight: 'bold',
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


    useEffect(() => {
        const actual = new Date();
        if (fechaHora.getTime() < actual.getTime()) {
            setFechaHora(actual);
        }
    }, [])

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
            <HeaderScreens title='Modificar Notificacion' />
            <View style={styles.content}>
                <View style={styles_card.card}>
                    <View style={styles_card.card_body}>
                        <View style={styles_card.flex_title}>
                            <View>
                                <TextInput
                                    style={styles_card.texto_titulo}
                                    value={titulo}
                                    onChangeText={setTitulo}
                                    placeholderTextColor="#888888"
                                />
                            </View>
                            <ToggleSwitch
                                offColor='#51595D'
                                onColor='#35D863'
                                thumbOffStyle={{ backgroundColor: '#0d1911' }}
                                thumbOnStyle={{ backgroundColor: '#0d1911' }}
                                isOn={isEnabled}
                                onToggle={() => setIsEnabled(prev => !prev)}
                            />
                        </View>
                        <Text style={styles_card.card_text}>Configuración del recordatorio</Text>

                        {/* DatePicker */}
                        <TouchableWithoutFeedback onPress={() => setShowFechaHora(true)}>
                            <View style={styles_card.picker_container}>
                                <Icon name="calendar-outline" size={24} color="white" style={styles_card.picker_icon} />
                                <Text style={styles_card.picker_text}>
                                    {fechaHora.toLocaleDateString()} - {fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
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
                            placeholder='Anotaciones...'
                            value={anotaciones}
                            style={{...styles_card.picker_container, textAlignVertical: 'top', height: 95}}
                            onChangeText={setAnotaciones}
                            placeholderTextColor="#888888"
                        />
                    </View>

                    <View style={styles_card.container_buttons}>
                        <Button style={styles_card.btnGuardar} textColor='#FFFFFF' onPress={onUpdate}>Guardar</Button>
                        <Button style={styles_card.btnEliminar} textColor='#FFFFFF' onPress={onDelete}>Eliminar</Button>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};


