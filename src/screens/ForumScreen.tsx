import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { AddQuestionButton } from '../components/buttons/AddQuestionButton';
import { RankingButton } from '../components/buttons/RankingButton';
import { HomeButton } from '../components/buttons/HomeButton';
import { ProfileButton } from '../components/buttons/ProfileButton';
import { QuestionCard } from '../components/cards/QuestionCard';

export const ForumScreen = () => {
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
            </ScrollView>

            <ProfileButton />
            <HomeButton />
            <RankingButton />
            <AddQuestionButton />
        </View>
    );
}