import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface props {
    icon: string;
    option: string;
    extraClass?: string;
}

export const SettingsOption = ({ icon, option, extraClass }: props) => {
    return (
        <TouchableOpacity 
            className={`w-full flex flex-row items-center rounded-xl px-2 py-3 border-slate-200 border-2 ${ extraClass }`}
            activeOpacity={ 0.7 }
        >
            <Icon name={ icon } size={ 32 } color='#000'/>
            <Text className='text-black font-medium text-xl ml-4'>{ option }</Text>
        </TouchableOpacity>
    );
}