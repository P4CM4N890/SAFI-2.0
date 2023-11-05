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
                    <GoalCard 
                        title='Laptop' 
                        iconName='game-controller-outline' 
                        iconColor='#D8336A'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                    <GoalCard 
                        title='Celular' 
                        iconName='game-controller-outline' 
                        iconColor='#33D8A2'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                    <GoalCard 
                        title='Monitor' 
                        iconName='game-controller-outline' 
                        iconColor='#A233D8'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                    <GoalCard 
                        title='Zapatos' 
                        iconName='bag-handle-outline' 
                        iconColor='#75E2F8'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                    />
                </View>

            </ScrollView>
        </View>
    );
}