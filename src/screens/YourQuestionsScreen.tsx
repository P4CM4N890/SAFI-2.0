import { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import { BackButton, QuestionCard } from '../components';
import { useAppSelector } from '../store/hooks';
import { LoadingScreen } from './LoadingScreen';

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
                <Text className='mt-7 ml-4 text-xl font-bold text-black uppercase tracking-widest text-center'>
                    Tus Preguntas
                </Text>

                <View className='mt-8 w-full'>
                    {
                        preguntasFiltradas.length !== 0 ?

                            preguntasFiltradas.map((pregunta, index) => {
                                return (
                                    <QuestionCard 
                                        key={ index }
                                        id={ pregunta.id }
                                        iconColor={ '#D83333' } 
                                        title={ pregunta.titulo }
                                        likes={ pregunta.likes }
                                        numberOfAnswers={ (respuestas.filter( res => res.id_pregunta === pregunta.id )).length }
                                        dateOrTime={ pregunta.fecha }
                                        extraClass='mt-2'
                                        allowDelete={ true }
                                    />
                                )
                            })
                        :
                            <View className='mt-48 w-full'>
                                <Text className='text-lg font-bold text-gray-800 uppercase tracking-wider text-center'>
                                    No has hecho ninguna pregunta
                                </Text>
                                
                                <Text className='text-lg font-semibold text-gray-800 tracking-wide text-center mt-5'>
                                    Te invitamos a crear alguna en la pantalla anterior
                                </Text>
                            </View>
                    } 
                </View>
            </ScrollView>
        </View>
    );
};