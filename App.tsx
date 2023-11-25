import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';
import { AuthProvider } from './src/context/AuthContext';

const AppState = ({ children }: any) => {
    return (
        <AuthProvider>
            { children }
        </AuthProvider>
    )
};

const App = () => {

    return (
        <SafeAreaView className='w-full h-full'>
            <StatusBar
                hidden
            />
            <NavigationContainer>
                <AppState>
                    <AuthStackNavigator />
                </AppState>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
