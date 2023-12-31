import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Notificacion, NotificationCardProps } from '../types/notificationTypes';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BackButton } from '../components/buttons/BackButton';
import { NotificationCard } from '../components/cards/NotificationCard';
import { checkPermissions } from '../utils/notificationFunctions';

import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';
import { ActiveComponentContext } from '../context/ActiveComponentContext';

interface Props extends BottomTabScreenProps<any, any> {};

export const NotificationsScreen = ({ navigation }: Props) => {
    const [ notificaciones, setNotificaciones ] = useState<Notificacion[]>([]);
    const [ inicial, setInicial ] = useState(true);

    const toggleSwitch = (isEnabled: boolean, setIsEnabled: Function, notification: NotificationCardProps) => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        
        if(isEnabled) {
            PushNotification.cancelLocalNotification(notification.id);
        } 
        else {
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: notification.title,
                date: new Date(notification.datetime),
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: notification.id,
            });
        }

        const nuevoContenido = notificaciones.map((not: Notificacion) => {
            return (not.id === notification.id ? { ...not, isActive: !isEnabled } : not)
        });
        
        setNotificaciones(nuevoContenido);

        RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8').then(() => {
            console.log("Switch actualizado. Archivo notificaciones.json actualizado.")
        })
        .catch((error) => {
            console.error(error);
        });
        
        setIsEnabled((previousState: Boolean) => !previousState);
    };

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

    const updateNotification = async (notification: any) => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        
        // La notificacion estaba desactivada y ahora esta activa.
        if ((!notification.prevActive && notification.isActive)) {
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: notification.title,
                date: new Date(notification.datetime),
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: notification.id,
            });
        } 
        // La notificacion estaba activa y ahora no lo esta.
        else if (notification.prevActive && !notification.isActive) {
            PushNotification.cancelLocalNotification(notification.id);
        } 
        // La notificacion estaba activa y sigue activa.
        else if (notification.prevActive && notification.isActive) {
            PushNotification.cancelLocalNotification(notification.id);

            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: notification.title,
                date: new Date(notification.datetime),
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: notification.id,
            });
        }

        const nuevoContenido = notificaciones.map((not: Notificacion) => {
            return (not.id === notification.id ? { ...notification } : not)
        });
        
        setNotificaciones(nuevoContenido);

        try{
            await RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8');
            console.log("Notificacion editada. Archivo notificaciones.json actualizado.")
        }
        catch(error){
            console.error(error);
        }
    };

    const checkDates = () => {
        const now = new Date();
        const newNotifications = notificaciones.map((not: Notificacion) => {

            if (new Date(not.datetime).getTime() < now.getTime()) {             
                not.isActive = false;
            }
            
            return not;
        });

        setNotificaciones(newNotifications);
    };

    useEffect(() => {
        if ((notificaciones.length > 0) && (inicial)) {
            checkDates();
            setInicial(false);
        }
    }, [notificaciones]);

    useEffect(() => {
        checkPermissions();
    });

    useFocusEffect(
        useCallback(() => {
            checkFiles();
        }, [])
    );

    const { changeTabBarVisibility } = useContext(ActiveComponentContext);

    useEffect(() => {
        changeTabBarVisibility(false);

        return () => {
            changeTabBarVisibility(true);
          };
    }, []);

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
                        notificaciones.length !== 0 ?
                            notificaciones.map((not: Notificacion) => {
                                return <NotificationCard
                                    key={ not.id } 
                                    id={ not.id }
                                    annotations={ not.annotations }
                                    iconColor='#54D8AD'
                                    iconName='calendar-outline'
                                    datetime={ not.datetime }
                                    title={ not.title }
                                    isActive={ not.isActive }
                                    toggleSwitch={ toggleSwitch }
                                    deleteNotification={ deleteNotification }
                                    updateNotification={ updateNotification }
                                />
                            })
                        :
                        <Text
                            className='text-xl font-semibold text-dark-gray 
                            tracking-widest mt-10'
                        >
                            No hay notificaciones. Crea algunas.
                        </Text>
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