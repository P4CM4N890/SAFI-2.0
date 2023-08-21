import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IngresosScreen } from '../screens/IngresosScreen';
import { IngresoCreate } from '../screens/CRUDIngresos/IngresoCreate';
import { IngresoIndex } from '../screens/CRUDIngresos/IngresoIndex';
import { IngresoEdit } from '../screens/CRUDIngresos/IngresoEdit';

const IngresosStack = createStackNavigator();

export const IngresosStackNavigator = () => {
    return (
        <IngresosStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <IngresosStack.Screen name="IngresosScreen" options={{title: "Ingresos General"}} component={ IngresosScreen }/>
            <IngresosStack.Screen name="IngresoCreate" options={{title: "Ingresos Create"}} component={ IngresoCreate }/>
            <IngresosStack.Screen name="IngresoIndex" options={{title: "Ingresos Index"}} component={ IngresoIndex }/>
            <IngresosStack.Screen name="IngresoEditar" options={{title: "Ingresos Editar"}} component={ IngresoEdit }/>
        </IngresosStack.Navigator>
    );
};
