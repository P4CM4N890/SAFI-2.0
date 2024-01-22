import { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import { BackButton, QuestionCard } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LoadingScreen } from './LoadingScreen';
import { startDeletingQuestion } from '../store/forum/thunks';

interface Props extends StackScreenProps<any, any> {};

export const YourQuestionsScreen = ({ navigation }: Props) => {
    const { preguntas, respuestas, isSaving } = useAppSelector(state => state.forum);
    const { uuid } = useAppSelector(state => state.auth);
    const saving = useMemo( () => isSaving, [isSaving] );

    const preguntasFiltradas = [...preguntas].filter((preg) => preg.id_usuario === uuid);

    if (saving) return <LoadingScreen />

    return (
        <View className='w-full h-full items-center p-5'>
            <View className='w-full items-center right-5'>    
                <BackButton
                    iconColor='#fff' 
                    iconSize={ 30 } 
                    extraClass='bg-primary'
                    onPress={ () => navigation.goBack() }
                />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={ false }
                className='w-full h-64'
            >
                <Text 
                    className='mt-20 text-xl font-bold text-black uppercase 
                    tracking-widest text-center'
                >
                    Tus Preguntas
                </Text>

                <View className='mt-8 w-full'>
                    {
                        preguntasFiltradas.map((pregunta, index) => {
                            return (
                                <QuestionCard 
                                    key={ index }
                                    id={ pregunta.id }
                                    iconColor={ '#D83333' } 
                                    title={ pregunta.titulo }
                                    numberOfAnswers={ (respuestas.filter( res => res.id_pregunta === pregunta.id )).length }
                                    dateOrTime={ format(pregunta.fecha, 'dd/MM/yyyy') }
                                    extraClass='mt-2'
                                    allowDelete={ true }
                                />
                            )
                        })
                    } 
                </View>
            </ScrollView>
        </View>
    );
};

