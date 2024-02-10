import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startDeletingQuestion } from '../../store/forum/thunks';
import { LoadingScreen } from '../../screens/LoadingScreen';
import { format } from 'date-fns';
import { showToastSuccessMessage } from '../../utils';

interface Props {
    id: string;
    title: string;
    numberOfAnswers: number;
    dateOrTime: string;
    iconColor: string;
    likes: number;
    extraClass?: string;
    allowDelete?: boolean
}

export const QuestionCard = ({ id, iconColor, title, likes, numberOfAnswers, 
    dateOrTime, extraClass, allowDelete }: Props) => {
    
    const dispatch = useAppDispatch();
    const { isSaving } = useAppSelector(state => state.forum);
    const navigation = useNavigation<any>();
    
    const newTitle = useMemo( () => {
        return title.length > 25 
        ? 
            title.substring(0, 25) + '...'
        : 
            title
    }, [title]);
    const saving = useMemo( () => isSaving, [isSaving] );

    const onDelete = () => {
        showToastSuccessMessage("Pregunta eliminada.");
        dispatch( startDeletingQuestion(id) );
    };
    
    if (saving) return <LoadingScreen />

    return (
        <View 
            className={`w-full items-center bg-white 
            rounded-2xl p-2 border-2 border-slate-200 mt-3 ${ extraClass }`}
        >
            <TouchableOpacity
                className='ml-3 flex-row items-center'
                activeOpacity={ 0.8 }
                onPress={ () => navigation.navigate('QuestionScreen', { questionId: id }) }
            >
                <View className='w-14 h-14 justify-center items-center rounded-full' style={{ backgroundColor: iconColor }}>
                    <Icon name='help-circle' size={ 45 } color='#FFF'/>
                </View>

                <View className='w-5/6 justify-center ml-3'>
                    <Text 
                        className='text-black font-bold text-lg truncate' 
                    >
                        { newTitle }
                    </Text>
                    
                    <View className='flex-row w-5/6 justify-between'>
                        <Text className='text-right text-sm'>{ likes } Me Gusta</Text>
                        <Text className='text-right text-sm'>{ numberOfAnswers } { numberOfAnswers === 1 ? 'Respuesta' : 'Respuestas'}</Text>
                    </View>
                    
                    <View className='flex-row w-5/6 justify-between'>
                        <Text className='text-right text-sm'>{ format(dateOrTime, 'dd/MM/yyyy hh:mm aaa') }</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {
                allowDelete ? 
                    <View className='items-center ml-64 mt-2'>
                        <TouchableOpacity 
                            className='bg-red w-8 h-8 justify-center items-center rounded-full z-10' 
                            activeOpacity={ 0.8 }
                            onPress={ onDelete }
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