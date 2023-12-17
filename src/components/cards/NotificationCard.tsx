import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomSwitch } from '../buttons/CustomSwitch';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    id: number;
    title: string;
    iconName: string;
    iconColor: string;
    date: string;
    time: string;
}

export const NotificationCard = ({ id, title, iconName, iconColor, date, time }: Props) => {
    
    const navigation = useNavigation<any>();    
    
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-4'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditNotificationScreen', { notificationId: id }) }
        >
            <View className='w-3/5 flex-row items-center gap-x-2'>

                <View className='items-center justify-center rounded-full h-14 w-14' style={{ backgroundColor: iconColor }}>
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <View className='flex-col bg-red'>
                    <Text className='text-black text-lg font-bold' numberOfLines={ 1 }>{ title }</Text>
                    <Text className='text-black text-xs tracking-tight'>Recordatorio para el día { date } a las { time }</Text>
                </View>
            </View>

            <View className='w-2/5'>
                <CustomSwitch 
                    isOn={ false }
                    scale={ 1 }
                    color='#60D833'
                />
            </View>
            
        </TouchableOpacity>
    );
}