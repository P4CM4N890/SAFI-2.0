import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, LogBox, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { CustomSwitch } from '../buttons/CustomSwitch';
import { NotificationCardProps } from '../../types/notificationTypes';
import { es } from 'date-fns/locale/es';

import Icon from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from 'toggle-switch-react-native';

export const NotificationCard = (props: NotificationCardProps) => {
    const { id, title, iconName, annotations, iconColor, updateNotification, 
            datetime, deleteNotification, isActive, toggleSwitch } = props;
    const [ isEnabled, setIsEnabled ] = useState(isActive);
    const navigation = useNavigation<any>();   

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
        setIsEnabled(isActive);
    }, [isActive]);
    
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white 
            rounded-2xl p-2 border-2 border-slate-200 mt-4'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditNotificationScreen', 
            { id: id, title: title, datetime: datetime,  annotations: annotations,
                isActive: isActive, updateNotification: updateNotification,
                deleteNotification: deleteNotification }) }
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
                        Recordatorio para el día {new Date(datetime).toLocaleDateString()} - {new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
            </View>

            <View className='flex w-2/5 items-center pl-10'>            
                <ToggleSwitch
                    offColor='#51595D'
                    onColor='#35D863'
                    thumbOffStyle={{ backgroundColor: '#ffff' }}
                    thumbOnStyle={{ backgroundColor: '#ffff' }}
                    isOn={ isEnabled }
                    onToggle={ () => toggleSwitch ? toggleSwitch(isEnabled, setIsEnabled, props) : null }
                />
            </View>
            
        </TouchableOpacity>
    );
}