import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { IncomesScreen } from '../screens/IncomesScreen';
import { AddIncomeScreen } from '../screens/AddIncomeScreen';
import { EditIncomeScreen } from '../screens/EditIncomeScreen';

import { NotificationsStackNavigator } from '../navigation/NotificationsStackNavigator'

export type IncomesStackParams = {
    IncomesScreen: undefined;
    AddIncomeScreen: undefined;
    EditIncomeScreen: { incomeId: number };
    NotificationsStackNavigator: undefined;
};

const IncomesStack = createStackNavigator<IncomesStackParams>();

export const IncomesStackNavigator = () => {
    return (
        <IncomesStack.Navigator
            initialRouteName='IncomesScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <IncomesStack.Screen name='IncomesScreen' options={{ title: 'IncomesScreen' }} component={ IncomesScreen } />
            <IncomesStack.Screen name='AddIncomeScreen' options={{ title: 'AddIncomeScreen' }} component={ AddIncomeScreen } />
            <IncomesStack.Screen name='EditIncomeScreen' options={{ title: 'EditIncomeScreen' }} component={ EditIncomeScreen } />
            
            <IncomesStack.Screen name='NotificationsStackNavigator' options={{ title: 'NotificationsStackNavigator' }} component={ NotificationsStackNavigator } />
        
        </IncomesStack.Navigator>
    );
}