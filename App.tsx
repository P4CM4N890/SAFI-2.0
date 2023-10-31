import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';

const App = () => {

    return (
        <SafeAreaView className='w-full h-full'>
            <StatusBar
                hidden
            />
            <NavigationContainer>
                <AuthStackNavigator />
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
