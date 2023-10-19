import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthStackNavigator } from './src/navigation/AuthStackNavigator';

function App(): JSX.Element {
    return (
        <SafeAreaView className='w-full h-full'>
            <NavigationContainer>
                <AuthStackNavigator />
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
