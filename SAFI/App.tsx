import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { LoginStackNavigator } from './src/navigation/LoginStackNavigator';
import { SafeAreaView, StatusBar } from 'react-native';
import { styles } from './src/theme/appTheme';
import { AuthProvider } from './src/context/AuthContext';


const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        background: '#111'
    }
}

const AppState = ({ children }: any) => {
    return (
        <AuthProvider>
            { children }
        </AuthProvider>
    )
};

const App = () => {
    return (
        <SafeAreaView style={ styles.container }>
            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
            />
                <NavigationContainer theme={ theme }>
                    <AppState>
                        <LoginStackNavigator />
                    </AppState>
                </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;