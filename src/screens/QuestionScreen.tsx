import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { ForumStackParams } from '../navigation/ForumStackNavigator';
import { BackButton, AnswerCard } from '../components';
import { useAppSelector } from '../store/hooks';
import { PreguntaResponse } from '../interfaces/ApiInterfaces';
import { format } from 'date-fns';

interface Props extends StackScreenProps<ForumStackParams, 'QuestionScreen'>{};

export const QuestionScreen = ({ navigation, route }: Props) => {
    const { questionId } = route.params;
    const { preguntas, respuestas } = useAppSelector( state => state.forum );
    const { nombre } = useAppSelector( state => state.auth );

    const preguntaActual = preguntas.find((pregunta) => pregunta.id === questionId) as PreguntaResponse;
    const respuestasPreguntaActual = respuestas.filter((respuesta) => respuesta.id_pregunta === questionId);

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
                </View>

                <View className='w-5/6 border-t-2 border-gray-800'/>
                
                <View className='w-5/6 mt-4'>
                    <Text className='text-justify text-lg text-black-800'>
                        { preguntaActual.descripcion }
                    </Text>
                </View>

                <View className='w-5/6 mt-2'>
                    
                    {
                        respuestasPreguntaActual.map((respuesta, index) => {
                            return <AnswerCard
                                key={ index }
                                id={ respuesta.id }
                                usuario={ 'Luis' }
                                descripcion={ respuesta.cuerpo }
                                fecha={ respuesta.fecha }
                            />
                        })
                    }

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