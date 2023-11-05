import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    iconName: string;
    iconColor: string;
    money: string;
    time: string;
}

export const IncomeCard = ({ title, iconName, iconColor, money, time }: Props) => {
    return (
        <View className='w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-2'>
            <View className='w-3/4 flex-row items-center gap-x-3'>

                <View className='items-center justify-center rounded-full h-14 w-14' style={{ backgroundColor: iconColor }}>
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <Text className='text-black font-bold text-lg'>{ title }</Text>
            </View>

            <View className='w-1/4 justify-around'>
                <Text className='text-right text-lg font-bold text-emerald-500'>${ money }</Text>
                <Text className='text-right text-sm'>{ time }</Text>
            </View>
            
        </View>
    );
}