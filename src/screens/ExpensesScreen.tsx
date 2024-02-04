import { useEffect } from "react";
import { Text, View, ScrollView } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useUiStore } from "../hooks";
import { ExpenseCard } from "../components";

export const ExpensesScreen = () => {
    const { changeActiveComponent } = useUiStore();
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) changeActiveComponent('ExpensesScreen');
    }, [ isFocused ]);

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                {/* <Header title='Proyección de Ahorro'/> */}

                <View className='mt-6'>
                    <Text className='text-black font-semibold text-sm uppercase'>Noviembre 3</Text>
                    <ExpenseCard 
                        id={ 1 }
                        title='Ahorro semanal' 
                        iconName='calendar-outline' 
                        iconColor='#33D8A2'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                    <ExpenseCard 
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
                    <ExpenseCard 
                        id={ 3 }
                        title='Ahorro semanal' 
                        iconName='calendar-outline' 
                        iconColor='#33D8A2'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                    <ExpenseCard 
                        id={ 4 }
                        title='Venta de juegos' 
                        iconName='game-controller-outline' 
                        iconColor='#75E2F8'
                        money='500.00'
                        time='12:00 p.m.'
                    />
                </View>

            </ScrollView>

            {/* <AddIncomeButton /> */}
        </View>
    )
}
