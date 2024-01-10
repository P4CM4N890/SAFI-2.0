import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, Image } from 'react-native';

import { MainGoalCard } from '../components/cards/MainGoalCard';
import { LatestIncomeCard } from '../components/cards/LatestIncomeCard';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useIsFocused } from '@react-navigation/native';
import { ActiveComponentContext } from '../context/ActiveComponentContext';
import { Header } from '../components/headers/Header';

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
    const { changeActiveComponent } = useContext(ActiveComponentContext);
    
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) changeActiveComponent('HomeScreen');
    }, [ isFocused ]);

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
                className='w-full h-30' 
                showsVerticalScrollIndicator={ false }
            >
                <Header title='Bienvenido' extraClass='text-sm'/>

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

            <Image 
                source={ require('../assets/img/grafica2.png') } 
                className='w-full h-80'
                resizeMode='contain'
            /> 

            {/* <AddButton /> */}
        </View>
    );
}