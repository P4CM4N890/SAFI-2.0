import { useEffect, useMemo } from "react";
import { View, ScrollView } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useUiStore } from "../hooks";
import { ExpenseBarChart, ExpenseCard } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingScreen } from "./LoadingScreen";
import { startLoadingCategories } from "../store/other";
import { Text } from "react-native";

export const ExpensesScreen = () => {
    const dispatch = useAppDispatch();
    const { changeActiveComponent } = useUiStore();
    const { gastos, isSaving } = useAppSelector( state => state.expense );

    const isFocused = useIsFocused();
    const saving = useMemo( () => isSaving, [isSaving] );

    useEffect(() => {
        if(isFocused) changeActiveComponent('ExpensesScreen');
    }, [ isFocused ]);
    
    useEffect(() => {
        dispatch( startLoadingCategories() );
    }, []);

    if (saving) return <LoadingScreen />

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                className='w-full h-full' 
                showsVerticalScrollIndicator={ false }
            >
                {
                    gastos.length > 0 ?
                    <>
                        <Text className='w-5/6 text-xl text-black mb-4 font-bold tracking-widest'>
                            Últimos 6 Meses
                        </Text>
                        
                        <ExpenseBarChart 
                            data={ [...gastos] }
                        />

                        <View className='mt-6'>
                            {
                                gastos.map( (gasto, index) => {
                                    return <ExpenseCard 
                                        key={ index }
                                        id={ gasto.id }
                                        cantidad={ gasto.cantidad }
                                        fecha={ gasto.fecha }
                                        categoria={ gasto.categoria } 
                                        color={ gasto.color }
                                    />
                                } )
                            }
                        </View>
                    </>
                    :
                    <Text 
                        className='w-5/6 text-2xl text-gray mb-4 font-bold 
                        tracking-widest text-center mt-20 ml-7'
                    >
                        No hay gastos registrados.
                    </Text>
                }
                

            </ScrollView>

            {/* <AddIncomeButton /> */}
        </View>
    )
}
