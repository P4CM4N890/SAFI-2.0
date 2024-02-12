import { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, ActivityIndicator, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { getAll } from '../store/goals/thunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { useUiStore } from '../hooks';
import { Header, GoalCard, MainGoalCard, GoalsSummaryCard } from '../components';

const { width: screenWidth } = Dimensions.get('window');

export const GoalsScreen = () => {

    const [ activeIndex, setActiveindex ] = useState(0);
    const { changeActiveComponent, changeBarVisibility } = useUiStore();
    
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();

    const { mainGoalSlide, goalsSummarySlide } = useAppSelector( state => state.slides );
    const { goals, isLoading } = useAppSelector( state => state.goals );

    useEffect(() => {
        if(isFocused) {
            changeActiveComponent('GoalsStackNavigator');
            changeBarVisibility(true);
        }
    }, [ isFocused ]);

    useEffect(() => {
        dispatch( getAll() );
    }, []);

    const renderItem = (item: any) => {
        if(item.type === 'mainGoal') {
            return (
                <MainGoalCard 
                    title={ item.title } 
                    startDate={ item.startDate } 
                    endDate={ item.endDate } 
                    progress={ item.progress }
                    found={ item.found }
                />
            )

        } else {
            return (
                <GoalsSummaryCard 
                    percentage={ item.percentage }
                    found={ item.found }
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
                        data={ [ mainGoalSlide, goalsSummarySlide ] }
                        renderItem={({ item }: any) => renderItem(item)}
                        sliderWidth={ screenWidth * 0.90 }
                        itemWidth={ screenWidth * 0.90 }
                        layout='default'
                        onSnapToItem={(index) => setActiveindex(index)}
                    />

                    <Pagination 
                        dotsLength={ 2 }
                        activeDotIndex={ activeIndex }
                    />
                </View>

                <View className='-mt-4'>
                    {   isLoading 
                        ? 
                            <>
                                <ActivityIndicator size={ 30 } color='#000' className='mt-24' /> 
                                <Text className='text-center mt-3 font-medium text-zinc-500'>
                                    Cargando metas...
                                </Text>
                            </>

                        : (!isLoading && goals.length > 0) 
                            ?   goals.map( goal => (
                                    <GoalCard 
                                        key={ goal.id }
                                        goal={ goal }
                                        totalGoalCompleted='1000.00'
                                        progress={ 0.5 }
                                    />
                                ))
                            :   <>
                                    <Text className='text-center font-medium text-xl text-zinc-500 mt-24'>
                                        No Hay Metas Registradas 
                                    </Text>
                                    <Text className='text-center font-medium text-base text-zinc-500 mt-3'>
                                        Cuando registre metas podrá verlas aquí
                                    </Text>
                                </>
                        }
                </View>
            </ScrollView>
        </View>
    );
}