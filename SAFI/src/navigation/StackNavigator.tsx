import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import { InicioSesionScreen } from '../screens/InicioSesionScreen';
import { MenuPrincipalScreen } from '../screens/MenuPrincipalScreen';
import { CrearCuentaScreen } from '../screens/CrearCuentaScreen';
import { ConfirmarCuentaScreen } from '../screens/ConfirmarCuentaScreen';
import { IngresosScreen } from '../screens/IngresosScreen';
import { IngresoCreate } from '../screens/CRUDIngresos/IngresoCreate';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: true
            }}
            initialRouteName="AhorrosCreate"  // Cambiar valor si quieres cambiar de ventana. De momento no se puede navegar mediante la interfaz  
        >
            <Stack.Screen
                name="InicioSesion"
                component={ InicioSesionScreen }
            />
            <Stack.Screen
                name="Menu"
                component={ MenuPrincipalScreen }
            />
            <Stack.Screen
                name="CrearCuenta"
                component={ CrearCuentaScreen }
            />
            <Stack.Screen
                name="ConfirmarCuenta"
                component={ ConfirmarCuentaScreen }
            />
            <Stack.Screen
                name="Ahorros"
                component={ IngresosScreen }
            />
            <Stack.Screen
                name="AhorrosCreate"
                component={ IngresoCreate }
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;