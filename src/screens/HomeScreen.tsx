import { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useUiStore } from '../hooks';

import { startLoadingIncomes } from '../store/incomes';
import { startLoadingExpenses } from '../store/expenses';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadMainGoalSlide, loadLatestIncomeSlide } from '../store/slides';
import { getAll as getAllContributions } from '../store/contributions';

import { MainGoalCard, LatestIncomeCard, HomeLineChart, Header, TotalSavingsCard } from '../components';
import { LoadingScreen } from './LoadingScreen';
import { startLoadingAchievements, startLoadingGainedAchievements } from '../store/achievements';

const { width: screenWidth } = Dimensions.get('window');

const renderItem = (item: any) => {
    if(item.type === 'mainGoal') {
        return (
            <MainGoalCard
                title={ item.title } 
                startDate={ item.startDate } 
                endDate={ item.endDate } 
                amountAchieved={ item.amountAchieved }
                totalAmount={ item.totalAmount }
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
};

export const HomeScreen = () => {
    
    const { ingresos, isSaving: loadingIncomes } = useAppSelector( state => state.income );
    const { gastos, isSaving: loadingExpenses } = useAppSelector( state => state.expense );
    const { isSaving: loadingAchievements } = useAppSelector( state => state.achievements );

    const [ activeIndex, setActiveindex ] = useState(0);
    const { changeActiveComponent } = useUiStore();

    const { uuid } = useAppSelector( state => state.auth );
    const { mainGoalSlide, latestIncomeSlide } = useAppSelector( state => state.slides );
    const { mainGoalId } = useAppSelector( state => state.goals );
    const { isLoading: isLoadingContributions, goalsProgress } = useAppSelector( state => state.goalContributions );

    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();

    const isLoadingIncomes = useMemo(() => loadingIncomes, [ loadingIncomes ]);
    const isLoadingExpenses = useMemo(() => loadingExpenses, [ loadingExpenses ]);
    const isLoadingAchievements = useMemo(() => loadingAchievements, [ loadingAchievements ]);

    useEffect(() => {
        // obtener todos los abonos
        dispatch( getAllContributions() );
    }, []);

    useEffect(() => {
        // obtener todos los ingresos
        dispatch( startLoadingIncomes() );
    }, []);

    useEffect(() => {
        // obtener todos los gastos
        dispatch( startLoadingExpenses() );
    }, []);
    
    useEffect(() => {
        dispatch( startLoadingAchievements() );
    }, []);
    
    useEffect(() => {
        dispatch( startLoadingGainedAchievements() );
    }, []);

    useEffect(() => {
        if(isFocused) changeActiveComponent('HomeScreen');
    }, [ isFocused ]);

    useEffect(() => {
        if(!uuid) return;
        if(isLoadingContributions) return;

        dispatch( loadMainGoalSlide(uuid, goalsProgress) );
        dispatch( loadLatestIncomeSlide(uuid, ingresos[ingresos.length-1]) );

    }, [ uuid, isLoadingContributions, goalsProgress, mainGoalId ]);

    if ( isLoadingIncomes || isLoadingExpenses || isLoadingContributions || isLoadingAchievements ){
        return <LoadingScreen />;
    }

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                <View>
                    <Header title='Bienvenido a SAFI' extraClass='text-2xl'/>

                    <TotalSavingsCard ingresos={ ingresos } gastos={ gastos } />

                    <Carousel
                        data={ [ mainGoalSlide, latestIncomeSlide ] }
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
};