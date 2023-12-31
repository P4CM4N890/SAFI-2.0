import { useState }, { useContext, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, LogBox } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useForm } from '../hooks/useForm';
import { Button } from '../components/buttons/Button';
import { InputLabel } from '../components/inputs/InputLabel';
import { NotificationsStackParams } from '../navigation/NotificationsStackNavigator';
import { DatetimePickerLabel } from '../components/pickers/DatetimePickerLabel';
import { MessageModal } from '../components/modals/MessageModal';

import PushNotification from 'react-native-push-notification';
import ToggleSwitch from 'toggle-switch-react-native';
import { ActiveComponentContext } from '../context/ActiveComponentContext';

interface Props extends StackScreenProps<NotificationsStackParams, 'EditNotificationScreen'>{};


export const EditNotificationScreen = ({ navigation, route }: Props) => {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    
    const { id, title: nombre, datetime: fecha, isActive, 
        annotations, deleteNotification, updateNotification } = route.params;

    const initialState = {
        nombre,
        fecha,
        annotations,
    };

    const { nombre: newNombre, fecha: newFecha, 
        annotations: newAnnotations, onChange } = useForm(initialState);
    const [ isEnabled, setIsEnabled ] = useState(isActive);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');
    
    const onUpdate = () => {
        if (nombre.length === 0) {
            setModalMessage("Debes darle un nombre a la notificación.");
            setModalVisible(true);

            return;
        }

        updateNotification({
            id: id,
            title: newNombre,
            datetime: newFecha,
            annotations: newAnnotations,
            isActive: isEnabled,
            prevActive: isActive 
        });

        navigation.goBack();
    }
    
    const onDelete = () => {
        deleteNotification(id);

        PushNotification.cancelLocalNotification(id);
        navigation.goBack();
    };

    return (
        <ScrollView>
            <MessageModal
                message={ modalMessage }
                modalVisible={ modalVisible }
                setModalVisible={ setModalVisible }
            />

            <View className='w-full h-full items-center py-5'>

                <Text className='mt-3 text-2xl font-bold text-primary uppercase tracking-widest'>
                    Editar
                </Text>
                <Text className='text-2xl font-bold text-primary uppercase tracking-widest'>
                    Notificación
                </Text>

                <View className='w-5/6 mt-6 flex-row items-center justify-center'>
                    <TouchableOpacity
                        onPress={ onDelete }
                    >
                        <Text 
                            className='text-sm text-primary text-red-600 mr-12'
                            style={{color: 'red', fontWeight: 'bold'}}
                        >
                            Eliminar
                        </Text>
                    </TouchableOpacity>

                    <ToggleSwitch 
                        offColor='#51595D'
                        onColor='#35D863'
                        thumbOffStyle={{ backgroundColor: '#ffff' }}
                        thumbOnStyle={{ backgroundColor: '#ffff' }}
                        isOn={ isEnabled }
                        onToggle={ () => setIsEnabled(prev => !prev) }
                    />
                </View>
                
                <InputLabel 
                    label='Nombre de la notificación' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-6'
                    value={ newNombre }
                    onChange={ (value) => onChange(value, 'nombre') }
                />

                <DatetimePickerLabel 
                    label='Fecha y hora'
                    extraClass='mt-3'
                    fechaInicial={ fecha }
                    onChange={ (value) => onChange(value, 'fecha') }
                />

                <InputLabel 
                    label='Notas (opcional)' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-3'
                    value={ newAnnotations }
                    onChange={ (value) => onChange(value, 'annotations') }
                />

                <View className='mt-8 w-5/6 flex-row justify-between'>
                    <Button 
                        label='Guardar' 
                        onPress={ onUpdate }
                    />
                    <Button 
                        label='Cancelar' 
                        extraClass='bg-rose-600'
                        onPress={ () => navigation.goBack() }
                    />
                </View>

            </View>
        </ScrollView>
    );
}