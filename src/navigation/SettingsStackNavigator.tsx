import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsScreen } from '../screens/SettingsScreen';
import { ForumStackNavigator } from '../navigation/ForumStackNavigator';
import { Game } from '../components/game/Game';

const SettingsStack = createStackNavigator();

export const SettingsStackNavigator = () => {
    return (
        <SettingsStack.Navigator
            initialRouteName='SettingsScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <SettingsStack.Screen name='SettingsScreen' options={{ title: 'SettingsScreen' }} component={ SettingsScreen }/>
            <SettingsStack.Screen name='ForumStackNavigator' options={{ title: 'ForumStackNavigator' }} component={ ForumStackNavigator }/>
            <SettingsStack.Screen name='Game' options={{ title: 'Game' }} component={ Game } />

        </SettingsStack.Navigator>
    );
}