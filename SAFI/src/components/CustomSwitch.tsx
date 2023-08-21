import React, { useState, useEffect } from 'react';
import { Switch, View } from 'react-native';

interface Props {
    isOn: boolean;
    onChange: (value: boolean) => void;
}

const CustomSwitch = ({ isOn, onChange }: Props) => {

    const [ isEnabled, setIsEnabled ] = useState(isOn);

    // Tuve este problema con los toggle de notificaciones
    // Sin este useEffect no se actualiza con el estado inicial
    // de la configuración, debido a la latencia del state.
    useEffect(() => {
        setIsEnabled(isOn);
    }, [isOn])
    

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        onChange(!isEnabled);
    };

    return (
        <View style={{ marginHorizontal: 20 }}>
            <Switch
                trackColor={{ false: '#D9D9DB', true:  'green' }}
                thumbColor="green"
                onValueChange={ toggleSwitch }
                value={ isEnabled }
            />
        </View>
    );
};

export default CustomSwitch;