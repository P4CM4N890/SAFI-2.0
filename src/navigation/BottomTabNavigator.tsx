import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { TabBarButton } from '../components/buttons/TabBarButton';
import { ActiveComponentContext } from '../context/ActiveComponentContext';

import { SettingsStackNavigator } from './SettingsStackNavigator';
import { IncomesStackNavigator } from './IncomesStackNavigator';
import { GoalsStackNavigator } from './GoalsStackNavigator';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {

    const [ showTabBar, setShowTabBar ] = useState(true);
    const { component } = useContext(ActiveComponentContext);

    useEffect(() => {
        console.log(component);
    }, [component]);

    return (
        <Tab.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false,
                // tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#4F33D8',
                tabBarInactiveTintColor: '#000',   
                tabBarShowLabel: false,

                tabBarStyle: {
                    height: 65,
                    borderTopColor: 'rgba(0, 0, 0, 0.1)',
                    borderTopWidth: 2,
                    display: showTabBar ? 'flex' : 'none'
                }
            }}
        >
            <Tab.Screen 
                name='HomeScreen' 
                component={ HomeScreen } 
                options={{ 
                    title: 'HomeScreen',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='home-outline'
                            label='Inicio'
                            // onFocus={ () => changeActiveComponent('HomeScreen') }
                        />
                    )
                }}    
            />

            <Tab.Screen 
                name='IncomesStackNavigator' 
                component={ IncomesStackNavigator }
                options={{
                    title: 'IncomesStackNavigator',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='cash-outline'
                            label='Ingresos'
                            // onFocus={ () => changeActiveComponent('IncomesStackNavigator') }
                        />
                    )
                }} 
            />

            <Tab.Screen 
                name='GoalsStackNavigator' 
                component={ GoalsStackNavigator }
                options={{
                    title: 'GoalsStackNavigator',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='flag-outline'
                            label='Metas'
                            // onFocus={ () => changeActiveComponent('GoalsStackNavigator') }
                        />
                    )
                }} 
            />

            <Tab.Screen 
                name='SettingsStackNavigator' 
                component={ SettingsStackNavigator }
                options={{
                    title: 'SettingsStackNavigator',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='settings-outline'
                            label='Ajustes'
                            // onFocus={ () => changeActiveComponent('SettingsStackNavigator') }
                        />
                    )
                }} 
            />

        </Tab.Navigator>
    );
}