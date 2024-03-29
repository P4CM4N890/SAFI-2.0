import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import { GoalsStackParams } from '../navigation/GoalsStackNavigator';
import { BackButton, Button, ErrorMessage, GoalContributionCard, InputLabel } from '../components';

import { add, cleanMessage, update, remove } from '../store/contributions';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { useForm, useUiStore } from '../hooks';

import { showToastSuccessMessage } from '../utils';
import { AbonoResponse } from '../interfaces/ApiInterfaces';
import { startAddingExperience } from '../store/auth';
import { Experience } from '../types';

interface Props extends StackScreenProps<GoalsStackParams, 'GoalContributionsScreen'>{};

const initialState = {
    cantidad: ''
};

export const GoalContributionsScreen = ({ navigation, route }: Props) => {
    
    const { changeBarVisibility } = useUiStore();
    const dispatch = useAppDispatch();

    const { goal } = route.params;

    const { uuid } = useAppSelector(state => state.auth);
    const { message, goalsProgress } = useAppSelector(state => state.goalContributions);
    const { contributions, isLoading } = useAppSelector(state => state.goalContributions);

    const [ amountAchieved, setAmountAchieved ] = useState<Number>(0);
    const [ selectedContribution, setSelectedContribution ] = useState({ id: '', date: '' });

    const [ goalContributions, setGoalContributions ] = useState<AbonoResponse[]>([]);

    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ deleteModalVisible, setDeleteModalVisible ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');

    const { cantidad, onChange } = useForm(initialState);

    const onSelectContribution = (id: string, date: string) => {
        setSelectedContribution({ id, date });
        openModal();
    };
    
    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setSelectedContribution({ id: '', date: '' });
        setModalVisible(false);
    };

    const openDeleteConfirmationModal = () => {
        setDeleteModalVisible(true);
    };

    const closeDeleteConfirmationModal = () => {
        setDeleteModalVisible(false);
    };

    const isErrorOfField = (field: string) => {
        return error.includes(field);
    };

    const onAddGoalContribution = () => {
        if (!cantidad) {
            setError('La cantidad es obligatoria');
            return;

        } else if (Number(cantidad) <= 0) {
            setError('La cantidad debe ser mayor a cero');
            return;
        }

        if(!uuid) return;

        dispatch(
            add({
                id_usuario: uuid,
                id_meta_abonada: goal.id,
                cantidad: Number(cantidad),
                fecha: new Date().toISOString().split('T')[0]
            })
        );

        dispatch( startAddingExperience( Experience.ADD_CONTRIBUTION ) );

        closeModal();     
    };

    const onEditGoalContribution = () => {
        if (!cantidad) {
            setError('La cantidad es obligatoria');
            return;

        } else if (Number(cantidad) <= 0) {
            setError('La cantidad debe ser mayor a cero');
            return;
        }

        if(!uuid) return;

        dispatch(
            update(
                selectedContribution.id,
                uuid,
                {
                    id_meta_abonada: goal.id,
                    cantidad: Number(cantidad),
                    fecha: selectedContribution.date
                }
            )
        );

        closeModal();
    };

    const onDeleteGoalContribution = () => {
        closeDeleteConfirmationModal();
        closeModal();
        
        dispatch( remove(selectedContribution.id) );
    };
    
    useEffect(() => {
        changeBarVisibility(false);
    }, []);

    useEffect(() => {
        if(contributions.length === 0) return;

        const currentGoalContributions = contributions.filter(item => item.id_meta_abonada === goal.id);
        setGoalContributions(currentGoalContributions);

        const totalAchieved = goalsProgress.find( goalProgress => goalProgress.id === goal.id )?.total || 0;
        setAmountAchieved(totalAchieved);
    }, []);

    useEffect(() => {
        if(!message) return;

        setTimeout(() => {
            showToastSuccessMessage(message);
            navigation.navigate('GoalsScreen');

            dispatch(cleanMessage());
        }, 500);
    }, [ message ]);

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>

                <View className='w-full h-full items-center'>
                    <View className='mt-1 w-full flex-row justify-center items-center'>    
                        <BackButton
                            iconColor='#fff' 
                            iconSize={ 25 } 
                            extraClass='bg-primary'
                            onPress={ () => navigation.goBack() }
                        />

                        <Text className='mt-7 text-2xl font-bold text-primary uppercase'>
                            Abonos
                        </Text>
                    </View>

                    <View className='w-full mt-7 px-5'>
                        <View className='flex flex-row justify-between mb-1'>
                            <Text className='text-2xl text-black font-semibold'>Datos de la meta</Text>
                            
                            <TouchableOpacity 
                                activeOpacity={ 0.8 }
                                // onPress={ () => onDeleteGoal() }
                            >
                                <Icon name='trash-bin-outline' size={ 33 } color='#4F33D8' />
                            </TouchableOpacity>
                        </View>

                        <View className='w-full border-t-2 border-zinc-500 mb-2'/>
                        
                        <Text className='text-lg text-primary font-semibold'>
                            Nombre: <Text className='text-zinc-700'>{ goal.nombre }</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Cantidad a lograr: <Text className='text-zinc-700'>${ goal.cantidad.toFixed(2) }</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Cantidad lograda: <Text className='text-zinc-700'>${ amountAchieved.toFixed(2) }</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Fecha inicio: <Text className='text-zinc-700'>{ format(new Date(goal.fecha_inicio), "dd'/'MM'/'yyyy") }</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Fecha fin: <Text className='text-zinc-700'>{ format(new Date(goal.fecha_fin), "dd'/'MM'/'yyyy") }</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Descripción: <Text className='text-zinc-700'>{ goal.descripcion }</Text>
                        </Text>
                    </View>

                    <View className='w-full mt-7 px-5'>
                        <View className='flex flex-row justify-between mb-1'>
                            <Text className='text-2xl text-black font-semibold'>Historial de abonos</Text>
                            
                            <TouchableOpacity 
                                activeOpacity={ 0.8 }
                                onPress={ openModal }
                            >
                                <Icon name='add-circle-outline' size={ 35 } color='#4F33D8' />
                            </TouchableOpacity>
                        </View>
                        
                        <View className='w-full border-t-2 border-zinc-500 mb-1'/>

                        {   
                            isLoading 
                            ?
                                <>
                                    <ActivityIndicator size={ 30 } color='#000' className='mt-24' /> 
                                    <Text className='text-center mt-3 font-medium text-zinc-500'>
                                        Cargando abonos...
                                    </Text>
                                </>

                            : (!isLoading && goalContributions.length > 0) 
                                ?   goalContributions.map( contribution => (
                                        <GoalContributionCard 
                                            key={ contribution.id }
                                            contribution={ contribution }
                                            onPress={ onSelectContribution }
                                        />
                                    ))
                                :   <>
                                        <Text className='text-center font-medium text-lg text-zinc-500 mt-24 uppercase'>
                                            Esta meta no tiene abonos
                                        </Text>
                                        <Text className='text-center font-medium text-base text-zinc-500 mt-3'>
                                            Cuando registre abonos podrá verlos aquí
                                        </Text>
                                    </>
                        }
                    </View>
                </View>

                <Modal 
                    isVisible={ modalVisible }
                    animationIn='bounceIn'
                >
                    <View className='bg-white w-full rounded-2xl items-center py-5'>
                        <Text className='text-primary font-bold text-2xl uppercase tracking-wider'>
                            { selectedContribution.id ? 'Editar abono' : 'Nuevo abono' }
                        </Text>

                        <InputLabel 
                            type='numeric'
                            label='Cantidad'
                            extraClass='mt-5'
                            value={ cantidad.toString() }
                            onChange={ (value) => onChange(value, 'cantidad') }
                        />
                        <ErrorMessage
                            message={ error }
                            showMessage={ !!error && isErrorOfField('cantidad')}
                        />

                        <InputLabel 
                            type='numeric'
                            label='Fecha'
                            extraClass='mt-5'
                            editable={ false }
                            value={ 
                                selectedContribution.id 
                                    ? format(new Date(selectedContribution.date), "dd'/'MM'/'yyyy") 
                                    : format(new Date(), "dd'/'MM'/'yyyy") 
                            }
                        />
                        
                        {
                            selectedContribution.id 
                            ?   <View className='w-full mt-10'>
                                    <TouchableOpacity
                                        className='flex flex-row justify-center items-center'
                                        activeOpacity={ 0.8 }
                                        onPress={ openDeleteConfirmationModal }
                                    >
                                        <Icon
                                            name='trash-outline' 
                                            size={ 30 } 
                                            color='#4F33D8' 
                                        />

                                        <Text className='text-base text-black'>Eliminar</Text>
                                    </TouchableOpacity>
                                </View> 
                            : <></>
                        }

                        <View className='w-5/6 mt-8 flex-row justify-between'>
                            <Button
                                label='Guardar' 
                                onPress={() => {
                                    if (selectedContribution.id) onEditGoalContribution();
                                    else onAddGoalContribution();
                                }}
                            />
                            <Button 
                                label='Cancelar' 
                                extraClass='bg-rose-600'
                                onPress={ closeModal }
                            />
                        </View>
                    </View>
                </Modal>

                <Modal 
                    isVisible={ deleteModalVisible }
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                >
                    <View className='bg-white w-full rounded-2xl items-center py-5'>
                        <Text className='text-primary font-bold text-2xl uppercase tracking-wider'>
                            ¿Eliminar abono?
                        </Text>

                        <View className='w-5/6 mt-8 flex-row justify-between'>
                            <Button
                                label='Aceptar' 
                                onPress={ onDeleteGoalContribution }
                            />
                            <Button 
                                label='Cancelar' 
                                extraClass='bg-rose-600'
                                onPress={ closeDeleteConfirmationModal }
                            />
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};