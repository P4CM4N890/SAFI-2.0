import React, { useState }  from 'react'
import { TouchableOpacity, Text } from 'react-native';

import DatePicker from 'react-native-date-picker';

interface Props {
    label: string,
    mode: 'time' | 'date' | 'datetime'
    extraClass?: string,
}

export const DatePickerLabel = ({ label, mode, extraClass }: Props) => {
    
    const [ date, setDate ] = useState(new Date());
    const [ open, setOpen ] = useState(false);

    return (
        <>
            <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>

            <TouchableOpacity
                className='w-5/6 bg-white py-3  rounded-xl font-semibold shadow-xl shadow-gray-700'
                activeOpacity={ 0.8 }
                onPress={ () => setOpen(true) }
            >
                <Text className='text-lg pl-2'>MM/DD/YYYY</Text>
            </TouchableOpacity>

            <DatePicker
                modal
                title={ label }
                mode={ mode }
                open={ open }
                date={ date }

                confirmText='Confirmar'
                cancelText='Cancelar'
                androidVariant='iosClone'

                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    );
}