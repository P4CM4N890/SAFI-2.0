import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import { GoalsStackParams } from '../navigation/GoalsStackNavigator';
import { BackButton, Button, ErrorMessage, GoalContributionCard, InputLabel } from '../components';

import { add, cleanMessage } from '../store/contributions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useForm, useUiStore } from '../hooks';

import { showToastSuccessMessage } from '../utils';

interface Props extends StackScreenProps<GoalsStackParams, 'GoalContributionsScreen'>{};

const initialState = {
    cantidad: ''
};

export const GoalContributionsScreen = ({ navigation, route }: Props) => {
    
    const { changeBarVisibility } = useUiStore();
    const dispatch = useAppDispatch();

    const { goal_id } = route.params;
    const { uuid } = useAppSelector(state => state.auth);
    const { message } = useAppSelector(state => state.goalContributions);

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ error, setError ] = useState('');

    const { cantidad, onChange } = useForm(initialState);
    
    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
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
                id_meta_abonada: goal_id,
                cantidad: Number(cantidad),
                fecha: new Date().toISOString().split('T')[0]
            })
        );

        closeModal();     
    };
    
    useEffect(() => {
        changeBarVisibility(false);
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
                        <Text className='text-2xl text-black font-semibold mb-2'>Datos de la meta</Text>
                        <View className='w-full border-t-2 border-zinc-500 mb-2'/>

                        <Text className='text-lg text-primary font-semibold'>
                            Nombre: <Text className='text-zinc-700'>GTA VI</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Cantidad a lograr: <Text className='text-zinc-700'>2000$</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Cantidad lograda: <Text className='text-zinc-700'>1000$</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Fecha inicio: <Text className='text-zinc-700'>18/02/2024</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Fecha fin: <Text className='text-zinc-700'>20/02/2024</Text>
                        </Text>
                        <Text className='text-lg text-primary font-semibold'>
                            Descripción: <Text className='text-zinc-700'>Para xbox</Text>
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

                        <Text className='text-base font-medium mt-3'>Enero 2024</Text>
                        <GoalContributionCard />
                        <GoalContributionCard />
                    </View>
                </View>

                <Modal 
                    isVisible={ modalVisible }
                    animationIn='bounceIn'
                >
                    <View className='bg-white w-full rounded-2xl items-center py-5'>
                        <Text className='text-primary font-bold text-2xl uppercase tracking-wider'>
                            Nuevo abono
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
                            value={ format(new Date(), "dd'/'MM'/'yyyy") }
                        />

                        <View className='w-5/6 mt-16 flex-row justify-between'>
                            <Button
                                label='Guardar' 
                                onPress={ onAddGoalContribution }
                            />
                            <Button 
                                label='Cancelar' 
                                extraClass='bg-rose-600'
                                onPress={ closeModal }
                            />
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};