import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { AddNotificationButton } from '../components/buttons/AddNotificationButton';
import { BackButton } from '../components/buttons/BackButton';
import { NotificationCard } from '../components/cards/NotificationCard';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

interface Props extends BottomTabScreenProps<any, any> {};

export const NotificationsScreen = ({ navigation }: Props) => {

    return (
        <View className='w-full h-full items-center p-5'>
            <BackButton 
                iconColor='#FFF' 
                iconSize={ 30 } 
                extraClass='bg-primary'
                onPress={ () => navigation.goBack() }
            />

            <Text className='text-black text-2xl font-semibold mt-2 tracking-widest'>Notificaciones</Text>

            <View className='mt-4'>
                <ScrollView>
                    <NotificationCard 
                        title='Abono para celular'
                        iconName='calendar-outline'
                        iconColor='#33D8A2'
                        date='31/01/2024'
                        time='12:00 p.m.'
                    />

                    <NotificationCard 
                        title='Abono para laptop'
                        iconName='calendar-outline'
                        iconColor='#33D8A2'
                        date='31/01/2024'
                        time='12:00 p.m.'
                    />
                </ScrollView>
            </View>

            <AddNotificationButton />
        </View>
    );
}