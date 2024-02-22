import { useEffect, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { UserImageButton, SettingsOption, FotoPerfil } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { startLogout } from '../store/auth/thunks';
import { useUiStore } from '../hooks';
import { getImageSource } from '../utils';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<any, any>{};

export const SettingsScreen = ({ navigation }: Props) => {

    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();
    const { changeActiveComponent } = useUiStore();
    const { nombre, experiencia, email, 
        ruta_imagen, isSavingUser } = useAppSelector( state => state.auth );

    const saving = useMemo( () => isSavingUser, [isSavingUser]);

    useEffect(() => {
        if(isFocused) changeActiveComponent('SettingsStackNavigator');
    }, [ isFocused ]);

    const onLogOut = async () => {
        dispatch( startLogout() );
    };

    if (saving) return <LoadingScreen />

    return (
        <ScrollView showsVerticalScrollIndicator={ false }>
            <View className='w-full h-full items-center p-5'>
                {/* <UserImageButton size={ 160 } /> */}
                <View className='mt-5 rounded'>
                    {
                        ruta_imagen 
                        ?
                            <FotoPerfil 
                                image={ getImageSource(ruta_imagen as string) }
                                size='160'
                            />
                        :
                            <UserImageButton size={ 160 } />
                    }
                </View>
                <Text 
                    className='text-black text-2xl text-center font-bold uppercase mt-4'
                >
                    { nombre }
                </Text>
                
                <Text 
                    className='text-dark-gray text-l text-center font-semibold mt-2'
                >
                    { email }
                </Text>

                <Text 
                    className='text-dark-gray text-l text-center font-semibold mt-2'
                >
                    Experiencia: { experiencia }
                </Text>
            
                <SettingsOption 
                    icon='person-outline' 
                    option='Mi Perfil' 
                    extraClass='mt-8'
                    onPress={ () => navigation.navigate('EditAccountScreen') }
                />

                <View className='w-full mt-5 rounded-xl border-slate-200 border-2'>
                    <SettingsOption 
                        icon='game-controller-outline' 
                        option='Videojuego' 
                        extraClass='border-0'
                        onPress={ () => navigation.navigate('Game') } 
                    />
                    
                    <SettingsOption 
                        icon='help-circle-outline' 
                        option='Foro de Preguntas' 
                        onPress={ () => navigation.navigate('ForumStackNavigator') } 
                        extraClass='border-0'
                    />
                    
                    <SettingsOption 
                        icon='business-outline' 
                        option='Acerca de Nosotros' 
                        extraClass='border-0'
                    />
                </View>

                <SettingsOption 
                    icon='log-out-outline' 
                    option='Cerrar Sesión' 
                    extraClass='mt-8'
                    onPress={ onLogOut }
                />
            </View>
        </ScrollView>
    );
}