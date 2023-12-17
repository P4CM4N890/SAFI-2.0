import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Modal from 'react-native-modal';

import { AddQuestionButton } from '../components/buttons/AddQuestionButton';
import { RankingButton } from '../components/buttons/RankingButton';
import { HomeButton } from '../components/buttons/HomeButton';
import { ProfileButton } from '../components/buttons/ProfileButton';
import { QuestionCard } from '../components/cards/QuestionCard';
import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';

export const ForumScreen = () => {

    const [ modalVisible, setModalVisible ] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

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
                    <QuestionCard 
                        id={ 1 }
                        iconColor='#D8336A' 
                        title='¿Cómo usar la app?' 
                        numberOfAnswers={ 2 }
                        dateOrTime='12:00 p.m.'
                        extraClass='mt-2'
                    />
                    <QuestionCard 
                        id={ 2 }
                        iconColor='#75E2F8' 
                        title='¿Cómo invertir mis ahorros?' 
                        numberOfAnswers={ 100 }
                        dateOrTime='12/11/2023'
                    />

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
                        />

                        <InputLabel 
                            type='text'
                            label='Descripción'
                            extraClass='mt-5'
                        />

                        <View className='w-5/6 mt-16 flex-row justify-between'>
                            <Button 
                                label='Publicar' 
                                onPress={ () => {} }
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