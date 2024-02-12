import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    title: string;
    amount: number;
    found: boolean;
};

export const LatestIncomeCard = ({ title, amount, found }: Props) => {
    return (
        <View className='w-full h-44 items-center mt-6 rounded-xl border-2 border-slate-200 overflow-hidden bg-white'>
            <View className='w-full bg-purple py-1'>
                <Text className='text-base text-white text-center font-bold uppercase'>Último Ingreso</Text>
            </View>
            
            {
                found
                ?
                    <View className='mt-9'>
                        <Text className='text-xl text-center font-bold text-primary uppercase'>{ title }</Text>
                        <Text className='text-xl text-center text-black font-bold'>{ amount } MXN</Text>
                    </View>
                :   <View className='mt-7'>
                        <Text className='text-lg text-center font-bold text-primary uppercase'>No tiene ingresos registrados</Text>
                        <Text className='text-base text-center text-black font-bold'>Puede registrar ingresos en la sección cartera</Text>
                    </View>
            }
        </View>
    );
}