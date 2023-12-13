import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

export const AddGoalButton = () => {

    const navigation = useNavigation<any>();

    return (
        <View className='items-center absolute bottom-2'>
            <TouchableOpacity 
                className='bg-primary w-16 h-16 justify-center items-center rounded-full z-10' 
                activeOpacity={ 0.8 }
                onPress={ () => navigation.navigate('AddGoalScreen') }
            >
                <Icon name='add-outline' size={ 40 } color='#FFF'/>
            </TouchableOpacity>
        </View>
    );
}