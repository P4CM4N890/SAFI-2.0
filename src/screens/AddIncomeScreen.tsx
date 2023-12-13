import React from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';

interface Props extends StackScreenProps<any, any> {};

export const AddIncomeScreen = ({ navigation }: Props) => {

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text className='mt-12 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nuevo Ingreso
                    </Text>

                    <InputLabel 
                        label='Nombrel del ingreso' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-16'
                    />

                    <InputLabel 
                        label='Cantidad' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-4'
                        iconName='cash-outline'
                    />

                    <View className='mt-16 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Guardar' 
                            onPress={ () => {} }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('IncomesScreen') }
                        />
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}