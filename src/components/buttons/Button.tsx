import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    label?: string,
    extraClass?: string,
    onPress?: () => void,
}

export const Button = ( { label = 'Click me', onPress, extraClass } : Props ) => {
    return (
        <TouchableOpacity 
            className={`bg-primary px-8 py-3 rounded-xl shadow-xl shadow-gray-700 ${ extraClass }`} 
            activeOpacity={ 0.8 }
            onPress={ onPress }
        >
            <Text className='text-white text-base font-bold uppercase'>{ label }</Text>
        </TouchableOpacity>
    );
}