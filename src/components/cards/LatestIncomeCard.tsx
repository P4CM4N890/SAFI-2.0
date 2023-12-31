import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    title: string;
    amount: number;
}

export const LatestIncomeCard = ({ title, amount }: Props) => {
    return (
        <View className='w-full h-44 items-center mt-6 rounded-xl border-2 border-slate-200 overflow-hidden bg-white'>
            <View className='w-full bg-purple py-1 mb-10'>
                <Text className='text-base text-white text-center font-bold uppercase'>Último Ingreso</Text>
            </View>

            <Text className='text-xl text-center font-bold text-primary uppercase'>{ title }</Text>
            <Text className='text-xl text-center text-black font-bold'>{ amount } mxn</Text>
        </View>
    );
}