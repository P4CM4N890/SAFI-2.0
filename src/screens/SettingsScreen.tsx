import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { UserImageButton } from '../components/buttons/UserImageButton';
import { SettingsOption } from '../components/buttons/SettingsOption';
import { SettingsToggleOption } from '../components/buttons/SettingsToggleOption';

interface Props extends StackScreenProps<any, any>{};

export const SettingsScreen = ({ navigation }: Props) => {
    return (
        <ScrollView showsVerticalScrollIndicator={ false }>
            <View className='w-full h-full items-center p-5'>
                <UserImageButton size={ 160 } />
                <Text className='text-black text-2xl text-center font-bold uppercase'>Francisco O.</Text>
            
                <SettingsOption icon='person-outline' option='Mi Perfil' extraClass='mt-8'/>
                
                <View className='w-full mt-5 rounded-xl border-slate-200 border-2'>
                    <SettingsToggleOption icon='notifications-outline' option='Notificaciones' extraClass='border-0'/>
                    <SettingsToggleOption icon='chatbox-ellipses-outline' option='Consejos' extraClass='border-0'/>
                </View>

                <View className='w-full mt-5 rounded-xl border-slate-200 border-2'>
                    <SettingsOption icon='game-controller-outline' option='Videojuego' extraClass='border-0'/>
                    
                    <SettingsOption 
                        icon='help-circle-outline' 
                        option='Foro de preguntas' 
                        onPress={ () => navigation.navigate('ForumStackNavigator') } 
                        extraClass='border-0'
                    />
                    
                    <SettingsOption icon='business-outline' option='Acerca de Nosotros' extraClass='border-0'/>
                </View>

                <SettingsOption icon='log-out-outline' option='Cerrar Sesión' extraClass='mt-8'/>
            </View>
        </ScrollView>
    );
}