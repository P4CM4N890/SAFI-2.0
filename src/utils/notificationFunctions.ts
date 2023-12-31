import PushNotification from "react-native-push-notification";
import { PermissionsAndroid, Platform } from "react-native";

export const createNotificationChannel = () => {
    PushNotification.createChannel({
        channelId: 'safi-recordatorios',
        channelName: 'SAFI recordatorios'
    }, () => console.log("Canal de notificaciones creado."));
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
