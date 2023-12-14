import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    numberOfAnswers: number;
    dateOrTime: string;
    iconColor: string;
    extraClass?: string;
}

export const QuestionCard = ({ iconColor, title, numberOfAnswers, dateOrTime, extraClass }: Props) => {
    return (
        <TouchableOpacity 
            className={`w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-3 ${ extraClass }`}
            activeOpacity={ 0.8 }
            onPress={() => {}}
        >
            <View className='w-14 h-14 justify-center items-center rounded-full' style={{ backgroundColor: iconColor }}>
                <Icon name='help-circle' size={ 45 } color='#FFF'/>
            </View>

            <View className='w-5/6 justify-center ml-3'>
                <Text className='text-black font-bold text-lg' numberOfLines={ 1 }>{ title }</Text>
                
                <View className='flex-row w-5/6 justify-between'>
                    <Text className='text-right text-sm'>{ numberOfAnswers } respuestas</Text>
                    <Text className='text-right text-sm'>{ dateOrTime }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}