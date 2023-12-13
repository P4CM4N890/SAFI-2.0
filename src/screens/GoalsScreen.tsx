import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import { Header } from '../components/headers/Header';
import { GoalCard } from '../components/cards/GoalCard';
import { MainGoalCard } from '../components/cards/MainGoalCard';
import { LatestIncomeCard } from '../components/cards/LatestIncomeCard';
import { AddGoalButton } from '../components/buttons/AddGoalButton';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface Slide {
    title: string;
    startDate?: string;
    endDate?: string;
    progress?: number;
    incomeAmount?: number;
    type: 'mainGoal' | 'latestIncome'
}

const cards: Slide[] = [
    {
        title: 'Laptop Asus',
        startDate: '12/Octubre/2023',
        endDate: '12/Diciembre/2023',
        progress: 0.5,
        type: 'mainGoal'
    },
    {
        title: 'Abono a laptop',
        incomeAmount: 5000,
        type: 'latestIncome'
    }
];

export const GoalsScreen = () => {

    const [ activeIndex, setActiveindex ] = useState(0);

    const renderItem = (item: any) => {
        if(item.type === 'mainGoal') {
            return (
                <MainGoalCard 
                    title={ item.title } 
                    startDate={ item.startDate } 
                    endDate={ item.endDate } 
                    progress={ item.progress }
                />
            )

        } else {
            return (
                <LatestIncomeCard 
                    title={ item.title }
                    amount={ item.incomeAmount }
                />
            )
        }
    }

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                <Header title='Tus Metas' extraClass='text-2xl'/>

                <View>
                    <Carousel 
                        data={ cards }
                        renderItem={({ item }: any) => renderItem(item)}
                        sliderWidth={ screenWidth * 0.90 }
                        itemWidth={ screenWidth * 0.90 }
                        layout='default'
                        onSnapToItem={(index) => setActiveindex(index)}
                    />

                    <Pagination 
                        dotsLength={ cards.length }
                        activeDotIndex={ activeIndex }
                    />
                </View>

                <View className='-mt-4'>
                    <GoalCard 
                        title='Laptop' 
                        iconName='game-controller-outline' 
                        iconColor='#D8336A'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                    <GoalCard 
                        title='Celular' 
                        iconName='game-controller-outline' 
                        iconColor='#33D8A2'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                    <GoalCard 
                        title='Monitor' 
                        iconName='game-controller-outline' 
                        iconColor='#A233D8'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                    <GoalCard 
                        title='Zapatos' 
                        iconName='bag-handle-outline' 
                        iconColor='#75E2F8'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                    <GoalCard 
                        title='Camisa' 
                        iconName='bag-handle-outline' 
                        iconColor='#D8336A'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                    <GoalCard 
                        title='Sombrero' 
                        iconName='bag-handle-outline' 
                        iconColor='#33D8A2'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                </View>
            </ScrollView>

            <AddGoalButton />
        </View>
    );
}