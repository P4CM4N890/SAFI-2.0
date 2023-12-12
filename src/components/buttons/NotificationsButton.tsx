import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

interface Props extends BottomTabScreenProps<any, any> {};

import Icon from 'react-native-vector-icons/Ionicons';

export const NotificationsButton = ({ navigation }: Props) => {

    return (
        <TouchableOpacity 
            className='rounded-full z-10'
            activeOpacity={ 0.7 }
            onPress={ () => navigation.navigate('NotificationsScreen') }
        >
            <Icon 
                name='notifications-circle-outline'
                color='#4F33D8'
                size={ 50 } 
            />
        </TouchableOpacity>
    );
}