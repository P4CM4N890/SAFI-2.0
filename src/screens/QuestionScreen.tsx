import { useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { ForumStackParams } from '../navigation/ForumStackNavigator';
import { BackButton, AnswerCard } from '../components';
import { useUiStore } from '../hooks';

interface Props extends StackScreenProps<ForumStackParams, 'QuestionScreen'>{};

export const QuestionScreen = ({ navigation, route }: Props) => {

    const { questionId } = route.params;

    const { changeBarVisibility } = useUiStore();

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
        };
    }, []);

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
                    <Text className='text-2xl text-primary font-bold tracking-wider'>¿Cómo invertir mis ahorros?</Text>
                
                    <View className='flex-row justify-between my-2'>
                        <Text className='text-sm text-gray-600'>Usuario X</Text>
                        <Text className='text-sm text-gray-600'>Fecha</Text>
                    </View>
                </View>

                <View className='w-5/6 border-t-2 border-gray-800'/>
                
                <View className='w-5/6 mt-4'>
                    <Text className='text-justify text-sm text-gray-800'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque provident ipsum nulla beatae debitis aspernatur voluptatem officia id, est dignissimos ea reprehenderit suscipit, assumenda asperiores magni natus saepe a! Esse!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel vitae beatae a dolor eum. In ad provident facilis quisquam adipisci corporis soluta, similique sequi tempore molestiae accusamus iusto facere aut!
                    </Text>
                </View>

                <View className='w-5/6 mt-2'>
                    
                    <AnswerCard/>
                    <AnswerCard/>
                    <AnswerCard/>
                    <AnswerCard/>
                    <AnswerCard/>
                    <AnswerCard/>
                    <AnswerCard/>

                    <View className='h-14 flex-row items-center justify-between bg-white rounded-xl border-2 px-2 border-slate-200 mt-4'>
                        <TextInput 
                            className='w-5/6 items-center h-full text-sm'
                            placeholder='Escribe una respuesta'
                        />

                        <TouchableOpacity
                            activeOpacity={ 0.8 }
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