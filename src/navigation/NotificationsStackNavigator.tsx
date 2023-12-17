import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NotificationsScreen } from '../screens/NotificationsScreen';
import { AddNotificationScreen } from '../screens/AddNotificationScreen';
import { EditNotificationScreen } from '../screens/EditNotificationScreen';

export type NotificationsStackParams = {
    NotificationsScreen: undefined;
    AddNotificationScreen: undefined;
    EditNotificationScreen: { notificationId: number };
};

const NotificationsStack = createStackNavigator<NotificationsStackParams>();

export const  NotificationsStackNavigator = () => {
    return (
        <NotificationsStack.Navigator
            initialRouteName='NotificationsScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <NotificationsStack.Screen name='NotificationsScreen' options={{ title: 'NotificationsScreen' }} component={ NotificationsScreen } />
            <NotificationsStack.Screen name='AddNotificationScreen' options={{ title: 'AddNotificationScreen' }} component={ AddNotificationScreen } />
            <NotificationsStack.Screen name='EditNotificationScreen' options={{ title: 'EditNotificationScreen' }} component={ EditNotificationScreen } />
        
        </NotificationsStack.Navigator>
    );
}