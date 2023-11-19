import React, { useState } from 'react';
import { TextInput } from 'react-native';

interface Props {
    placeholder?: string,
    type: 'email' | 'text' | 'numeric',
    extraClass?: string,
    secureTextEntry?: boolean,
    value: string,
    onChange: (value: string, field: string) => void,
}

export const Input = ( { placeholder = 'Text', type, secureTextEntry, extraClass, value, onChange } : Props ) => {

    // const [ inputValue, setInputValue ] = useState( value );

    return (
        <TextInput
            value={ value }
            onChangeText={ (value) => onChange(value, 'password') }
            placeholder={ placeholder }
            className={`bg-white w-5/6 text-base py-3 text-center rounded-xl shadow-xl shadow-gray-700 ${ extraClass }`}
            inputMode={ type }
            secureTextEntry={ secureTextEntry }
        />
    );
}