import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ActiveComponentProvider } from './src/context/ActiveComponentContext';

const AppState = ({ children }: any) => {
    return (
        <AuthProvider>
            <ActiveComponentProvider>
                { children }
            </ActiveComponentProvider>
        </AuthProvider>
    )
};

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
                <AppState>
                    <AuthStackNavigator />
                </AppState>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
