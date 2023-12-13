import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GoalsScreen } from '../screens/GoalsScreen';
import { AddGoalScreen } from '../screens/AddGoalScreen';

import { NotificationsStackNavigator } from '../navigation/NotificationsStackNavigator'

const GoalsStack = createStackNavigator();

export const GoalsStackNavigator = () => {
    return (
        < GoalsStack.Navigator
            initialRouteName='GoalsScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <GoalsStack.Screen name='GoalsScreen' options={{ title: 'GoalsScreen' }} component={ GoalsScreen } />
            <GoalsStack.Screen name='AddGoalScreen' options={{ title: 'AddGoalScreen' }} component={ AddGoalScreen } />
            
            <GoalsStack.Screen name='NotificationsStackNavigator' options={{ title: 'NotificationsStackNavigator' }} component={ NotificationsStackNavigator } />
        
        </GoalsStack.Navigator>
    );
}