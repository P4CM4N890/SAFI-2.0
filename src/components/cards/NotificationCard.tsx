import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NotificationCardProps } from '../../types/notificationTypes';

import Icon from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from 'toggle-switch-react-native';
import { format } from 'date-fns';

export const NotificationCard = (props: NotificationCardProps) => {

    const navigation = useNavigation<any>();   
    
    const { 
        id, title, iconName, annotations, 
        iconColor, updateNotification, datetime, 
        deleteNotification, isActive, toggleSwitch 
    } = props;

    const newTitle = useMemo( () => {
        return title.length > 20 
        ? 
            title.substring(0, 20) + '...'
        : 
            title
    }, [title]);

    const [ isEnabled, setIsEnabled ] = useState(isActive);

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
        setIsEnabled(isActive);
    }, [isActive]);
    
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-4'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditNotificationScreen', { 
                id, title, datetime, annotations, isActive, updateNotification, deleteNotification 
            })}
        >
            <View className='w-4/5 flex-row items-center gap-x-2'>

                <View className='items-center justify-center rounded-full h-14 w-14' 
                    style={{ backgroundColor: iconColor }}
                >
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <View className='flex-col'>
                    <Text className='text-black text-lg font-bold' numberOfLines={ 1 }>
                        { newTitle }
                    </Text>
                    <Text className='text-black text-xs tracking-tight w-4/5'>
                        Recordatorio para el día
                        { format(datetime, " dd/MM/yyyy 'a las' hh:mm aaa") }
                    </Text>
                </View>
            </View>

            <View className='flex w-1/5 items-center pl-10'>            
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