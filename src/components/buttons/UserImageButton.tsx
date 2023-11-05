import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export const UserImageButton = () => {

    return (
        <TouchableOpacity 
            className={`rounded-full z-10`}
            activeOpacity={ 0.7 }
        >
            <Icon 
                name='person-circle-outline'
                color='#4F33D8'
                size={ 50 } 
            />
        </TouchableOpacity>
    );
}