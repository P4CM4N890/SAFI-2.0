import React, { useState }  from 'react'
import { TouchableOpacity, Text } from 'react-native';

import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string,
    extraClass?: string
}

export const DatePickerLabel = ({ label, extraClass }: Props) => {
    
    const [ date, setDate ] = useState(new Date());
    const [ formattedDate, setFormattedDate ] = useState('');

    const [ open, setOpen ] = useState(false);

    return (
        <>
            <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>

            <TouchableOpacity
                className='flex-row pl-3 w-5/6 bg-white py-3 rounded-xl shadow-xl shadow-gray-700'
                activeOpacity={ 0.8 }
                onPress={ () => setOpen(true) }
            >
                <Icon name='calendar-outline' size={ 30 }/>
                <Text className='pl-3 text-lg'>{ formattedDate ? formattedDate : 'DD/MM/AAAA' }</Text>
            </TouchableOpacity>

            <DatePicker
                modal
                title={ label }
                open={ open }
                date={ date }

                maximumDate={ new Date() }

                mode='date'
                confirmText='Confirmar'
                cancelText='Cancelar'
                androidVariant='iosClone'

                onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    setFormattedDate(date.toLocaleDateString('es-MX'));
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
}