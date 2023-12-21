import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import { Header } from '../components/headers/Header';
import { MainGoalCard } from '../components/cards/MainGoalCard';
import { LatestIncomeCard } from '../components/cards/LatestIncomeCard';
import { AddButton } from '../components/buttons/AddButton';

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

export const HomeScreen = () => {

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
                {/* <Header title='' extraClass='text-sm'/> */}

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
            </ScrollView>

            {/* <AddButton /> */}
        </View>
    );
}