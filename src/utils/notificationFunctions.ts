import PushNotification from "react-native-push-notification";
import { PermissionsAndroid, Platform } from "react-native";
import consejos from "../assets/consejos.json";
import { add } from "date-fns";

export const createNotificationChannel = () => {
    PushNotification.createChannel({
        channelId: 'safi-recordatorios',
        channelName: 'SAFI recordatorios'
    }, () => console.log("Canal de notificaciones creado."));
};

export const createAdvicesChannel = () => {
    PushNotification.createChannel({
        channelId: 'safi-consejos',
        channelName: 'SAFI consejos'
    }, () => console.log("Canal de consejos creado."));
};

export const addAdviceNotification = () => {
    const consejo = consejos[Math.floor(Math.random() * consejos.length)];

    PushNotification.scheduleLocalNotification({
        channelId: 'safi-consejos',
        title: consejo.titulo,
        message: consejo.descripcion,
        date: add(new Date(), { hours: 8 }),
        allowWhileIdle: true,
        playSound: true,
        soundName: "default",
        visibility: "public",
        vibrate: true,
        vibration: 1000,
        id: Math.floor(Math.random() * consejos.length) * Math.floor(Math.random() * 1000),
    });
};

export const checkPermissions = async () => {
    if ('Release' in Platform.constants){
        if (Platform.constants.Release  === '13') {
            try {
                const permissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

                if (!permissionGranted) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                        {
                            title: 'Necesitamos tu permiso',
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
            } 
            catch (err) {
                console.warn(err);
            }
        }
    }
}
