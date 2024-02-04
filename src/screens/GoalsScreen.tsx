import { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Header, GoalCard, MainGoalCard, GoalsSummaryCard } from '../components';
import { useUiStore } from '../hooks';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface Slide {
    title?: string;
    startDate?: string;
    endDate?: string;
    progress?: number;
    percentage?: number;
    type: 'mainGoal' | 'GoalsSummary'
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
        percentage: 20,
        type: 'GoalsSummary'
    }
];

export const GoalsScreen = () => {

    const [ activeIndex, setActiveindex ] = useState(0);
    const { changeActiveComponent, changeBarVisibility } = useUiStore();
    
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            changeActiveComponent('GoalsStackNavigator');
            changeBarVisibility(true);
        }
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
                <GoalsSummaryCard 
                    percentage={ item.percentage }
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
                        id={ 1 }
                        title='Laptop' 
                        iconName='game-controller-outline' 
                        iconColor='#D8336A'
                        totalGoalCompleted='1000.00'
                        totalGoalAmount='2000.00'
                        progress={ 0.5 }
                    />
                    
                </View>
            </ScrollView>

            {/* <AddGoalButton /> */}
        </View>
    );
}