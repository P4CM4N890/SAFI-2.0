import React from 'react';
import { Text, TextInput } from 'react-native';

interface Props {
    label: string,
    placeholder?: string,
    type: 'email' | 'text' | 'numeric',
    extraClass?: string,
    secureTextEntry?: boolean,
    value?: string,
    autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words',
    onChange?: (value: string) => void,
}

export const InputLabel = ( { label, placeholder = '', type, secureTextEntry, extraClass, value, onChange, autoCapitalize } : Props ) => {
    return (
        <>
            <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>
            <TextInput 
                placeholder={ placeholder }
                className='bg-white w-5/6 text-lg py-3 pl-3 rounded-xl shadow-xl shadow-gray-700'
                inputMode={ type }
                secureTextEntry={ secureTextEntry }
                autoCapitalize={ autoCapitalize }
                value={ value }
                onChangeText={ onChange }
            />
        </>
    );
}