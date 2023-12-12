import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen } from '../screens/SettingsScreen';

const SettingsStack = createStackNavigator();

export const SettingsStackNavigator = () => {
    return (
        <SettingsStack.Navigator
            initialRouteName='SettingsScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <SettingsStack.Screen name='SettingsScreen' options={{ title: 'Settings' }} component={ SettingsScreen }/>
    
        </SettingsStack.Navigator>
    );
}