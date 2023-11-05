import React from 'react';
import { View, Text } from 'react-native';

import { NotificationsButton } from '../components/buttons/NotificationsButton';
import { UserImageButton } from '../components/buttons/UserImageButton';

export const IncomeScreen = () => {
    return (
        <View className='w-full h-full flex justify-center items-center'>
            <UserImageButton />
            <NotificationsButton />
            
            <Text>IncomeScreen</Text>
        </View>
    );
}