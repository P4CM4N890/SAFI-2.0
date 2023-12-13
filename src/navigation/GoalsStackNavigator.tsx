import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GoalsScreen } from '../screens/GoalsScreen';

const GoalsStack = createStackNavigator();

export const GoalsStackNavigator = () => {
    return (
        < GoalsStack.Navigator
            initialRouteName='GoalsScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <GoalsStack.Screen name='GoalsScreen' options={{ title: 'Goals' }} component={ GoalsScreen } />
        
        </GoalsStack.Navigator>
    );
}