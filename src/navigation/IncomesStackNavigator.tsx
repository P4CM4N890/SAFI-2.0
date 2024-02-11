import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AddIncomeScreen } from '../screens/AddIncomeScreen';
import { EditIncomeScreen } from '../screens/EditIncomeScreen';

import { NotificationsStackNavigator } from '../navigation/NotificationsStackNavigator'
import { WalletTopTabNavigator } from './WalletTopTabNavigator';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { EditExpenseScreen } from '../screens/EditExpenseScreen';

export type IncomesStackParams = {
    IncomesScreen: undefined;
    AddIncomeScreen: undefined;
    EditIncomeScreen: { incomeId: string };
    WalletTopTabNavigator: undefined;
    NotificationsStackNavigator: undefined;
    ExpensesScreen: undefined;
    AddExpenseScreen: undefined;
    EditExpenseScreen: { expenseId: string };
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
            <IncomesStack.Screen name='EditExpenseScreen' options={{ title: 'EditExpenseScreen' }} component={ EditExpenseScreen } />
            
            <IncomesStack.Screen name='NotificationsStackNavigator' options={{ title: 'NotificationsStackNavigator' }} component={ NotificationsStackNavigator } />
        
        </IncomesStack.Navigator>
    );
}