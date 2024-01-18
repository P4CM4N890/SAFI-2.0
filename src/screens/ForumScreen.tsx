import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Modal from 'react-native-modal';

import { AddQuestionButton } from '../components/buttons/AddQuestionButton';
import { RankingButton } from '../components/buttons/RankingButton';
import { HomeButton } from '../components/buttons/HomeButton';
import { ProfileButton } from '../components/buttons/ProfileButton';
import { QuestionCard } from '../components/cards/QuestionCard';
import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerPreguntas, obtenerRespuestas } from '../api/getRequests';
import { PreguntaCreate, PreguntaResponse, RespuestaResponse } from '../interfaces/ApiInterfaces';
import { format, isToday } from 'date-fns';
import { useForm } from '../hooks/useForm';
import { crearPregunta } from '../api/postRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { ActiveComponentContext } from '../context/ActiveComponentContext';

const initialState = {
    titulo: '',
    descripcion: '',
}

export const ForumScreen = () => {

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ preguntas, setPreguntas ] = useState<PreguntaResponse[]>([]);
    const [ respuestas, setRespuestas ] = useState<RespuestaResponse[]>([]);
    const [ newData, setNewData ] = useState(false);
    const { titulo, descripcion, onChange } = useForm(initialState);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const getPreguntas = async () => {
        try{
            const preguntas = ( await obtenerPreguntas() ).data;
            const respuestas = ( await obtenerRespuestas() ).data;
            
            setPreguntas(preguntas);
            setRespuestas(respuestas);
        }
        catch(error){
            console.error(error);
        }
    };

    const onCreatePregunta = async () => {
        // Retornar el ID del usuario en la peticion del login

        let pregunta: PreguntaCreate = {
            titulo,
            descripcion,
            categoria: 'Pregunta',
            fecha: new Date().toISOString(),
            id_usuario: 1,
            likes: 0,
        };

        try{
            await crearPregunta(pregunta);

            closeModal();
            setNewData(true);
        }
        catch(error){
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getPreguntas();
            setNewData(!!newData);
        }, [newData])
    );

    return (
        <View className='w-full h-full items-center p-5'>
            <ScrollView 
                showsVerticalScrollIndicator={ false }
                className='w-full'
            >
                <Text className='mt-20 text-xl font-bold text-black uppercase tracking-widest text-center'>
                    Foro de Preguntas
                </Text>

                <View className='mt-8 w-full'>
                    {
                        preguntas.map((pregunta) => {
                            return (
                                <QuestionCard 
                                    id={ Math.floor((Math.random() * 100)) }
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

            <ProfileButton />
            <HomeButton />
            <RankingButton />
            <AddQuestionButton onPress={ openModal }/>
        </View>
    );
}