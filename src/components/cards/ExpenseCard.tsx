import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    id: string;
    cantidad: number;
    color: string;
    fecha: string;
    categoria: string;
}

export const ExpenseCard = ({ id, cantidad, color, fecha, categoria }: Props) => {
    const navigation = useNavigation<any>();
    let icono = '';
    
    switch(categoria){
        case 'vivienda':
            icono = 'home-outline';
            break;
        case 'transporte':
            icono = 'car-outline';
            break;
        case 'alimentacion':
            icono = 'fast-food-outline';
            break;
        case 'entretenimiento':
            icono = 'film-outline';
            break;
        case 'salud':
            icono = 'medkit-outline';
            break;
        case 'viajes':
            icono = 'airplane-outline';
            break;
        case 'inversiones':
            icono = 'analytics-outline';
            break;
        default:
            icono = 'flag-outline';
            break;
    }

    return (
        <TouchableOpacity 
            className='w-full flex-row items-center bg-white rounded-2xl 
            p-2 border-2 border-slate-200 mt-2'
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('EditExpenseScreen', { expenseId: id }) }
        >
            <View className='w-3/4 flex-row items-center gap-x-3'>

                <View 
                    className='items-center justify-center rounded-full h-14 w-14' 
                    style={{ backgroundColor: color }}
                >
                    <Icon 
                        name={ icono }
                        color='#FFF'
                        size={ 40 } 
                    />
                </View>

                <Text 
                    className='w-2/3 text-black font-bold text-lg' 
                    numberOfLines={ 1 }
                >
                    { `Gasto en ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}` }
                </Text>
            </View>

            <View className='w-1/4 justify-around'>
                <Text 
                    className='text-right text-lg font-bold text-emerald-500'
                >
                    ${ cantidad }
                </Text>
                <Text className='text-right text-sm font-semibold'>{ format(fecha, "dd/MM/yyyy") }</Text>
            </View>
            
        </TouchableOpacity>
    );
}