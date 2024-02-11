import { useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { IncomeCard } from '../components/cards/IncomeCard';
import { useUiStore } from '../hooks';
import { useAppSelector } from '../store/hooks';
import { LoadingScreen } from './LoadingScreen';
import { IncomeBarChart } from '../components';

export const IncomesScreen = () => {
    const { changeActiveComponent } = useUiStore();
    const isFocused = useIsFocused();
    const { ingresos, isSaving } = useAppSelector( state => state.income );

    const saving = useMemo( () => isSaving, [isSaving] );

    const ingresosSorted = [...ingresos].sort((a, b) => {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });

    useEffect(() => {
        if(isFocused) changeActiveComponent('IncomesScreen');
    }, [ isFocused ]);

    if (saving) return <LoadingScreen />

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                {
                    ingresos.length > 0  ?
                        <>
                            <Text 
                                className='w-5/6 text-xl text-black mb-4 font-bold tracking-widest'
                            >
                                Últimos 6 Meses
                            </Text>

                            <IncomeBarChart 
                                data={ [...ingresos] }
                            />

                            <View className='mt-6'>
                                {
                                    ingresosSorted.map((ingreso, index) => {
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
                        </>
                    :
                    <Text
                        className='w-5/6 text-2xl text-gray mb-4 font-bold 
                        tracking-widest text-center mt-20 ml-7'
                    >
                        No hay ingresos registrados.
                    </Text>
                }

                

            </ScrollView>

            {/* <AddIncomeButton /> */}
        </View>
    );
}