import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { BackButton } from '../components/buttons/BackButton';
import { NotificationCard } from '../components/cards/NotificationCard';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Notificacion } from '../types/notificationTypes';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { checkPermissions } from '../utils/notificationFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends BottomTabScreenProps<any, any> {};

export const NotificationsScreen = ({ navigation }: Props) => {
    const [ notificaciones, setNotificaciones ] = useState<Notificacion[]>([]);
    const [ inicial, setInicial ] = useState(true);

    const checkFiles = async () => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';

        // Verificamos si existe el archivo lastId, y si no lo creamos.
        if (!await RNFS.exists(pathId)) {
            try{
                await RNFS.writeFile(pathId, JSON.stringify({lastId: 0}), 'utf8');
                console.log('Archivo LastID creado.');
            }
            catch(error){
                console.error(error);
            }
        } else {
            console.log("LastID existe");
        }

        // Verificamos si existe el archivo de notificaciones, y si no lo creamos.
        if (await RNFS.exists(path)) {
            try{
                const contenido = await RNFS.readFile(path, 'utf8');

                setNotificaciones(JSON.parse(contenido));
            }
            catch(error){
                console.error(error);
            }
        } 
        else {
            try{
                await RNFS.writeFile(path, JSON.stringify(notificaciones), 'utf8');
                console.log('Archivo de notificaciones creado.');
            }
            catch(error){
                console.error(error);
            }
        }
    };

    const deleteNotification = async (id: string) => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        
        const nuevoContenido = notificaciones.filter((notification: Notificacion) => notification.id !== id);
        
        setNotificaciones(nuevoContenido);

        try{
            await RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8');
            console.log("Notificacion eliminada. Archivo notificaciones.json actualizado.")
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        checkPermissions();
    });

    useFocusEffect(
        useCallback(() => {
            checkFiles();
        }, [])
    );

    return (
        <View className='w-full h-full items-center p-5'>
            <BackButton 
                iconColor='#FFF' 
                iconSize={ 30 } 
                extraClass='bg-primary'
                onPress={ () => navigation.goBack() }
            />

            <Text className='text-black text-2xl font-semibold mt-2 
            tracking-widest'>Notificaciones</Text>

            <View className='mt-4'>
                <ScrollView>
                    {
                        notificaciones.map((not: Notificacion) => {
                            return <NotificationCard
                                key={ not.id } 
                                id={ not.id }
                                iconColor='red'
                                iconName='calendar-outline'
                                datetime={ not.datetime }
                                title={ not.title }
                                deleteNotification={ deleteNotification }
                            />
                        })
                    }
                </ScrollView>
            </View>

            <View className='items-center absolute bottom-5'>
                <TouchableOpacity
                    className='bg-primary w-16 h-16 justify-center items-center rounded-full z-10' 
                    activeOpacity={ 0.8 }
                    onPress={ () => navigation.navigate('AddNotificationScreen', { notificaciones, setNotificaciones }) }
                >
                    <Icon name='add-outline' size={ 40 } color='#FFF'/>
                </TouchableOpacity>
            </View>
        </View>
    );
}