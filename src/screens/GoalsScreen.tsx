import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Header } from '../components/headers/Header';
import { GoalCard } from '../components/cards/GoalCard';

export const GoalsScreen = () => {
    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                <Header title='Tus Metas' extraClass='text-2xl'/>

                <View className='mt-6'>
                    <Text className='text-black font-semibold text-sm uppercase'>Noviembre 3</Text>
                    <GoalCard 
                        title='Laptop' 
                        iconName='game-controller-outline' 
                        iconColor='bg-rose-500'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                    <GoalCard 
                        title='Celular' 
                        iconName='game-controller-outline' 
                        iconColor='bg-emerald-400'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                    <GoalCard 
                        title='Monitor' 
                        iconName='game-controller-outline' 
                        iconColor='bg-purple-600'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                    <GoalCard 
                        title='Zapatos' 
                        iconName='bag-handle-outline' 
                        iconColor='bg-indigo-600'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                </View>

            </ScrollView>
        </View>
    );
}