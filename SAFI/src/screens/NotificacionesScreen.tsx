import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, DeviceEventEmitter, PermissionsAndroid, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../theme/appTheme';
import { StyleSheet } from "react-native";
import { NotificationCard } from '../components/NotificationCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderScreens } from '../components/HeaderScreens';
import RNFS from 'react-native-fs';
import { StackScreenProps } from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
import { useFocusEffect } from '@react-navigation/native';


interface Props extends StackScreenProps<any, any> {};


interface NotificationProps {
    id: number;
    title: string;
    datetime: Date;
    annotations: string;
    isActive: boolean;
}

export const NotificacionesScreen = ({navigation}: Props) => {
    const [notificaciones, setNotificaciones] = useState<NotificationProps[]>([]);
    const [inicial, setInicial] = useState<Boolean>(true);
    
    const redirectToAdd = () => {
        navigation.navigate('AgregarNotificacionScreen', {notificaciones, setNotificaciones});
    };
    
    
    // const deleteThis = () => {
    //     setNotificaciones([]);
    //     const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
    //     const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';
        

    //     RNFS.unlink(path)
    //     .then(() => {
    //         console.log('NOTIFICACIONES.JSON DELETED');
    //     })
    //     // `unlink` will throw an error, if the item to unlink does not exist
    //     .catch((err) => {
    //         console.log(err.message);
    //     });
        
    //     RNFS.unlink(pathId)
    //     .then(() => {
    //         console.log('LASTID.JSON DELETED');
    //     })
    //     // `unlink` will throw an error, if the item to unlink does not exist
    //     .catch((err) => {
    //         console.log(err.message);
    //     });
    // };


    const toggleSwitch = (isEnabled: boolean, setIsEnabled: Function, not: any) => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        
        if(isEnabled) {
            PushNotification.cancelLocalNotification(not.id.toString());
        } else {
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: not.title,
                date: not.datetime,
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: not.id,
            });
        }

        const nuevoContenido = notificaciones.map((notification: NotificationProps) => {
            return (notification.id === not.id ? { ...notification, isActive: !isEnabled } : notification)
        });
        
        setNotificaciones(nuevoContenido);

        RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8')
            .then(() => {
                console.log('Archivo JSON actualizado con éxito.');
            })
            .catch((error) => {
                console.log(error);
            });
        
        setIsEnabled((previousState: Boolean) => !previousState)
    };
    
    
    const updateNotification = (not: any) => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        
        if ((!not.prevActive && not.isActive)) {
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: not.title,
                date: not.datetime,
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: not.id,
            });
        } else if (not.prevActive && !not.isActive) {
            PushNotification.cancelLocalNotification(not.id.toString());
        } else if (not.prevActive && not.isActive) {
            PushNotification.cancelLocalNotification(not.id.toString());
            PushNotification.localNotificationSchedule({
                channelId: 'safi-recordatorios',
                message: not.title,
                date: not.datetime,
                allowWhileIdle: true,
                playSound: true,
                soundName: "default",
                visibility: "public",
                vibrate: true,
                vibration: 1000,
                id: not.id,
            });
        }

        const nuevoContenido = notificaciones.map((notification: NotificationProps) => {
            return (notification.id === not.id ? { ...not } : notification)
        });
        
        setNotificaciones(nuevoContenido);

        RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8')
            .then(() => {
                console.log('Archivo JSON actualizado con éxito.');
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const deleteNotification = (id: number) => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        
        const nuevoContenido = notificaciones.filter((notification: NotificationProps) => notification.id !== id);
        
        setNotificaciones(nuevoContenido);

        RNFS.writeFile(path, JSON.stringify(nuevoContenido), 'utf8')
            .then(() => {
                console.log('Archivo JSON actualizado con éxito.');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const checkFiles = async () => {
        const path = RNFS.DocumentDirectoryPath + '/notificaciones.json';
        const pathId = RNFS.DocumentDirectoryPath + '/lastId.json';

        if (!await RNFS.exists(pathId)) {
            RNFS.writeFile(pathId, JSON.stringify({lastId: 0}), 'utf8')
                .then(() => {
                    console.log('Archivo LastID creado.');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("LastID existe");
        }

        if (await RNFS.exists(path)) {
            RNFS.readFile(path, 'utf8')
                .then((contenido) => {
                    console.log('Notificaciones.json existe');
                    
                    setNotificaciones(JSON.parse(contenido));
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            RNFS.writeFile(path, JSON.stringify(notificaciones), 'utf8')
                .then(() => {
                    console.log('Archivo Notificaciones creado.');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const checkPermissions = async () => {
        if (Platform.constants?.Release === '13') {
            try {
                const permissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

                if (!permissionGranted) {

                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                        {
                            title: 'Requerimos permisos',
                            message:
                            'Activa las notificaciones para vivir la maxima experiencia',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('You can use the notifications');
                    } else {
                         console.log('Notifications permission denied');
                    }
                }

                
              } catch (err) {
                console.warn(err);
              }
        }
    }


    const checkDates = () => {
        const now = new Date();
        const newNotifications = notificaciones.map((not: NotificationProps) => {

            if (new Date(not.datetime).getTime() < now.getTime()) {             
                not.isActive = false;
            }
            
            return not;
        });

        setNotificaciones(newNotifications);
    }


    useEffect(() => {
        if ((notificaciones.length > 0) && (inicial)) {
            checkDates();
            setInicial(false);
        }
    }, [notificaciones]);

    useEffect(() => {
        checkPermissions();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            checkFiles();
        }, [])
    );

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
            <HeaderScreens title='Tus Notificaciones' />
            <View style={styles.content}>
                <ScrollView>
                    {
                        (notificaciones.length === 0) ? 
                            <Text style={{
                                textAlign: 'center', 
                                marginVertical: 10, 
                                color: 'white', 
                                opacity: 0.8
                            }}>
                                No hay notificaciones
                            </Text>
                        :
                            notificaciones.map((not: NotificationProps) => {
                                return (
                                    <NotificationCard
                                        key={not.id}
                                        id={not.id}
                                        title={not.title}
                                        datetime={new Date(not.datetime)}
                                        isActive={not.isActive}
                                        annotations={not.annotations}
                                        toggleSwitch={toggleSwitch}
                                        deleteNotification={deleteNotification}
                                        updateNotification={updateNotification}
                                    />
                                )
                            })
                    }
                </ScrollView>
                {/* <TouchableOpacity 
                    style={{...styles_notifications.addBtn, right: 75}} 
                    onPress={deleteThis}
                >
                    <Icon name={'add-outline'} size={40} color={'#FF0000'} />
                </TouchableOpacity> */}

                <TouchableOpacity 
                    style={styles_notifications.addBtn} 
                    onPress={redirectToAdd}
                >
                    <Icon name={'add-outline'} size={40} color={'#FFFFFF'} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles_notifications = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 10,
        backgroundColor: 'rgba(27,34,31, 0.5)',
        borderRadius: 28,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    }
})