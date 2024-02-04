import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AddIncomeScreen } from '../screens/AddIncomeScreen';
import { EditIncomeScreen } from '../screens/EditIncomeScreen';

import { NotificationsStackNavigator } from '../navigation/NotificationsStackNavigator'
import { WalletTopTabNavigator } from './WalletTopTabNavigator';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';

export type IncomesStackParams = {
    IncomesScreen: undefined;
    AddIncomeScreen: undefined;
    EditIncomeScreen: { incomeId: number };
    WalletTopTabNavigator: undefined;
    NotificationsStackNavigator: undefined;
    AddExpenseScreen: undefined;
};

const IncomesStack = createStackNavigator<IncomesStackParams>();

export const IncomesStackNavigator = () => {
    return (
        <IncomesStack.Navigator
            initialRouteName='WalletTopTabNavigator'
            screenOptions={{
                headerShown: false
            }}
        >
            <IncomesStack.Screen name='WalletTopTabNavigator' options={{ title: 'WalletTopTabNavigator'}} component={ WalletTopTabNavigator }/>

            <IncomesStack.Screen name='AddIncomeScreen' options={{ title: 'AddIncomeScreen' }} component={ AddIncomeScreen } />
            <IncomesStack.Screen name='EditIncomeScreen' options={{ title: 'EditIncomeScreen' }} component={ EditIncomeScreen } />
            <IncomesStack.Screen name='AddExpenseScreen' options={{ title: 'AddExpenseScreen' }} component={ AddExpenseScreen } />
            
            <IncomesStack.Screen name='NotificationsStackNavigator' options={{ title: 'NotificationsStackNavigator' }} component={ NotificationsStackNavigator } />
        
        </IncomesStack.Navigator>
    );
}