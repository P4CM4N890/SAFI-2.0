import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useForm, useUiStore } from '../hooks';
import { addGoal } from '../store/goals/thunks';

import { InputLabel, Button, DatePickerLabel, CustomSwitch, CategoryModal,
ColorModal, PriorityModal } from '../components';

import { categoryIcon, iconColor, priority, priorityColor } from '../types/appTypes';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    nombre: '',
    cantidad: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    icono: 'flag-outline' as categoryIcon,
    color: '#A233D8' as iconColor,
    prioridad: 'Baja' as priority,
    fijar: '0'
};

export const AddGoalScreen = ({ navigation }: Props) => {
    const dispatch = useAppDispatch();

    const [ categoryModalVisible, setCategoryModalVisible ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState<categoryIcon>('flag-outline');

    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<iconColor>('#A233D8');

    const { uuid } = useAppSelector( state => state.auth );
    const [ error, setError ] = useState('');

    const [ priorityModalVisible, setPriorityModalVisible ] = useState(false);
    const [ selectedPriority, setSelectedPriority ] = useState<priority>('Baja');
    const [ selectedPriorityColor, setSelectedPriorityColor ] = useState<priorityColor>('#60D833');

    const { changeBarVisibility } = useUiStore();
    
    const { 
        onChange, nombre, cantidad, descripcion, fecha_fin, fecha_inicio, color, icono, prioridad
    } = useForm( initialState );

    useEffect(() => {
        changeBarVisibility(false);
    }, []);

    const onAddGoal = () => {
        if (!nombre || !cantidad || !fecha_fin || !fecha_inicio) { 
            setError('Debes completar todos los campos.');
            console.log('Debes completar todos los campos.');
            return;

        } else if (Number(cantidad) <= 0) {
            setError('La cantidad debe ser mayor a cero.');
            console.log('La cantidad debe ser mayor a cero.');
            return;
        }

        if(!uuid) return;

        dispatch(
            addGoal({
                id_usuario: uuid,
                nombre,
                cantidad: Number(cantidad),
                fecha_inicio: fecha_inicio.split('T')[0],
                fecha_fin: fecha_fin.split('T')[0],
                descripcion,
                prioridad,
                icono,
                color,
                completada: 0
            })
        );
    };

    const openCategoryModal = () => {
        setCategoryModalVisible(true);
    };
  
    const closeCategoryModal = () => {
        setCategoryModalVisible(false);
    };

    const selectCategory = (category: categoryIcon) => {
        setSelectedCategory(category);
        onChange(category, 'icono');

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
        onChange(color, 'color');

        closeColorModal();
    };

    const openPriorityModal = () => {
        setPriorityModalVisible(true);
    };
  
    const closePriorityModal = () => {
        setPriorityModalVisible(false);
    };

    const selectPriority = (priority: priority, color: priorityColor) => {
        setSelectedPriority(priority);
        setSelectedPriorityColor(color);
        onChange(priority, 'prioridad');

        closePriorityModal();
    };

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center mb-9'>

                    <Text className='mt-6 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nueva Meta
                    </Text>

                    <View className='w-5/6 mt-2 flex-row items-center justify-end'>
                        <Text className='text-sm text-primary mr-2'>Fijar</Text>
                        <CustomSwitch 
                            isOn={ false }
                            scale={ 1.2 }
                            color='#60D833'
                            onChange={ (value) => onChange(value, 'fijar') }
                        />
                    </View>

                    <InputLabel 
                        label='Nombre de la meta' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-4'
                        value={ nombre }
                        onChange={ (value) => onChange(value, 'nombre') }
                    />

                    <DatePickerLabel 
                        label='Fecha de inicio'
                        extraClass='mt-3'
                        onChange={ (value) => onChange(value, 'fecha_inicio') }
                    />

                    <DatePickerLabel 
                        label='Fecha de finalización'
                        extraClass='mt-3'
                        onChange={ (value) => onChange(value, 'fecha_fin') }
                    />

                    <InputLabel 
                        label='Meta a alcanzar' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-4'
                        iconName='cash-outline'
                        value={ cantidad }
                        onChange={ (value) => onChange(value, 'cantidad') }
                    />

                    <InputLabel 
                        label='Notas (opcional)' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-3'
                        value={ descripcion }
                        onChange={ (value) => onChange(value, 'descripcion') }
                    />

                    <View className='mt-5 w-5/6 flex-row justify-around'>
                        <View className='items-center'>
                            <Text className='mb-2 text-primary text-sm'>Categoria</Text>

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

                        <View className='items-center justify-between'>
                            <Text className='mb-2 text-primary text-sm'>Prioridad</Text>

                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                onPress={ openPriorityModal }
                                className='rounded-full h-10 w-20 items-center justify-center'
                                style={{ backgroundColor: selectedPriorityColor }}
                            >
                                <Text className='text-base uppercase font-semibold text-white'>{ selectedPriority }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className='mt-10 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Guardar' 
                            onPress={ onAddGoal }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('GoalsScreen') }
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

                <PriorityModal 
                    isModalVisible={ priorityModalVisible }
                    selectPriority={ selectPriority }
                />

            </ScrollView>
        </KeyboardAvoidingView>
    );
}