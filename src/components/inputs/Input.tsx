import React from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    placeholder?: string,
    type: 'email' | 'text' | 'numeric',
    extraClass?: string,
    secureTextEntry?: boolean,
}

export const Input = ( { placeholder = 'Text', type, secureTextEntry, extraClass } : Props ) => {
    return (
        <TextInput placeholder={ placeholder }
        className={`bg-white w-5/6 text-lg py-3 text-center rounded-xl font-semibold shadow-xl shadow-gray-700 ${ extraClass }`}
        inputMode={ type }
        secureTextEntry={ secureTextEntry }
        />
    );
}