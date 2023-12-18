import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

export const HomeButton = () => {

    const navigation = useNavigation<any>();

    return (
        <View className='items-center absolute top-5 right-4'>
            <TouchableOpacity 
                className='bg-white z-10' 
                activeOpacity={ 0.8 }
                onPress={ () => navigation.navigate('HomeScreen') }
            >
                <Icon name='home' size={ 50 } color='#4F33D8'/>
            </TouchableOpacity>
        </View>
    );
}