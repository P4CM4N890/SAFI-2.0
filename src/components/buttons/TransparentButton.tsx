import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    label?: string,
    extraClass?: string,
    textStyle?: string,
    onPress?: () => void,
}

export const TransparentButton = ( { label = 'Click Me', textStyle, onPress, extraClass } : Props ) => {
    return (
        <TouchableOpacity 
            className={`${ extraClass } p-2`} 
            activeOpacity={ 0.7 }
            onPress={ onPress }
        >
            <Text className={`${ textStyle }`}>{ label }</Text>
        </TouchableOpacity>
    );
}