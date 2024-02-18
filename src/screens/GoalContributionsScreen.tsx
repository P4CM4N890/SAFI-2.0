import { useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { GoalsStackParams } from '../navigation/GoalsStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

import { GoalContributionCard } from '../components';
import { useUiStore } from '../hooks';

interface Props extends StackScreenProps<GoalsStackParams, 'GoalContributionsScreen'> {};

export const GoalContributionsScreen = ({ navigation }: Props) => {

    const { changeBarVisibility } = useUiStore();
    
    useEffect(() => {
        changeBarVisibility(false);
    }, []);

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text className='mt-12 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Abonos
                    </Text>

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

                    <View className='w-full mt-7 px-5 mb-10'>
                        <View className='flex flex-row justify-between mb-1'>
                            <Text className='text-2xl text-black font-semibold'>Historial de abonos</Text>
                            
                            <TouchableOpacity 
                                activeOpacity={ 0.8 }
                            >
                                <Icon name='add-circle-outline' size={ 35 } color='#4F33D8' />
                            </TouchableOpacity>
                        </View>
                        
                        <View className='w-full border-t-2 border-zinc-500 mb-1'/>

                        <Text className='text-base font-medium mt-3'>
                            Enero 2024
                        </Text>
                        <GoalContributionCard />
                        <GoalContributionCard />

                        <Text className='text-base font-medium mt-3'>
                            Febrero 2024
                        </Text>
                        <GoalContributionCard />
                        <GoalContributionCard />

                        <Text className='text-base font-medium mt-3'>
                            Marzo 2024
                        </Text>
                        <GoalContributionCard />
                        <GoalContributionCard />
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};