import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Bar } from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

import { MetaResponse } from '../../interfaces/ApiInterfaces';

interface Props {
    goal: MetaResponse;
    totalGoalCompleted: number;
    progress: number;
}

export const GoalCard = ({ goal, totalGoalCompleted, progress }: Props) => {
    
    const navigation = useNavigation<any>();    
    const { nombre, cantidad, icono, color } = goal;
    
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center justify-between bg-white rounded-2xl p-2 border-2 border-slate-200 mt-2'
            activeOpacity={ 0.8 }
            onPress={ () => {
                progress >= 1
                ?
                    null
                :
                    navigation.navigate('EditGoalScreen', { goal })
            } }
        >
            <View className='w-3/5 flex-row items-center gap-x-2'>

                <View className='items-center justify-center rounded-full h-14 w-14' style={{ backgroundColor: color }}>
                    <Icon 
                        name={ icono }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <View className='w-2/3'>
                    <Text className='text-black font-bold text-lg' numberOfLines={ 1 }>
                        { nombre }
                    </Text>
                    {
                        progress >= 1 
                        ? 
                            <Text className='text-xs text-green font-semibold'>¡Meta cumplida!</Text>
                        :
                            <Bar 
                                progress={ progress } 
                                height={ 10 } 
                                color={ color } 
                                style={{ width: '90%' }} 
                                unfilledColor='#D9D9D9' 
                                borderColor='#D9D9D9'
                            />
                    }
                </View>
            </View>

            <View className='w-1/4 justify-around'>
                <Text className='text-right text-base text-black font-bold'>
                    ${ totalGoalCompleted.toFixed(2) }
                </Text>
                <Text className='text-right text-xs'>de ${ cantidad.toFixed(2) }</Text>
            </View>

            <TouchableOpacity
                activeOpacity={ 0.7 }
                onPress={ () => navigation.navigate('GoalContributionsScreen', { goal }) }
                disabled={ progress >= 1 }
                className={`${ progress >= 1 ? 'hidden' : 'flex' }`}
            >
                <Icon 
                    name='add-circle-outline' 
                    size={ 40 }
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};