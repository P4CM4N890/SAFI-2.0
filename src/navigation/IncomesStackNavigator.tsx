import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { IncomesScreen } from '../screens/IncomesScreen';
import { AddIncomeScreen } from '../screens/AddIncomeScreen';

const NotificationsStack = createStackNavigator();

export const IncomesStackNavigator = () => {
    return (
        < NotificationsStack.Navigator
            initialRouteName='IncomesScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <NotificationsStack.Screen name='IncomesScreen' options={{ title: 'Incomes' }} component={ IncomesScreen } />
            <NotificationsStack.Screen name='AddIncomeScreen' options={{ title: 'Add income' }} component={ AddIncomeScreen } />
        
        </NotificationsStack.Navigator>
    );
}