import React from 'react';
import { View, Text, TouchableOpacity, LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { CustomSwitch } from '../buttons/CustomSwitch';
import { NotificationCardProps } from '../../types/notificationTypes';

import Icon from 'react-native-vector-icons/Ionicons';

export const NotificationCard = (props: NotificationCardProps) => {
    const { id, title, iconName, iconColor, 
            datetime, deleteNotification } = props;

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const navigation = useNavigation<any>();    
    
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white 
            rounded-2xl p-2 border-2 border-slate-200 mt-4'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditNotificationScreen', 
            { id: id, deleteNotification: deleteNotification }) }
        >
            <View className='w-3/5 flex-row items-center gap-x-2'>

                <View className='items-center justify-center rounded-full 
                h-14 w-14' style={{ backgroundColor: iconColor }}>
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <View className='flex-col'>
                    <Text className='text-black text-lg font-bold' numberOfLines={ 1 }>
                        { title }
                    </Text>
                    <Text className='text-black text-xs tracking-tight'>
                        Recordatorio para el día { format(datetime, "dd/MM/yyyy 'a las' h':'m aaa") }
                    </Text>
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