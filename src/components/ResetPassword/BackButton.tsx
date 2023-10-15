import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconColor: string,
    iconSize: number,
    extraClass: string
}

export const BackButton = ({ iconColor, iconSize, extraClass }: Props) => {
    return (
        <TouchableOpacity 
            className={`absolute top-5 left-5 p-2 rounded-full ${ extraClass }`}
            activeOpacity={ 0.8 }
            // onPress={ () => console.log('click') }
        >
            <Icon 
                name='arrow-back-outline' 
                size={ iconSize } 
                color={ iconColor } 
            />
        </TouchableOpacity>
    );
}