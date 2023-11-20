import React, { useState } from 'react';
import { TextInput } from 'react-native';

interface Props {
    placeholder?: string,
    type: 'email' | 'text' | 'numeric',
    extraClass?: string,
    secureTextEntry?: boolean,
    value: string,
    onChange: (value: string) => void,
}

export const Input = ( { placeholder = 'Text', type, secureTextEntry, extraClass, value, onChange } : Props ) => {


    return (
        <TextInput
            value={ value }
            onChangeText={ onChange }
            placeholder={ placeholder }
            className={`bg-white w-5/6 text-base py-3 text-center rounded-xl shadow-xl shadow-gray-700 ${ extraClass }`}
            inputMode={ type }
            secureTextEntry={ secureTextEntry }
        />
    );
}