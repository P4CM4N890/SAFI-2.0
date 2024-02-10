import { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startAddingLikeToAnswer, startDeletingAnswer } from '../../store/forum/thunks';
import { RespuestaResponse } from '../../interfaces/ApiInterfaces';
import { LoadingScreen } from '../../screens/LoadingScreen';
import { showToastSuccessMessage } from '../../utils';

interface Props {
    id: string;
    usuario: string;
    fecha: string;
    descripcion: string;
    isCurrentUserAnswer: boolean;
}

export const AnswerCard = ({ id, usuario, fecha, descripcion, isCurrentUserAnswer }: Props) => {
    const dispatch = useAppDispatch();
    const { uuid } = useAppSelector( state => state.auth );
    const { respuestas, isSaving } = useAppSelector( state => state.forum );
    const respuestaActual = respuestas.find((res) => res.id === id) as RespuestaResponse;
    const saving = useMemo( () => isSaving, [isSaving] );

    const liked = useMemo( () => respuestaActual.id_usuario_liked.includes(uuid as number), [respuestaActual.id_usuario_liked]);

    const onDeleteAnswer = () => {
        showToastSuccessMessage("Respuesta eliminada.");
        dispatch( startDeletingAnswer(id) );
    };

    const onLikeAnswer = () => {
        dispatch( startAddingLikeToAnswer(id) );
    };

    if (saving) return <LoadingScreen />

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
            
            <View className='w-full flex-row justify-between'>
                <Text 
                    className='text-xs text-black font-semibold'
                >
                    { respuestaActual.likes } Me Gusta
                </Text>
            </View>
            
            <View className='w-full mt-2'>
                <Text className='text-sm text-gray-800 text-justify'>
                    { descripcion }
                </Text>
            </View>
            
            {
                isCurrentUserAnswer ? 
                    <View className='items-center flex-row bottom-0 right-0 ml-52'>
                        <TouchableOpacity 
                            className='bg-red w-8 h-8 justify-center 
                            items-center rounded-full z-10 mr-2' 
                            activeOpacity={ 0.8 }
                            onPress={ onDeleteAnswer }
                        >
                            <Icon name='trash-outline' size={ 15 } color='#FFF'/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className={`${liked ? 'bg-gray' : 'bg-like-blue'} 
                            w-8 h-8 justify-center items-center rounded-full z-10 mr-5`} 
                            activeOpacity={ 0.8 }
                            onPress={ onLikeAnswer }
                            disabled={ liked }
                        >
                            <Icon name={ liked ? 'heart' : 'heart-outline'} size={ 15 } color='#FFF'/>
                        </TouchableOpacity>
                    </View>
                :
                    <View className='items-center flex-row bottom-0 right-0 ml-52'>
                        <TouchableOpacity 
                            className={`${liked ? 'bg-gray' : 'bg-like-blue'} 
                            w-8 h-8 justify-center items-center rounded-full z-10`} 
                            activeOpacity={ 0.8 }
                            onPress={ onLikeAnswer }
                            disabled={ liked }
                        >
                            <Icon name={ liked ? 'heart' : 'heart-outline'} size={ 15 } color='#FFF'/>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    );
}