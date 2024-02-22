import React from 'react';
import { View, Text } from 'react-native';
import { Bar } from 'react-native-progress';

interface Props {
    title: string;
    startDate: string;
    endDate: string;
    amountAchieved: number;
    totalAmount: number;
    found: boolean;
};

export const MainGoalCard = ({ title, startDate, endDate, amountAchieved, totalAmount, found }: Props) => {
    return (
        <View className='w-full h-44 items-center mt-6 rounded-xl border-2 border-slate-200 overflow-hidden bg-white'>
            <View className='w-full bg-rose-600 py-1'>
                <Text className='text-base text-white text-center font-bold uppercase'>Meta Establecida</Text>
            </View>

            {
                found
                ?   
                    <>                
                        <Text className='text-xl text-center font-bold text-primary uppercase my-2'>
                            { title }
                        </Text>

                        <View className='w-full items-baseline flex-row justify-between px-14'>
                            <Text className='text-sm font-medium uppercase'>Inicio:</Text>
                            <Text className='text-sm font-medium uppercase'>{ startDate }</Text>
                        </View>
                        <View className='w-full items-baseline flex-row justify-between px-14'>
                            <Text className='text-sm font-medium uppercase'>Fin:</Text>
                            <Text className='text-sm font-medium uppercase'>{ endDate }</Text>
                        </View>
            
                        <Text className='text-sm text-black font-normal uppercase mt-2'>
                            ${ amountAchieved } / ${ totalAmount }
                        </Text>

                        <Bar 
                            progress={ amountAchieved / totalAmount } 
                            height={ 10 } 
                            color='#60D833' 
                            unfilledColor='#D9D9D9' 
                            borderColor='#D9D9D9'
                            className='mb-2'
                        />
                    </>
                :         
                    <View className='flex justify-end mt-8'>
                        <Text className='text-lg text-center font-bold text-primary uppercase'>
                            No Hay Una Meta Establecida
                        </Text>
                        <Text className='text-base text-center font-bold text-black'>
                            Puede fijar una meta al crear o editar una
                        </Text>
                    </View>      
            }

        </View>
    );
}