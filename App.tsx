import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';

const theme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        background: '#111'
    }
}

function App(): JSX.Element {
    return (
        <SafeAreaView>
            <NavigationContainer theme={ theme }>
                <AuthStackNavigator />
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
