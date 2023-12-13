import React from 'react';
import { View, Text } from 'react-native';

import { AddButton } from '../components/buttons/AddButton';

export const AddIncomeScreen = () => {
    return (
        <View className='w-full h-full justify-center items-center'>
            <Text>AddIncomeScreen</Text>
            <AddButton />
        </View>
    );
}