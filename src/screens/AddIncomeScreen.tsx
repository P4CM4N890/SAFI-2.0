import { useEffect, useMemo, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { InputLabel, Button, CategoryModal, ColorModal, ErrorMessage } from '../components';
import { categoryIcon, iconColor } from '../types/appTypes';
import { useForm, useUiStore } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LoadingScreen } from './LoadingScreen';
import { startAddingIncome } from '../store/incomes';
import { IngresoCreate } from '../interfaces/ApiInterfaces';
import { showToastSuccessMessage } from '../utils';
import { startAddingExperience } from '../store/auth';
import { Experience } from '../types';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    nombre: '',
    cantidad: '',
}

export const AddIncomeScreen = ({ navigation }: Props) => {
    const { changeBarVisibility } = useUiStore();
    const dispatch = useAppDispatch();
    const { isSaving } = useAppSelector( state => state.income );
    const { uuid } = useAppSelector( state => state.auth );
    const { nombre, cantidad, onChange } = useForm(initialState);

    const saving = useMemo( () => isSaving, [isSaving] );

    const [ categoryModalVisible, setCategoryModalVisible ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState<categoryIcon>('flag-outline');

    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<iconColor>('#A233D8');

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

    const onCreateIncome = () => {
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
        
        onChange('', 'cantidad');
        onChange('', 'nombre');
        const newIncome: IngresoCreate = {
            id_usuario: uuid || 0,
            nombre: nombre,
            cantidad: parseFloat(cantidad),
            icono: selectedCategory,
            color: selectedColor,
            fecha: new Date().toISOString(),
        }

        dispatch( startAddingIncome(newIncome) );
        dispatch( startAddingExperience( Experience.ADD_INCOME ) );

        showToastSuccessMessage("Ingreso creado.");
        navigation.navigate("IncomesScreen");
    };

    if (saving) return <LoadingScreen />

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text className='mt-12 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nuevo Ingreso
                    </Text>

                    <InputLabel 
                        label='Nombre del ingreso' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-16'
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
                            onPress={ onCreateIncome }
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