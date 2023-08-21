import React, { useCallback } from 'react';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { ConfiguracionScreen } from '../screens/ConfiguracionScreen';
import { EditarConsejosScreen } from '../screens/ConfiguracionScreens/EditarConsejosScreen';
import { EditarPerfilScreen } from '../screens/ConfiguracionScreens/EditarPerfilScreen';
import { MiCuentaScreen } from '../screens/ConfiguracionScreens/MiCuentaScreen';
import { AvisoPrivacidadScreen } from '../screens/ConfiguracionScreens/AvisoPrivacidadScreen';
import { FAQScreen } from '../screens/ConfiguracionScreens/FAQScreen';
import { LoginSimplificadoScreen } from '../screens/LoginSimplificadoScreen';
import { useFocusEffect } from '@react-navigation/native';
import { ModificarCuentaScreen } from '../screens/ConfiguracionScreens/ModificarCuentaScreen';

export type RootStackParams = {
    ConfiguracionScreen: undefined;
    EditarConsejosScreen: undefined;
    MiCuentaScreen: undefined;
    AvisoPrivacidadScreen: undefined;
    FAQScreen: undefined;
    LoginSimplificadoScreen: undefined;
    ModificarCuentaScreen: undefined;
    EditarPerfilScreen: { id: number, username: string, ahorro: number, ruta_imagen: string };
}

const ConfiguracionStack = createStackNavigator<RootStackParams>();

interface Props extends StackScreenProps<any, any> {};

export const ConfiguracionStackNavigator = ({ navigation }: Props) => {
    useFocusEffect(
        useCallback( () => {
            navigation.navigate("LoginSimplificadoScreen");
            // console.log("Aqui");
        }, [])
    );

    return (
        <ConfiguracionStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='LoginSimplificadoScreen'
            >
            <ConfiguracionStack.Screen name="ConfiguracionScreen" component={ ConfiguracionScreen }/>
            <ConfiguracionStack.Screen name="EditarConsejosScreen" component={ EditarConsejosScreen }/>
            <ConfiguracionStack.Screen name="MiCuentaScreen" component={ MiCuentaScreen }/>
            <ConfiguracionStack.Screen name="LoginSimplificadoScreen" component={ LoginSimplificadoScreen }/>
            <ConfiguracionStack.Screen name="AvisoPrivacidadScreen" component={ AvisoPrivacidadScreen }/>
            <ConfiguracionStack.Screen name="FAQScreen" component={ FAQScreen }/>
            <ConfiguracionStack.Screen name="EditarPerfilScreen" component={ EditarPerfilScreen }/>
            <ConfiguracionStack.Screen name="ModificarCuentaScreen" component={ ModificarCuentaScreen }/>
        </ConfiguracionStack.Navigator>
    );
};
