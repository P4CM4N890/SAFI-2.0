import { useEffect, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import { GoalsStackParams } from '../navigation/GoalsStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

import { InputLabel, Button, DatePickerLabel, CustomSwitch, 
CategoryModal, ColorModal, PriorityModal, ErrorMessage } from '../components';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateGoal } from '../store/goals/thunks';
import { useForm, useUiStore } from '../hooks';

import { categoryIcon, iconColor, priority, priorityColor } from '../types/appTypes';

interface Props extends StackScreenProps<GoalsStackParams, 'EditGoalScreen'>{};

export const EditGoalScreen = ({ navigation, route }: Props) => {

    const { goal: initialState } = route.params;
    const dispatch = useAppDispatch();

    const [ error, setError ] = useState('');

    const [ categoryModalVisible, setCategoryModalVisible ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState<categoryIcon>('flag-outline');

    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<iconColor>('#A233D8');

    const [ priorityModalVisible, setPriorityModalVisible ] = useState(false);
    const [ selectedPriority, setSelectedPriority ] = useState<priority>('Baja');
    const [ selectedPriorityColor, setSelectedPriorityColor ] = useState<priorityColor>('#60D833');

    const { changeBarVisibility } = useUiStore();

    const { 
        onChange, nombre, cantidad, descripcion, fecha_fin, fecha_inicio, color, icono, prioridad, fijar
    } = useForm({ ...initialState, fijar: 'no' });

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
        };
    }, []);

    const onUpdateGoal = () => {
        if (!nombre) { 
            setError('El nombre es obligatorio');
            return;

        } else if (!fecha_inicio) {
            setError('La fecha de inicio es obligatoria');
            return;

        } else if (!fecha_fin) {
            setError('La fecha de finalización es obligatoria');
            return;

        } else if (!cantidad) {
            setError('La meta a alcanzar es obligatoria');
            return;

        } else if (Number(cantidad) <= 0) {
            setError('La meta a alcanzar debe ser mayor a cero');
            return;
        }

        dispatch(
            updateGoal(initialState.id, 
                {
                    nombre,
                    cantidad: Number(cantidad),
                    color,
                    completada: 0,
                    descripcion,
                    fecha_fin,
                    fecha_inicio,
                    icono,
                    prioridad
                }, fijar === 'si' ? true : false
            )
        );
    };

    const isErrorOfField = (field: string) => {
        return error.includes(field);
    };

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

    const openPriorityModal = () => {
        setPriorityModalVisible(true);
    };
  
    const closePriorityModal = () => {
        setPriorityModalVisible(false);
    };

    const selectPriority = (priority: priority, color: priorityColor) => {
        setSelectedPriority(priority);
        setSelectedPriorityColor(color);
        closePriorityModal();
    };

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center py-5'>

                    <Text className='mt-6 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Editar Meta
                    </Text>

                    <View className='w-5/6 mt-2 flex-row items-center justify-end'>
                        <Text className='text-sm text-primary mr-2'>Fijar</Text>
                        <CustomSwitch 
                            isOn={ fijar === 'si' }
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
                    <ErrorMessage
                        message={ error }
                        showMessage={ !!error && isErrorOfField('nombre')}
                    />

                    <DatePickerLabel 
                        label='Fecha de inicio'
                        extraClass='mt-3'
                        fechaInicial={ new Date(fecha_inicio) }
                        fechaInicialFormatted={ format(new Date(fecha_inicio), "dd'/'MM'/'yyyy") }
                        onChange={ (value) => onChange(value, 'fecha_inicio') }
                    />
                    <ErrorMessage
                        message={ error }
                        showMessage={ !!error && isErrorOfField('fecha de inicio')}
                    />

                    <DatePickerLabel 
                        label='Fecha de finalización'
                        extraClass='mt-3'
                        fechaInicial={ new Date(fecha_fin) }
                        fechaInicialFormatted={ format(new Date(fecha_fin), "dd'/'MM'/'yyyy") }
                        onChange={ (value) => onChange(value, 'fecha_fin') }
                    />
                    <ErrorMessage
                        message={ error }
                        showMessage={ !!error && isErrorOfField('fecha de finalización')}
                    />

                    <InputLabel 
                        label='Meta a alcanzar' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-4'
                        iconName='cash-outline'
                        value={ String(cantidad) }
                        onChange={ (value) => onChange(value, 'cantidad') }
                    />
                    <ErrorMessage
                        message={ error }
                        showMessage={ !!error && isErrorOfField('meta a alcanzar')}
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
                            onPress={ onUpdateGoal }
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