import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../../store/hooks';
import { startDeletingAnswer } from '../../store/forum/thunks';


interface Props {
    id: string;
    usuario: string;
    fecha: string;
    descripcion: string;
    isCurrentUserAnswer: boolean;
}

export const AnswerCard = ({ id, usuario, fecha, descripcion, isCurrentUserAnswer }: Props) => {
    const dispatch = useAppDispatch();
    
    const onDeleteAnswer = () => {
        dispatch( startDeletingAnswer(id) );
    }

    return (
        <View className='w-full items-center bg-white rounded-xl p-2 border-2 border-slate-200 mt-4'>
            <View className='w-full flex-row justify-between'>
                <Text className='text-xs text-black font-medium'>
                    { usuario }
                </Text>
                <Text className='text-xs text-black font-medium'>
                    { format(fecha, 'dd/MM/yyyy hh:mm aaa') }
                </Text>
            </View>
            
            <View className='w-full mt-2'>
                <Text className='text-sm text-gray-800 text-justify'>
                    { descripcion }
                </Text>
            </View>
            
            {
                isCurrentUserAnswer ? 
                    <View className='items-center bottom-0 right-0 ml-52'>
                        <TouchableOpacity 
                            className='bg-red w-8 h-8 justify-center items-center rounded-full z-10' 
                            activeOpacity={ 0.8 }
                            onPress={ onDeleteAnswer }
                        >
                            <Icon name='trash-outline' size={ 15 } color='#FFF'/>
                        </TouchableOpacity>
                    </View>
                :
                    null
            }
        </View>
    );
}