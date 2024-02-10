import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { format } from 'date-fns';

interface Props {
    id: string;
    title: string;
    iconName: string;
    iconColor: string;
    money: number;
    time: string;
}

export const IncomeCard = ({ id, title, iconName, iconColor, money, time }: Props) => {
    
    const navigation = useNavigation<any>();    

    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white rounded-2xl p-2 border-2 border-slate-200 mt-2'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditIncomeScreen', { incomeId: id }) }
        >
            <View className='w-3/4 flex-row items-center gap-x-3'>

                <View className='items-center justify-center rounded-full h-14 w-14' style={{ backgroundColor: iconColor }}>
                    <Icon 
                        name={ iconName }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <Text className='w-2/3 text-black font-bold text-lg' numberOfLines={ 1 }>{ title }</Text>
            </View>

            <View className='w-1/4 justify-around'>
                <Text className='text-right text-lg font-bold text-emerald-500'>${ money }</Text>
                <Text className='text-right text-sm font-semibold'>{ format(time, "dd/MM/yyyy") }</Text>
            </View>
            
        </TouchableOpacity>
    );
}