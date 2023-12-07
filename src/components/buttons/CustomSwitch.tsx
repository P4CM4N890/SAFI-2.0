import React, { useState } from 'react';
import { Switch } from 'react-native';

interface props {
    isOn: boolean;
}

export const CustomSwitch = ({ isOn }: props) => {
    const [ isEnabled, setIsEnabled ] = useState(isOn);

    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <Switch 
            trackColor={{ false: '#D9D9D9', true: '#4F33D8' }}
            thumbColor='#FCFCFC'
            onValueChange={ toggleSwitch }
            value={ isEnabled }
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
    )
}