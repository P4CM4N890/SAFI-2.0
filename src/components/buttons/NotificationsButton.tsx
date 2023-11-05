import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export const NotificationsButton = () => {

    const [ notificationsOn, setNotificationsOn ] = useState(true);

    return (
        <TouchableOpacity 
            className={`rounded-full z-10`}
            activeOpacity={ 0.7 }
            onPress={ () => setNotificationsOn(!notificationsOn) }
        >
            <Icon 
                name={ notificationsOn ? 'notifications-circle-outline' : 'notifications-off-circle-outline' }
                color='#4F33D8'
                size={ 50 } 
            />
        </TouchableOpacity>
    );
}