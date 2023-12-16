import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';
import { DatePickerLabel } from '../components/pickers/DatePickerLabel';
import { CustomSwitch } from '../components/buttons/CustomSwitch';

import { GoalsStackParams } from '../navigation/GoalsStackNavigator';

interface Props extends StackScreenProps<GoalsStackParams, 'EditGoalScreen'>{};

export const EditGoalScreen = ({ navigation, route }: Props) => {

    const { goalId } = route.params;

    return (
        <ScrollView>
            <View className='w-full h-full items-center py-5'>

                <Text className='mt-6 text-2xl font-bold text-primary uppercase tracking-widest'>
                    Editar Meta
                </Text>

                <View className='w-5/6 mt-2 flex-row items-center justify-end'>
                    <Text className='text-sm text-primary mr-2'>Fijar</Text>
                    <CustomSwitch 
                        isOn={ false }
                        scale={ 1.2 }
                        color='#60D833'
                    />
                </View>

                <InputLabel 
                    label='Nombre de la meta' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-4'
                />

                <DatePickerLabel 
                    label='Fecha de inicio'
                    extraClass='mt-3'
                />

                <DatePickerLabel 
                    label='Fecha de finalización'
                    extraClass='mt-3'
                />

                <InputLabel 
                    label='Meta a alcanzar' 
                    placeholder='' 
                    type='numeric'
                    extraClass='mt-4'
                    iconName='cash-outline'
                />

                <InputLabel 
                    label='Notas (opcional)' 
                    placeholder='' 
                    type='text'
                    extraClass='mt-3'
                />

                <View className='mt-16 w-5/6 flex-row justify-between'>
                    <Button 
                        label='Guardar' 
                        onPress={ () => {} }
                    />
                    <Button 
                        label='Cancelar' 
                        extraClass='bg-rose-600'
                        onPress={ () => navigation.navigate('GoalsScreen') }
                    />
                </View>

            </View>
        </ScrollView>
    );
}