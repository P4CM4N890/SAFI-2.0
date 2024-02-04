import React, { useState } from 'react';
import { Switch } from 'react-native';

interface props {
    isOn: boolean;
    scale?: number;
    color?: string;
    onChange: (value: string) => void;
}

export const CustomSwitch = ({ isOn, color = '#4F33D8', scale = 1.3, onChange }: props) => {
    const [ isEnabled, setIsEnabled ] = useState(isOn);

    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <Switch 
            trackColor={{ false: '#D9D9D9', true: color }}
            thumbColor='#FCFCFC'
            onValueChange={ toggleSwitch }
            value={ isEnabled }
            style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
            onChange={ () => onChange( isEnabled ? '0' : '1' ) }
        />
    )
};