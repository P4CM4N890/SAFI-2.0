import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Bar } from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    id: string;
    title: string;
    iconName: string;
    iconColor: string;
    totalGoalAmount: string;
    totalGoalCompleted: string;
    progress: number;
}

export const GoalCard = ({ id, title, iconName, iconColor, totalGoalAmount, totalGoalCompleted, progress }: Props) => {
    
    const navigation = useNavigation<any>();    
    
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-2'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditGoalScreen', { goalId: id }) }
        >
            <View className='w-3/4 flex-row items-center gap-x-3'>

                <View className='items-center justify-center rounded-full h-14 w-14' style={{ backgroundColor: iconColor }}>
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <View className='w-2/3'>
                    <Text className='text-black font-bold text-lg' numberOfLines={ 1 }>{ title }</Text>
                    <Bar progress={ progress } height={ 10 } color={ iconColor } unfilledColor='#D9D9D9' borderColor='#D9D9D9'/>
                </View>
            </View>

            <View className='w-1/4 justify-around'>
                <Text className='text-right text-lg text-black font-bold'>${ totalGoalCompleted }</Text>
                <Text className='text-right text-xs'>de ${ totalGoalAmount }</Text>
            </View>
            
        </TouchableOpacity>
    );
}