import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { StyleSheet } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native';
import { useNavigation } from '@react-navigation/native';


interface Props {
    id: number;
    title: string;
    datetime: Date;
    isActive: boolean;
    annotations: string;
    toggleSwitch: Function;
    deleteNotification: Function;
    updateNotification: Function;
}


export const NotificationCard = (props: Props) => {
    const { id, title, datetime, isActive, toggleSwitch } = props;
    const [isEnabled, setIsEnabled] = useState(isActive);
    const navigation = useNavigation();


    const redirectToNotification = () => {
        navigation.navigate('ModificarNotificacionScreen', { props });
    };
    
    useEffect(() => {
        setIsEnabled(isActive);
    }, [isActive])
    

    return (
        <TouchableWithoutFeedback onPress={redirectToNotification}>
            <View style={styles_card.card}>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                    <View style={styles_card.card_text}>
                        <Text style={styles_card.texto_titulo}>
                            {title}
                        </Text>
                        <Text style={styles_card.card_text}>
                            Recordatorio configurado para el dia
                        </Text>
                        <Text style={styles_card.card_text}>
                            {datetime.toLocaleDateString()} - {datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </View>
                    <View style={styles_card.card_toggle_switch}>
                        <ToggleSwitch
                            offColor='#51595D'
                            onColor='#35D863'
                            thumbOffStyle={{ backgroundColor: '#0d1911' }}
                            thumbOnStyle={{ backgroundColor: '#0d1911' }}
                            isOn={isEnabled}
                            onToggle={() => toggleSwitch(isEnabled, setIsEnabled, props)}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles_card = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(27, 34, 31, 0.5)',
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#51595D',
        margin: 10
    },

  texto_titulo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Roboto-Black',
  },

  card_text: {
    color: '#888888',
    width: '75%',
    fontFamily: 'Roboto-Regular',
  },

    card_toggle_switch: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});