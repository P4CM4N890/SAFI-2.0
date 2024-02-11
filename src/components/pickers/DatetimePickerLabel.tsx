import { format } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string;
    extraClass?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    fechaInicial?: Date;
    onChange: (value: string) => void;
}

export const DatetimePickerLabel = (props: Props) => {
    const { label, extraClass, maximumDate, minimumDate, 
        fechaInicial, onChange } = props;
    const [ date, setDate ] = useState(new Date(fechaInicial || new Date()));
    const [ formattedDate, setFormattedDate ] = useState(
        fechaInicial ? format(fechaInicial, "dd'/'MM'/'yyyy HH':'mm")
        : ''
    );
    const [ open, setOpen ] = useState(false); 

    return (
        <>
            <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>

            <TouchableOpacity
                className='flex-row pl-3 w-5/6 bg-white py-3 rounded-xl shadow-xl shadow-dark-gray'
                activeOpacity={ 0.8 }
                onPress={ () => setOpen(true) }
            >
                <Icon name='calendar-outline' size={ 30 }/>
                <Text className='pl-3 text-lg'>{ formattedDate ? formattedDate : 'DD/MM/AAAA HH:MM' }</Text>
            </TouchableOpacity>

            <DatePicker
                modal
                title={ label }
                open={ open }
                date={ date }
                
                maximumDate={ maximumDate ? maximumDate : undefined }
                minimumDate={ minimumDate ? minimumDate : undefined }

                mode='datetime'
                confirmText='Confirmar'
                cancelText='Cancelar'
                androidVariant='iosClone'

                onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    setFormattedDate(format(date, "dd'/'MM'/'yyyy HH':'mm"));
                    onChange(date.toISOString());
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
};
