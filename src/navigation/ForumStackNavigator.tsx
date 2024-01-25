import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { QuestionScreen } from '../screens/QuestionScreen';
import { ForumScreen } from '../screens/ForumScreen';
import { YourQuestionsScreen } from '../screens/YourQuestionsScreen';

export type ForumStackParams = {
    ForumScreen: undefined;
    QuestionScreen: { questionId: string };
};

const ForumStack = createStackNavigator<ForumStackParams>();

export const ForumStackNavigator = () => {
    return (
        <ForumStack.Navigator
            initialRouteName='ForumScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            
            <ForumStack.Screen name='ForumScreen' options={{ title: 'ForumScreen' }} component={ ForumScreen } />
            <ForumStack.Screen name='QuestionScreen' options={{ title: 'QuestionScreen' }} component={ QuestionScreen } />
            <ForumStack.Screen name='YourQuestionsScreen' options={{ title: 'YourQuestionsScreen' }} component={ YourQuestionsScreen } />
            
        </ForumStack.Navigator>
    );
}