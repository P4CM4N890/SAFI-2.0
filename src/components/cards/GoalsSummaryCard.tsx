import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    percentage: number;
    found: boolean;
};

export const GoalsSummaryCard = ({ percentage, found }: Props) => {
    return (
        <View className='w-full h-44 items-center mt-6 rounded-xl border-2 border-slate-200 overflow-hidden bg-white'>
            <View className='w-full bg-purple py-1'>
                <Text className='text-base text-white text-center font-bold uppercase'>
                    Resumen de Metas
                </Text>
            </View>

            {
                found
                ?   
                    <View className='mt-10'>
                        <Text className='text-xl text-center text-primary font-bold'>
                            Progreso de tus metas
                        </Text>
                        <Text className='text-xl text-center text-black font-bold'>
                            { percentage.toFixed(2) }%
                        </Text>
                    </View>

                :   <View className='mt-7 px-2'>
                        <Text className='text-lg text-center font-bold text-primary uppercase'>
                            No tiene metas registradas
                        </Text>
                        <Text className='text-base text-center text-black font-bold'>
                            Registre metas para ver un resumen de su progreso
                        </Text>
                    </View>
            }

        </View>
    );
};