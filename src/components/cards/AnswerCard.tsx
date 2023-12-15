import React from 'react';
import { View, Text } from 'react-native';

export const AnswerCard = () => {
    return (
        <View className='w-full items-center bg-white rounded-xl p-2 border-2 border-slate-200 mt-4'>
            <View className='w-full flex-row justify-between'>
                <Text className='text-xs text-gray-800'>Usuario</Text>
                <Text className='text-xs text-gray-800'>Fecha</Text>
            </View>
            
            <View className='w-full mt-2'>
                <Text className='text-sm text-gray-800 text-justify'>Lorem ipsum dolor, sit ame adipisicing elit. Cumque, laborum dolores djcnkos nemo doloremque.</Text>
            </View>
        </View>
    );
}