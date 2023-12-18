import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string,
    iconSize: number,
    iconColor: string,
    isFocused: boolean,
    label: string
};

export const TabBarButton = ({ iconName, iconColor, iconSize, label, isFocused }: Props) => {
    return (
        <View className='justify-center items-center py-3'>
            <Icon
                name={ iconName }
                size={ iconSize + 14 }
                color={ iconColor }
            />
            <Text className={`text-xs font-bold ${ isFocused ? 'text-primary' : 'text-black' }`}>{ label }</Text>
        </View>
    );
}