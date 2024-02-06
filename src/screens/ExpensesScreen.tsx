import { useEffect, useMemo } from "react";
import { View, ScrollView } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { useUiStore } from "../hooks";
import { ExpenseCard } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { startLoadingExpenses } from "../store/expenses";
import { LoadingScreen } from "./LoadingScreen";
import { startLoadingCategories } from "../store/other";

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
        dispatch( startLoadingExpenses() );
    }, []);
    
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
                {/* <Header title='Proyección de Ahorro'/> */}

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

            </ScrollView>

            {/* <AddIncomeButton /> */}
        </View>
    )
}
