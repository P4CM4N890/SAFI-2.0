import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { IncomesScreen } from '../screens/IncomesScreen';
import { AddIncomeScreen } from '../screens/AddIncomeScreen';

const IncomesStack = createStackNavigator();

export const IncomesStackNavigator = () => {
    return (
        < IncomesStack.Navigator
            initialRouteName='IncomesScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <IncomesStack.Screen name='IncomesScreen' options={{ title: 'Incomes' }} component={ IncomesScreen } />
            <IncomesStack.Screen name='AddIncomeScreen' options={{ title: 'Add income' }} component={ AddIncomeScreen } />
        
        </IncomesStack.Navigator>
    );
}