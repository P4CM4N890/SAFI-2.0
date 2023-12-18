import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string,
    data: Array<string>,
    extraClass?: string
}

export const OptionPickerLabel = ({ label, extraClass, data }: Props) => {

    const [ currentPeriod, setCurrentPeriod ] = useState(0);

    return (
        <>
            <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>

            <TouchableOpacity
                className='flex-row items-center pl-2 w-5/6 bg-white rounded-xl shadow-xl shadow-gray-700 overflow-hidden'
                activeOpacity={ 0.8 }
            >
                <Icon name='sync-outline' size={ 30 } style={{ position: 'absolute', marginLeft: 12, zIndex: 10 }}/>
                
                <SelectDropdown
                    data={ data }
                    onSelect={( selectedItem, index ) => {
                        console.log(index)
                        setCurrentPeriod(index);
                    }}

                    dropdownStyle={{
                        width: '80%'
                    }}

                    buttonStyle={{
                        backgroundColor: '#FFF',
                        width: currentPeriod == 0 ? 160 : 180
                    }}

                    defaultValueByIndex={ 0 }
                />
            </TouchableOpacity>
        </>
    );
}