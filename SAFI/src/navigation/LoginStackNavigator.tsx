import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { InicioSesionScreen } from '../screens/InicioSesionScreen';
import { CrearCuentaScreen } from '../screens/CrearCuentaScreen';
import { SeleccionPerfilScreen } from '../screens/SeleccionPerfilScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ConfirmarCuentaScreen } from '../screens/ConfirmarCuentaScreen';
import { NoHaySistemaScreen } from '../screens/NoHaySistemaScreen';
import { CrearPerfilScreen } from '../screens/CrearPerfilScreen';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import { RecuperarCuentaScreen } from '../screens/RecuperarCuentaScreen';

const LoginStack = createStackNavigator();

export const LoginStackNavigator = () => {

    const { status } = useContext( AuthContext );

    if( status === 'checking' ) return <LoadingScreen />

    return (
        <LoginStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                ( status !== 'authenticated') 
                ? (
                    <>
                        <LoginStack.Screen name="InicioSesionScreen" options={{title: "Login"}} component={ InicioSesionScreen }/>
                        <LoginStack.Screen name="CrearCuentaScreen" options={{title: "Crear Cuenta"}} component={ CrearCuentaScreen }/>
                        <LoginStack.Screen name="RecuperarCuentaScreen" options={{title: "Recuperar Cuenta"}} component={ RecuperarCuentaScreen }/>
                        <LoginStack.Screen name="LoadingScreen" component={ LoadingScreen }/>
                    </>
                )
                : (
                    <>
                        <LoginStack.Screen name="SeleccionPerfilScreen" options={{title: "Seleccion Perfil"}} component={ SeleccionPerfilScreen }/>
                        <LoginStack.Screen name="CrearPerfilScreen" options={{title: "Crear Perfil"}} component={ CrearPerfilScreen }/>
                        <LoginStack.Screen name="BottomTabNavigator" options={{title: "BottomTab"}} component={ BottomTabNavigator }/>
                        <LoginStack.Screen name="ConfirmarCuentaScreen" options={{title: "Confirmar Cuenta"}} component={ ConfirmarCuentaScreen }/>
                        <LoginStack.Screen name="NoHaySistemaScreen" options={{title: "No Hay Sistema"}} component={ NoHaySistemaScreen }/>
                    </>
                )
            }
        </LoginStack.Navigator>
    );
};
