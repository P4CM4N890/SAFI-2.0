import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NotificationsStackNavigator } from '../navigation/NotificationsStackNavigator'

import { GoalsScreen } from '../screens/GoalsScreen';
import { AddGoalScreen } from '../screens/AddGoalScreen';
import { EditGoalScreen } from '../screens/EditGoalScreen';
import { GoalContributionsScreen } from '../screens/GoalContributionsScreen';

import { MetaResponse } from '../interfaces/ApiInterfaces';

export type GoalsStackParams = {
    GoalsScreen: undefined;
    AddGoalScreen: undefined;
    EditGoalScreen: { goal: MetaResponse };
    NotificationsStackNavigator: undefined;
    GoalContributionsScreen: { goal: MetaResponse };
};

const GoalsStack = createStackNavigator<GoalsStackParams>();

export const GoalsStackNavigator = () => {
    return (
        <GoalsStack.Navigator
            initialRouteName='GoalsScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <GoalsStack.Screen
                name='GoalsScreen' 
                options={{ title: 'GoalsScreen' }} 
                component={ GoalsScreen } 
            />
            <GoalsStack.Screen
                name='AddGoalScreen' 
                options={{ title: 'AddGoalScreen' }} 
                component={ AddGoalScreen } 
            />
            <GoalsStack.Screen
                name='EditGoalScreen' 
                options={{ title: 'EditGoalScreen' }} 
                component={ EditGoalScreen } 
            />
            <GoalsStack.Screen
                name='GoalContributionsScreen' 
                options={{ title: 'GoalContributionsScreen' }} 
                component={ GoalContributionsScreen } 
            />
            <GoalsStack.Screen
                name='NotificationsStackNavigator' 
                options={{ title: 'NotificationsStackNavigator' }} 
                component={ NotificationsStackNavigator } 
            />
        </GoalsStack.Navigator>
    );
}