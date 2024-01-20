import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export const ProfileButton = () => {

    return (
        <View className='items-center fixed left-5'>
            <TouchableOpacity 
                className='bg-primary w-12 h-12 justify-center items-center rounded-full z-10' 
                activeOpacity={ 0.8 }
                onPress={ () => {} }
            >
                <Icon name='person' size={ 30 } color='#FFF'/>
            </TouchableOpacity>
        </View>
    );
}