import { useEffect, useMemo, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { InputLabel, Button, CategoryModal, ColorModal, ErrorMessage } from '../components';
import { categoryIcon, iconColor } from '../types/appTypes';
import { IncomesStackParams } from '../navigation/IncomesStackNavigator';
import { useForm, useUiStore } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LoadingScreen } from './LoadingScreen';
import { IngresoEdit, IngresoResponse } from '../interfaces/ApiInterfaces';
import { startDeletingIncome, startUpdatigIncome } from '../store/incomes';
import { showToastSuccessMessage } from '../utils';

interface Props extends StackScreenProps<IncomesStackParams, 'EditIncomeScreen'>{};

export const EditIncomeScreen = ({ navigation, route }: Props) => {
    const { incomeId } = route.params;
    
    const { changeBarVisibility } = useUiStore();
    const dispatch = useAppDispatch();
    const { ingresos, isSaving } = useAppSelector( state => state.income );
    const ingresoActual = ingresos.find( ingreso => ingreso.id === incomeId ) as IngresoResponse;

    const initialState = {
        nombre: ingresoActual?.nombre || '',
        cantidad: ingresoActual?.cantidad.toString() || '',
    }

    const { nombre, cantidad, onChange } = useForm(initialState);

    const saving = useMemo( () => isSaving, [isSaving] );

    const [ categoryModalVisible, setCategoryModalVisible ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState<categoryIcon>(ingresoActual?.icono as categoryIcon);

    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<iconColor>(ingresoActual?.color as iconColor);

    const [ error, setError ] = useState("");

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
        };
    }, []);

    const openCategoryModal = () => {
        setCategoryModalVisible(true);
    };
  
    const closeCategoryModal = () => {
        setCategoryModalVisible(false);
    };

    const selectCategory = (category: categoryIcon) => {
        setSelectedCategory(category);
        closeCategoryModal();
    };

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

    const onUpdateIncome = () => {
        if(!nombre || !cantidad){
            setError("Debes llenar todos los campos");
            return;
        }
        else if (nombre.length < 3) {
            setError("El nombre debe ser de al menos 3 caracteres.")
            return;
        }
        else if (parseFloat(cantidad) <= 0) {
            setError("Ingresa una cantidad válida.");
            return;
        }

        const newIngreso: IngresoEdit = {
            nombre,
            cantidad: parseFloat(cantidad),
            color: selectedColor,
            icono: selectedCategory,
        }

        dispatch( startUpdatigIncome(incomeId, newIngreso) );

        showToastSuccessMessage("Ingreso modificado.");
        navigation.navigate("IncomesScreen");
    };

    const onDeleteIncome = () => {
        dispatch( startDeletingIncome(incomeId) );

        showToastSuccessMessage("Ingreso eliminado.");
        navigation.navigate("IncomesScreen");
    };

    if (saving) return <LoadingScreen />

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text className='mt-12 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Editar Ingreso
                    </Text>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        onPress={ onDeleteIncome }
                    >
                        <Text className='mt-4 text-l font-semibold text-red 
                        uppercase tracking-widest'>
                            Eliminar
                        </Text>
                    </TouchableOpacity>

                    <InputLabel 
                        label='Nombrel del ingreso' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-12'
                        value={ nombre }
                        onChange={ (value) => onChange(value, 'nombre') }
                    />

                    <InputLabel 
                        label='Cantidad' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-4'
                        iconName='cash-outline'
                        value={ cantidad }
                        onChange={ (value) => onChange(value, 'cantidad') }
                    />

                    <View className='mt-16 w-5/6 flex-row justify-around'>
                        <View className='items-center'>
                            <Text className='mb-2 text-primary text-sm'>Icono</Text>

                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                onPress={ openCategoryModal }
                                className='rounded-full h-12 w-12 items-center justify-center'
                                style={{ backgroundColor: selectedColor }}
                            >
                                <Icon name={ selectedCategory } color='#FFF' size={ 30 }/>
                            </TouchableOpacity>
                        </View>

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
                            onPress={ onUpdateIncome }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('IncomesScreen') }
                        />
                    </View>

                </View>

                <CategoryModal 
                    isModalVisible={ categoryModalVisible } 
                    selectCategory={ selectCategory }
                    color={ selectedColor }
                />

                <ColorModal 
                    isModalVisible={ colorModalVisible }
                    selectColor={ selectColor }
                />

            </ScrollView>
        </KeyboardAvoidingView>
    );
}