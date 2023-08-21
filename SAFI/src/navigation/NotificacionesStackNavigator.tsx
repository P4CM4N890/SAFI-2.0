import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificacionesScreen } from '../screens/NotificacionesScreen';
import { ModificarNotificacionScreen } from '../screens/ModificarNotificacionScreen';
import { AgregarNotificacionScreen } from '../screens/AgregarNotificacionScreen';


const NotificacionesStack = createStackNavigator();


export const NotificacionesStackNavigator = () => {
    return (
        <NotificacionesStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <NotificacionesStack.Screen name="NotificacionesScreen" options={{title: "Principal Notificaciones"}} component={ NotificacionesScreen }/>
            <NotificacionesStack.Screen name="ModificarNotificacionScreen" options={{title: "Modificar Notificacion"}} component={ ModificarNotificacionScreen }/>
            <NotificacionesStack.Screen name="AgregarNotificacionScreen" options={{title: "Agregar Notificacion"}} component={ AgregarNotificacionScreen }/>
        </NotificacionesStack.Navigator>
    );
};
