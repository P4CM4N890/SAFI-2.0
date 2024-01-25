import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';
import { store } from './src/store';

const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        background: '#FCFCFC'
    }
}

const App = () => {

    return (
        <SafeAreaView className='w-full h-full'>
            <StatusBar
                hidden
            />
            <NavigationContainer theme={ theme }>
                <Provider store={ store }>
                    <AuthStackNavigator />
                </Provider>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
