import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import { Header } from '../components/headers/Header';
import { IncomeCard } from '../components/cards/IncomeCard';
import { AddIncomeButton } from '../components/buttons/AddIncomeButton';

export const IncomesScreen = () => {
    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                <Header title='Proyección de Ahorro'/>

                {/* SÓLO PARA PROBAR */}
                <Image 
                    source={ require('../assets/img/grafica.png') } 
                    className='w-full h-56 mt-8'
                    resizeMode='contain'
                /> 

                <View className='mt-6'>
                    <Text className='text-black font-semibold text-sm uppercase'>Noviembre 3</Text>
                    <IncomeCard 
                        id={ 1 }
                        title='Ahorro semanal' 
                        iconName='calendar-outline' 
                        iconColor='#33D8A2'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                    <IncomeCard 
                        id={ 2 }
                        title='Venta de juegos' 
                        iconName='game-controller-outline' 
                        iconColor='#75E2F8'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                </View>

                <View className='mt-6'>
                    <Text className='text-black font-semibold text-sm uppercase'>Noviembre 1</Text>
                    <IncomeCard 
                        id={ 3 }
                        title='Ahorro semanal' 
                        iconName='calendar-outline' 
                        iconColor='#33D8A2'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                    <IncomeCard 
                        id={ 4 }
                        title='Venta de juegos' 
                        iconName='game-controller-outline' 
                        iconColor='#75E2F8'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                </View>

            </ScrollView>

            <AddIncomeButton />
        </View>
    );
}