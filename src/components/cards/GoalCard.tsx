import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    iconName: string;
    iconColor: string;
    totalGoalAmount: string;
    totalGoalCompleted: string;
}

export const GoalCard = ({ title, iconName, iconColor, totalGoalAmount, totalGoalCompleted }: Props) => {
    return (
        <View className='w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-2'>
            <View className='w-3/4 flex-row items-center gap-x-3'>

                <View className={`items-center justify-center rounded-full h-14 w-14 ${ iconColor }`}>
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <Text className='text-black font-bold text-lg'>{ title }</Text>
            </View>

            <View className='w-1/4 justify-around'>
                <Text className='text-right text-lg text-black font-bold'>${ totalGoalCompleted }</Text>
                <Text className='text-right text-xs'>de ${ totalGoalAmount }</Text>
            </View>
            
        </View>
    );
}