import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

export const GoalContributionCard = () => {
    const navigation = useNavigation<any>();    

    return (
        <TouchableOpacity 
            className='w-full flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 border-2 border-slate-200 mt-2'
            activeOpacity={ 0.8 }
            // onPress={ () => navigation.navigate('EditIncomeScreen', { incomeId: id }) }
        >
            <Text className='text-right text-base tracking-wider font-semibold'>
                { format("2024-20-01", "dd/MM/yyyy") }
            </Text>
            <Text className='text-right text-lg font-bold text-emerald-600'>
                500.00$
            </Text>
        </TouchableOpacity>
    );
};