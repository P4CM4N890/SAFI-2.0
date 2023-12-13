import React from 'react';
import { Text, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string,
    placeholder?: string,
    type: 'email' | 'text' | 'numeric',
    extraClass?: string,
    secureTextEntry?: boolean,
    iconName?: string
}

// export const InputLabel = ( { label, placeholder = '', type, secureTextEntry, extraClass } : Props ) => {
//     return (
//         <>
//             <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>
//             <TextInput 
//                 placeholder={ placeholder }
//                 className='bg-white w-5/6 text-lg py-3 pl-3 rounded-xl shadow-xl shadow-gray-700'
//                 inputMode={ type }
//                 secureTextEntry={ secureTextEntry }
//             />
//         </>
//     );
// }

export const InputLabel = ( { label, placeholder = '', iconName='', type, secureTextEntry, extraClass } : Props ) => {
    return (
        <>
            <Text className={`w-5/6 mb-1 font-semibold text-base text-primary ${ extraClass }`}>{ label }</Text>
            <View className='flex-row items-center pl-1 bg-white w-5/6 text-lg rounded-xl shadow-xl shadow-gray-700'>
                
                {
                    iconName ? <Icon name={ iconName } size={ 30 } style={{ paddingLeft: 9 }}/>: <></>
                }
                
                <TextInput 
                    placeholder={ placeholder }
                    className='w-full text-lg py-3 pl-3'
                    inputMode={ type }
                    secureTextEntry={ secureTextEntry }
                />
            </View>
        </>
    );
}