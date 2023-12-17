import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

export const NotificationsButton = () => {

    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity 
            className='rounded-full z-10'
            activeOpacity={ 0.7 }
            onPress={ () => navigation.navigate('NotificationsStackNavigator') }
        >
            <Icon 
                name='notifications-circle-outline'
                color='#4F33D8'
                size={ 50 } 
            />
        </TouchableOpacity>
    );
}