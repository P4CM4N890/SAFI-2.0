import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    label?: string,
    extraClass?: string,
    textStyle?: string,
}

export const TransparentButton = ( { label = 'Click Me', textStyle, extraClass } : Props ) => {
    return (
        <TouchableOpacity className={`${ extraClass }`} activeOpacity={ 0.7 }>
            <Text className={`${ textStyle }`}>{ label }</Text>
        </TouchableOpacity>
    );
}