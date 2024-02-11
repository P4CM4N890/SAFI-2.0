import { useEffect, useMemo, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { InputLabel, Button, ColorModal, ErrorMessage, CategoryDropdown } from '../components';
import { iconColor } from '../types/appTypes';
import { IncomesStackParams } from '../navigation/IncomesStackNavigator';
import { useForm, useUiStore } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LoadingScreen } from './LoadingScreen';
import { startDeletingExpense, startUpdatingExpense } from '../store/expenses';
import { GastoEdit } from '../interfaces/ApiInterfaces';
import { showToastSuccessMessage } from '../utils';

interface Props extends StackScreenProps<IncomesStackParams, 'EditExpenseScreen'>{};

export const EditExpenseScreen = ({ navigation, route }: Props) => {
    const dispatch = useAppDispatch();
    const { expenseId } = route.params;
    const { changeBarVisibility } = useUiStore();
    const { gastos, isSaving } = useAppSelector( state => state.expense );
    const gastoActual = gastos.find( gasto => gasto.id === expenseId );

    const { cantidad, onChange } = useForm({ cantidad: gastoActual?.cantidad.toString() as string });

    const saving = useMemo( () => isSaving, [isSaving] );
    
    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<iconColor>(gastoActual?.color as iconColor);
    const [ categoria, setCategoria ] = useState(gastoActual?.categoria);
    const [ error, setError ] = useState("");

    useEffect(() => {
        changeBarVisibility(false);

        // return () => {
        //     changeBarVisibility(true);
        // };
    }, []);

    const openColorModal = () => {
        setColorModalVisible(true);
    };
  
    const closeColorModal = () => {
        setColorModalVisible(false);
    };

    const selectColor = (color: iconColor) => {
        setSelectedColor(color);
        closeColorModal();
    };

    const onUpdateExpense = () => {
        if(!categoria || !cantidad){
            setError("Debes llenar todos los campos");
            return;
        }
        else if(parseFloat(cantidad) <= 0){
            setError("Ingresa una cantidad válida");
            return;
        }

        let newGasto: GastoEdit = {
            cantidad: parseFloat(cantidad),
            categoria: categoria.toLowerCase(),
            color: selectedColor,
        };

        dispatch( startUpdatingExpense(expenseId, newGasto) );

        showToastSuccessMessage("Gasto modificado.");
        navigation.navigate('ExpensesScreen');
    };

    const onDeleteExpense = () => {
        dispatch( startDeletingExpense(expenseId) );

        showToastSuccessMessage("Gasto eliminado.");
        navigation.navigate("ExpensesScreen");
    };

    if (saving) return <LoadingScreen />

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text 
                        className='mt-12 text-2xl font-bold text-primary uppercase 
                        tracking-widest'
                    >
                        Editar Gasto
                    </Text>

                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        onPress={ onDeleteExpense }
                    >
                        <Text className='mt-4 text-l font-semibold text-red 
                        uppercase tracking-widest'>
                            Eliminar
                        </Text>
                    </TouchableOpacity>

                    <InputLabel 
                        label='Cantidad' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-16'
                        iconName='cash-outline'
                        value={ cantidad }
                        onChange={ (value) => onChange(value, 'cantidad') }
                    />

                    <Text 
                        className='w-5/6 mt-4 mb-1 font-semibold text-base text-primary'
                    >
                        Categoria
                    </Text>

                    <CategoryDropdown
                        defaultValue={ 
                            gastoActual?.categoria.charAt(0).toUpperCase() as string
                            + gastoActual?.categoria.slice(1) as string }
                        setCategory={ setCategoria }
                    />

                    <View className='mt-16 w-5/6 flex-row justify-around'>
                        <View className='items-center'>
                            <Text className='mb-2 text-primary text-sm'>Color</Text>

                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                onPress={ openColorModal }
                                className='rounded-full h-12 w-12 items-center justify-center'
                                style={{ backgroundColor: selectedColor }}
                            />
                        </View>
                    </View>

                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error }
                        extraClass={ 'mt-4'}
                    />

                    <View className='mt-16 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Guardar' 
                            onPress={ onUpdateExpense }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('IncomesScreen') }
                        />
                    </View>

                </View>

                <ColorModal 
                    isModalVisible={ colorModalVisible }
                    selectColor={ selectColor }
                />

            </ScrollView>
        </KeyboardAvoidingView>
    );
}