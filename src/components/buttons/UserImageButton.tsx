import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface props {
    size?: number;
}

export const UserImageButton = ({ size = 45 }: props) => {

    return (
        <TouchableOpacity 
            className={`rounded-full z-10`}
            activeOpacity={ 0.7 }
        >
            <Icon 
                name='person-outline'
                color='#4F33D8'
                size={ size } 
            />
        </TouchableOpacity>
    );
}