import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { IncomesScreen } from '../screens/IncomesScreen';
import { AddIncomeScreen } from '../screens/AddIncomeScreen';

import { NotificationsStackNavigator } from '../navigation/NotificationsStackNavigator'

const IncomesStack = createStackNavigator();

export const IncomesStackNavigator = () => {
    return (
        < IncomesStack.Navigator
            initialRouteName='IncomesScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <IncomesStack.Screen name='IncomesScreen' options={{ title: 'IncomesScreen' }} component={ IncomesScreen } />
            <IncomesStack.Screen name='AddIncomeScreen' options={{ title: 'AddIncomeScreen' }} component={ AddIncomeScreen } />
            
            <IncomesStack.Screen name='NotificationsStackNavigator' options={{ title: 'NotificationsStackNavigator' }} component={ NotificationsStackNavigator } />
        
        </IncomesStack.Navigator>
    );
}