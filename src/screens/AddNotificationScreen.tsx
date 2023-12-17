import React from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';
import { DatePickerLabel } from '../components/pickers/DatePickerLabel';
import { TimePickerLabel } from '../components/pickers/TimePickerLabel';
import { OptionPickerLabel } from '../components/pickers/OptionPickerLabel';

interface Props extends StackScreenProps<any, any> {};

export const AddNotificationScreen = ({ navigation }: Props) => {

    const periods = ['Una vez', 'Dos veces', 'Tres veces']

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center mb-5'>

                    <Text className='mt-8 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nueva
                    </Text>
                    <Text className='text-2xl font-bold text-primary uppercase tracking-widest'>
                        Notificación
                    </Text>
                    
                    <InputLabel 
                        label='Nombre de la notificación' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-10'
                    />

                    <DatePickerLabel 
                        label='Fecha'
                        extraClass='mt-3'
                    />

                    <TimePickerLabel 
                        label='Hora' 
                        extraClass='mt-3'
                    />

                    <OptionPickerLabel 
                        data={ periods }
                        label='Repetir alerta'
                        extraClass='mt-3'
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
                            onPress={ () => navigation.navigate('NotificationsScreen') }
                        />
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}