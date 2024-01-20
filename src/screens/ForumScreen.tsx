import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import Modal from 'react-native-modal';

import { AddQuestionButton, RankingButton, QuestionCard,
InputLabel, Button, BackButton } from '../components';
import { format } from 'date-fns';
import { useForm, useUiStore } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startLoadingQuestions, startSavingQuestion } from '../store/forum/thunks';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    titulo: '',
    descripcion: '',
}

export const ForumScreen = ({ navigation }: Props) => {
    const [ modalVisible, setModalVisible ] = useState(false);

    const dispatch = useAppDispatch();
    const { preguntas, respuestas, isSaving } = useAppSelector(state => state.forum);
    const { changeBarVisibility } = useUiStore();
    const { titulo, descripcion, onChange } = useForm(initialState);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const saving = useMemo( () => isSaving, [isSaving] );

    const onCreatePregunta = async () => {
        setModalVisible(false);
        onChange('', 'titulo');
        onChange('', 'descripcion');

        dispatch( startSavingQuestion({ pregunta: titulo, descripcion }) );
    };

    useFocusEffect(
        useCallback(() => {
            dispatch( startLoadingQuestions() );
        }, [])
    );

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
        };
    }, []);

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
                <Text className='mt-20 text-xl font-bold text-black uppercase tracking-widest text-center'>
                    Foro de Preguntas
                </Text>

                <View className='mt-8 w-full'>
                    {
                        preguntas.map((pregunta, index) => {
                            return (
                                <QuestionCard 
                                    id={ index }
                                    iconColor='#D8336A' 
                                    title={ pregunta.titulo }
                                    numberOfAnswers={ (respuestas.filter( res => res.id_pregunta === pregunta.id )).length }
                                    dateOrTime={ format(pregunta.fecha, 'dd/MM/yyyy') }
                                    extraClass='mt-2'
                                />
                            )
                        })
                    } 
                </View>

                <Modal 
                    isVisible={ modalVisible }
                    animationIn={ 'bounceIn' }
                >
                    <View className='bg-white w-full rounded-2xl items-center py-5'>
                        <Text className='text-primary font-bold text-2xl uppercase tracking-wider'>Crear Pregunta</Text>
                    
                        <InputLabel 
                            type='text'
                            label='Título'
                            extraClass='mt-7'
                            value={ titulo }
                            onChange={ (value) => onChange(value, 'titulo') }
                        />

                        <InputLabel 
                            type='text'
                            label='Descripción'
                            extraClass='mt-5'
                            value={ descripcion }
                            onChange={ (value) => onChange(value, 'descripcion') }
                        />

                        <View className='w-5/6 mt-16 flex-row justify-between'>
                            <Button 
                                label='Publicar' 
                                onPress={ onCreatePregunta }
                            />
                            <Button 
                                label='Cancelar' 
                                extraClass='bg-rose-600'
                                onPress={ closeModal }
                            />
                        </View>

                    </View>
                </Modal>

            </ScrollView>

            <View className='w-full items-center flex-row top-6'>    
                <AddQuestionButton onPress={ openModal }/>
                <RankingButton />
            </View>
        </View>
        
    );
}