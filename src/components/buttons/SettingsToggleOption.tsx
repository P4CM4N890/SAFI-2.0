import React from 'react';
import { Text, View } from 'react-native';
import { CustomSwitch } from './CustomSwitch';

import Icon from 'react-native-vector-icons/Ionicons';

interface props {
    icon: string;
    option: string;
    extraClass?: string;
}

export const SettingsToggleOption = ({ icon, option, extraClass }: props) => {
    return (
        <View className={`w-full flex flex-row items-center rounded-xl px-2 py-3 border-slate-200 border-2 ${ extraClass }`}>
            <View className='w-5/6 flex flex-row'>
                <Icon name={ icon } size={ 32 } color='#000'/>
                <Text className='text-black font-medium text-xl ml-4'>{ option }</Text>
            </View>

            <CustomSwitch isOn={ false } />
        </View>
    );
}