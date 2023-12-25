import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, LogBox, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';
import { DatePickerLabel } from '../components/pickers/DatePickerLabel';
import { TimePickerLabel } from '../components/pickers/TimePickerLabel';
import { OptionPickerLabel } from '../components/pickers/OptionPickerLabel';
import { useRoute } from '@react-navigation/native';
import { MessageModal } from '../components/modals/MessageModal';
import { useForm } from '../hooks/useForm';
import RNFS from 'react-native-fs';
import { set } from 'date-fns';
import PushNotification from 'react-native-push-notification';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    nombre: '',
    fecha: '',
    hora: '',
    annotations: '',
};

export const AddNotificationScreen = ({ navigation }: Props) => {
    const route = useRoute();
    const { notificaciones, setNotificaciones }: any = route.params;

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');
    const { nombre, fecha, hora, annotations, onChange } = useForm(initialState);

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const onAddNotification = async () => {
        Keyboard.dismiss();

        if (nombre.length === 0) {
            setModalMessage("Debes darle un nombre a la notificación.");
            setModalVisible(true);

            return;
        }
        if (fecha.length === 0) {
            setModalMessage("Selecciona una fecha.");
            setModalVisible(true);
    
            return;
        }
        if (hora.length === 0) {
            setModalMessage("Selecciona una hora.");
            setModalVisible(true);
    
            return;
        }

        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';

        const idContent = await RNFS.readFile(pathId, 'utf8');
        const idDict = JSON.parse(idContent);

        const fechaD = new Date(fecha);
        const horaD = hora.split(':');

        const fechaHora = set(fechaD, { hours: Number(horaD[0]), minutes: Number(horaD[1]), seconds: Number(horaD[2]) })
        fechaHora.setTime( fechaHora.getTime() + fechaHora.getTimezoneOffset() * 60 * 1000 );

        const nuevoContenido = [...notificaciones, {
            id: (idDict.lastId + 1),
            title: nombre,
            datetime: fechaHora,
            annotations: annotations,
            isActive: true,
        }];

        setNotificaciones(nuevoContenido);
    
        PushNotification.localNotificationSchedule({
            channelId: 'safi-recordatorios',
            message: nombre,
            date: fechaHora,
            allowWhileIdle: true,
            playSound: true,
            soundName: "default",
            visibility: "public",
            vibrate: true,
            vibration: 1000,
            id: (idDict.lastId + 1),
        });

        try{
            await RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8');
            console.log("Notificacion agregada. Archivo notificaciones.json actualizado.")
        }
        catch(error){
            console.error(error);
        }

        try{
            await RNFS.writeFile(pathId, JSON.stringify({lastId: (idDict.lastId + 1)}), 'utf8');
            console.log("Archivo lastID actualizado.")
        }
        catch(error){
            console.error(error);
        }

        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <MessageModal
                    message={ modalMessage }
                    modalVisible={ modalVisible }
                    setModalVisible={ setModalVisible }
                />

                <View className='w-full h-full items-center mb-5'>

                    <Text className='mt-8 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nueva
                    </Text>
                    <Text className='text-2xl font-bold text-primary uppercase tracking-widest'>
                        Notificación
                    </Text>
                    
                    <InputLabel 
                        label='Nombre de la notificación' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-10'
                        value={ nombre }
                        onChange={ (value) => onChange(value, 'nombre') }
                    />

                    <DatePickerLabel 
                        label='Fecha'
                        extraClass='mt-3'
                        minimumDate={ new Date() }
                        onChange={ (value) => onChange(value, 'fecha') }
                    />

                    <TimePickerLabel 
                        label='Hora' 
                        extraClass='mt-3'
                        onChange={ (value) => onChange(value, 'hora') }
                    />
                    
                    <InputLabel 
                        label='Notas (opcional)' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-3'
                        value={ annotations }
                        onChange={ (value) => onChange(value, 'annotations') }
                    />

                    <View className='mt-16 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Guardar' 
                            onPress={ onAddNotification }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('NotificationsScreen') }
                        />
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}