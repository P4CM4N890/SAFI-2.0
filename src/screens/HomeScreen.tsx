import React from 'react';
import { View, Text } from 'react-native';

import { AddButton } from '../components/buttons/AddButton';

export const HomeScreen = () => {
    return (
        <View className='w-full h-full flex justify-center items-center'>
            <Text>HomeScreen</Text>
            <AddButton />
        </View>
    );
}