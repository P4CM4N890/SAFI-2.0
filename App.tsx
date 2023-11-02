import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';

const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        background: '#FFF'
    }
}

const App = () => {

    return (
        <SafeAreaView className='w-full h-full'>
            <StatusBar
                hidden
            />
            <NavigationContainer theme={ theme }>
                <AuthStackNavigator />
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
