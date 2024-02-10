import { useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { ForumStackParams } from '../navigation/ForumStackNavigator';
import { BackButton, AnswerCard } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { PreguntaResponse } from '../interfaces/ApiInterfaces';
import { useForm } from '../hooks';
import { startAddingLikeToQuestion, startSavingAnswer } from '../store/forum/thunks';
import { LoadingScreen } from './LoadingScreen';
import { showToastSuccessMessage } from '../utils';

interface Props extends StackScreenProps<ForumStackParams, 'QuestionScreen'>{};

const initialState = {
    cuerpo: '',
}

export const QuestionScreen = ({ navigation, route }: Props) => {
    const { questionId } = route.params;

    const dispatch = useAppDispatch();
    const { preguntas, respuestas, isSaving } = useAppSelector( state => state.forum );
    const { users } = useAppSelector( state => state.other );
    const { nombre, uuid } = useAppSelector( state => state.auth );
    const { cuerpo, onChange } = useForm(initialState);
    const saving = useMemo( () => isSaving, [isSaving] );
    
    const preguntaActual = preguntas.find((pregunta) => pregunta.id === questionId) as PreguntaResponse;
    const respuestasPreguntaActual = respuestas.filter((respuesta) => respuesta.id_pregunta === questionId);
    
    const liked = useMemo( () => preguntaActual.id_usuario_liked.includes(uuid as number), [preguntaActual.id_usuario_liked]);
    
    const respuestasOrdenadas = respuestasPreguntaActual.sort((a, b) => {
        if(a.id_usuario === uuid && b.id_usuario !== uuid){
            return -1;
        }
        else if (a.id_usuario !== uuid && b.id_usuario === uuid){
            return 1;
        }
        else{
            return 0;
        }
    });

    const onCreateAnswer = () => {
        showToastSuccessMessage("Respuesta creada.");
        dispatch( startSavingAnswer(cuerpo, preguntaActual.id) );

        onChange('', 'cuerpo');
    };

    const onLikeQuestion = () => {
        dispatch( startAddingLikeToQuestion(questionId) );
    };

    if (saving) return <LoadingScreen />

    return (
        <ScrollView
            showsVerticalScrollIndicator={ false }
        >
            <View className='w-full h-full items-center p-5'>
                <BackButton 
                    iconColor='#FFF'
                    iconSize={ 35 }
                    extraClass='bg-primary'
                    onPress={ () => navigation.goBack() }
                />
    
                <View className='mt-14 w-5/6'>
                    <Text 
                        className='text-2xl text-primary font-bold tracking-wider'
                    >
                        { preguntaActual.titulo }
                    </Text>
                
                    <View className='flex-row justify-between my-2'>
                        <Text className='text-sm text-black font-bold'>{ nombre }</Text>
                        <Text 
                            className='text-sm text-black font-bold'
                        >
                            { format(preguntaActual.fecha, 'dd/MM/yyyy hh:mm aaa') }
                        </Text>
                    </View>
                    <View className='flex-row justify-between my-2'>
                        <Text 
                            className='text-sm text-black font-bold'
                        >
                            { preguntaActual.likes } Me Gusta
                        </Text>
                        <TouchableOpacity 
                            className={`${liked ? 'bg-gray' : 'bg-like-blue'} 
                            w-8 h-8 justify-center items-center rounded-full z-10`} 
                            activeOpacity={ 0.8 }
                            onPress={ onLikeQuestion }
                            disabled={ liked }
                        >
                            <Icon name={ liked ? 'heart' : 'heart-outline'} size={ 15 } color='#FFF'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='w-5/6 border-t-2 border-gray-800'/>
                
                <View className='w-5/6 mt-4'>
                    <Text className='text-justify text-lg text-black-800'>
                        { preguntaActual.descripcion }
                    </Text>
                </View>

                <View className='w-5/6 mt-2'>
                    
                    {
                        respuestasOrdenadas.map((respuesta, index) => {
                            let usuario = users.find((u) => u.id_usuario === respuesta.id_usuario);
                            let isYours = usuario?.id_usuario === uuid;

                            return <AnswerCard
                                key={ index }
                                id={ respuesta.id }
                                usuario={ isYours ? 'Tú' : (usuario?.nombre || 'NotFound') }
                                descripcion={ respuesta.cuerpo }
                                fecha={ respuesta.fecha }
                                isCurrentUserAnswer={ isYours }
                            />
                        })
                    }

                    <View className='h-14 flex-row items-center justify-between bg-white rounded-xl border-2 px-2 border-slate-200 mt-4'>
                        <TextInput 
                            className='w-5/6 items-center h-full text-sm'
                            placeholder='Escribe una respuesta...'
                            value={ cuerpo }
                            onChangeText={ (value) => onChange(value, 'cuerpo') }
                        />

                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ onCreateAnswer }
                        >
                            <Icon 
                                name='send'
                                color='#4F33D8'
                                size={ 34 }
                            />
                       </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}