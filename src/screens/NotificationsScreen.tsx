import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export const NotificationsScreen = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={ false }>
            <View className='w-full h-full items-center p-5'>
                <Text className='text-center'>Notificaciones</Text>
            </View>
        </ScrollView>
    );
}