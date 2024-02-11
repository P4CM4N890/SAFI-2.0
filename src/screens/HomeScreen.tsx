import { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startLoadingIncomes } from '../store/incomes';
import { startLoadingExpenses } from '../store/expenses';
import { startLoadingSlides } from '../store/slides';

import { useUiStore } from '../hooks';

import { MainGoalCard, LatestIncomeCard, HomeLineChart } from '../components';
import { LoadingScreen } from './LoadingScreen';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const HomeScreen = () => {
    
    const { ingresos, isSaving: loadingIncomes } = useAppSelector( state => state.income );
    const { gastos, isSaving: loadingExpenses } = useAppSelector( state => state.expense );

    const [ activeIndex, setActiveindex ] = useState(0);
    
    const { changeActiveComponent } = useUiStore();
    const { uuid } = useAppSelector( state => state.auth );
    const { homeSlides } = useAppSelector( state => state.slides );

    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    
    const isLoadingIncomes = useMemo(() => loadingIncomes, [ loadingIncomes ]);
    const isLoadingExpenses = useMemo(() => loadingExpenses, [ loadingExpenses ]);

    useEffect(() => {
        if(isFocused) changeActiveComponent('HomeScreen');
    }, [ isFocused ]);

    useEffect(() => {
        if(!uuid) return;
        dispatch( startLoadingSlides(uuid) );
    }, [ uuid ]);

    useEffect(() => {
        dispatch( startLoadingIncomes() );
    }, []);

    useEffect(() => {
        dispatch( startLoadingExpenses() );
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
                <LatestIncomeCard 
                    title={ item.title }
                    amount={ item.incomeAmount }
                    found={ item.found }
                />
            )
        }
    }

    if ( isLoadingIncomes || isLoadingExpenses ) return <LoadingScreen />;

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                <View>
                    <Carousel
                        data={ homeSlides }
                        renderItem={({ item }: any) => renderItem(item)}
                        sliderWidth={ screenWidth * 0.90 }
                        itemWidth={ screenWidth * 0.90 }
                        layout='default'
                        onSnapToItem={(index) => setActiveindex(index)}
                    />
                    <Pagination 
                        dotsLength={ homeSlides.length }
                        activeDotIndex={ activeIndex }
                    />
                </View>

                {
                    ingresos.length === 0 || gastos.length === 0 
                    ?
                        null
                    :
                        <HomeLineChart 
                            ingresos={ [...ingresos] }
                            gastos={ [...gastos] }
                        />
                }
            </ScrollView>
        </View>
    );
}