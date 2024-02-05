import { useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { IncomeCard } from '../components/cards/IncomeCard';
import { useUiStore } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startLoadingIncomes } from '../store/incomes/thunks';
import { LoadingScreen } from './LoadingScreen';

export const IncomesScreen = () => {
    const { changeActiveComponent } = useUiStore();
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const { ingresos, isSaving } = useAppSelector( state => state.income );

    const saving = useMemo( () => isSaving, [isSaving] );

    useEffect(() => {
        if(isFocused) changeActiveComponent('IncomesScreen');
    }, [ isFocused ]);

    useEffect(() => {
        dispatch( startLoadingIncomes() );
    }, []);

    if (saving) return <LoadingScreen />

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                {/* <Header title='Proyección de Ahorro'/> */}

                {/* SÓLO PARA PROBAR */}
                <Image 
                    source={ require('../assets/img/grafica.png') } 
                    className='w-full h-56 mt-8'
                    resizeMode='contain'
                /> 

                <View className='mt-6'>
                    {
                        ingresos.map((ingreso, index) => {
                            return <IncomeCard 
                                key={ index }
                                id={ ingreso.id }
                                title={ ingreso.nombre }
                                money={ ingreso.cantidad }
                                time={ ingreso.fecha }
                                iconName={ ingreso.icono }
                                iconColor={ ingreso.color }
                            />
                        })
                    }
                </View>

            </ScrollView>

            {/* <AddIncomeButton /> */}
        </View>
    );
}