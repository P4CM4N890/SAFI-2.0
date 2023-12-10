import { Text, View, PermissionsAndroid, Platform } from "react-native";
import { Button } from "../components/buttons/Button";
import { useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import PushNotification from "react-native-push-notification";

export const TempScreen = () => {
    const { logOut } = useContext( AuthContext );
    
    const onLogOut = async () => {
        try{
            logOut();
        }
        catch(err){
            console.error(err);
        }
    };

    const peticion = async () => {
        PushNotification.getScheduledLocalNotifications((notificaciones) => {
            console.log(notificaciones);
        });
        
        // try{
        //     // const { id, nombre, descripcion } = (await obtenerCategoria("e1b20484-fb9e-431b-a8c7-49ed6f3e25d4")).data;
            
        //     // console.log(id, nombre, descripcion);

        //     // let categoria: CategoriaEdit = {
        //     //     nombre: "Transportacion",
        //     // }

        //     // let usuario: UsuarioCreate = {
        //     //     nombre: "Prueba",
        //     //     correo: "prueba@gmail.com",
        //     //     fecha_de_nac: "2002-10-21",
        //     //     contrasena: "1234",
        //     //     ruta_imagen: "",
        //     // }

        //     // const response = (await crearUsuario(usuario));

        //     const response = (await eliminarUsuario("prueba@gmail.com")).data
            
        //     console.log(response);
        // }
        // catch(error) {
        //     console.error(error);
        // }

    }

    PushNotification.localNotificationSchedule({
        date: new Date(),
        message: "Prueba",
        channelId: 'safi-recordatorios',
        id: 5,
    });

    const checkPermissions = async () => {
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

    useEffect(() => {
        checkPermissions();
        // PushNotification.cancelAllLocalNotifications();
    }, []);

    return (
        <>
            <View className='content-center'>
                <Text style={{ fontSize: 50, fontWeight: "bold", color: "blue"}}>TEST ZONE</Text>
            
                <TouchableOpacity
                    className={`bg-primary px-8 py-3 rounded-xl shadow-xl shadow-gray-700 mt-5`}
                    activeOpacity={ 0.8 }
                    onPress={ onLogOut }
                >
                    <Text className="text-xl font-bold text-white uppercase">Logout</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    className={`bg-black px-8 py-3 rounded-xl shadow-xl shadow-gray-700 mt-10`}
                    activeOpacity={ 0.8 }
                    onPress={ peticion }
                >
                    <Text className="text-xl font-bold text-white uppercase">Probar</Text>
                </TouchableOpacity>
            </View>

        </>
    );
};
