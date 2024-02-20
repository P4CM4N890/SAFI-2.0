import { Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import { AbonoResponse } from '../../interfaces/ApiInterfaces';

interface Props {
    contribution: AbonoResponse;
    onPress: (id: string, date: string) => void;
};

export const GoalContributionCard = ({ contribution, onPress }: Props) => {
    return (
        <TouchableOpacity 
            className='w-full flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 border-2 border-slate-200 mt-2'
            activeOpacity={ 0.7 }
            onPress={ () => onPress( contribution.id, contribution.fecha ) }
        >
            <Text className='text-right text-base tracking-wider font-semibold'>
                { format(contribution.fecha, "dd/MM/yyyy") }
            </Text>
            <Text className='text-right text-lg font-bold text-emerald-600'>
                ${ contribution.cantidad.toFixed(2) }
            </Text>
        </TouchableOpacity>
    );
};