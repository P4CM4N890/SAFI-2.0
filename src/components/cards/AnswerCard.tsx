import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';

interface Props {
    id: string;
    usuario: string;
    fecha: string;
    descripcion: string;
}

export const AnswerCard = ({ id, usuario, fecha, descripcion }: Props) => {
    return (
        <View className='w-full items-center bg-white rounded-xl p-2 border-2 border-slate-200 mt-4'>
            <View className='w-full flex-row justify-between'>
                <Text className='text-xs text-black font-medium'>
                    { usuario }
                </Text>
                <Text className='text-xs text-black font-medium'>
                    { format(fecha, 'dd/MM/yyyy hh:mm aaa') }
                </Text>
            </View>
            
            <View className='w-full mt-2'>
                <Text className='text-sm text-gray-800 text-justify'>
                    { descripcion }
                </Text>
            </View>
        </View>
    );
}