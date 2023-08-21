import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MenuPrincipalScreen } from '../screens/MenuPrincipalScreen';
import { colores, iconSize } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { IngresosStackNavigator } from './IngresosStackNavigator';
import { MetasStackNavigator } from './MetasStackNavigator';
import { ConfiguracionStackNavigator } from './ConfiguracionStackNavigator';
import { NotificacionesStackNavigator } from './NotificacionesStackNavigator';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const BottomTabAndroid = createMaterialBottomTabNavigator();

const myNavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      notification: 'rgba(255, 255, 255, 0.5)',
      secondaryContainer: 'transparent',
    },
};

export const BottomTabNavigator = () => {
    return (
        <PaperProvider theme={myNavigationTheme}>
            <BottomTabAndroid.Navigator
                sceneAnimationEnabled
                initialRouteName='MenuPrincipalScreen'
                activeColor={ colores.tabsActiveColor }
                inactiveColor={ colores.tabsInactiveColor }
                barStyle={{
                    backgroundColor: colores.footer,
                }}
                screenOptions={ ({ route }) => ({
                    tabBarActiveTintColor: colores.primary,
                    tabBarStyle:{
                        borderTopColor: colores.primary,
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: 15,
                        fontFamily: 'Roboto-Regular'
                    },
                    tabBarIcon: ({ color, focused }) => {
                        let iconName: string = '';

                        // Usamos un switch para evaluar desde que ruta se solicita el icono.
                        switch( route.name ) {
                            case 'MenuPrincipalScreen':
                                iconName = focused ? "home" : "home-outline";
                                break;
                            case 'ConfiguracionStackNavigator':
                                iconName = focused ? "settings" : 'settings-outline';
                                break;
                            case 'NotificacionesStackNavigator':
                                iconName = focused ? "notifications" : 'notifications-outline';
                                break;
                            case 'IngresosStackNavigator':
                                iconName = focused ? "cash" : 'cash-outline';
                                break;
                            case 'MetasStackNavigator':
                                iconName = focused ? "flag" : 'flag-outline';
                                break;
                        }

                        return <Icon name={ iconName } size={ iconSize.small } color={ color } />
                    },
                }) }
            >
                <BottomTabAndroid.Screen name="NotificacionesStackNavigator" options={{title: "Notificaciones"}} component={ NotificacionesStackNavigator } />
                <BottomTabAndroid.Screen name="IngresosStackNavigator" options={{title: "Ingresos"}} component={ IngresosStackNavigator } />
                <BottomTabAndroid.Screen name="MenuPrincipalScreen" options={{title: "Principal"}} component={ MenuPrincipalScreen } />
                <BottomTabAndroid.Screen name="MetasStackNavigator" options={{title: "Metas"}} component={ MetasStackNavigator } />
                <BottomTabAndroid.Screen name="ConfiguracionStackNavigator" options={{title: "Ajustes"}} component={ ConfiguracionStackNavigator } />
            </BottomTabAndroid.Navigator>
        </PaperProvider>
    );
};
