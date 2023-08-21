import React, { useState, useCallback, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Perfil from '../components/Perfil';
import BotonNuevoPerfil from '../components/BotonNuevoPerfil';
import { obtenerPerfiles } from '../api/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PerfilNinoResponseModel } from '../interfaces/ApiInterfaces';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {};

export const SeleccionPerfilScreen = ( { navigation }: Props ) => {
    const [ perfiles, setPerfiles ] = useState<PerfilNinoResponseModel[]>([]);

    const { logOut } = useContext( AuthContext );
    
    const ofPerfiles = async () => {
        try{
            const response = await obtenerPerfiles();
            const correoActual = await AsyncStorage.getItem("correo")

            if(correoActual){
                const data: PerfilNinoResponseModel[] = response.data;
                
                const perfilesFiltrados = data.filter( (perfil) => 
                perfil.id_cuenta.correo === correoActual );

                setPerfiles(perfilesFiltrados);           
            }
        }
        catch(err){
            console.error(err);
            logOut();
        }
    };

    const onSelect = async (nombre: string, ruta_imagen: string, id: number, id_meta_fijada: number) => {
        try{
            await AsyncStorage.setItem("perfil_actual", nombre);
            await AsyncStorage.setItem("ruta_imagen", ruta_imagen);
            await AsyncStorage.setItem("perfil_actual_id", id.toString());

            if (id_meta_fijada) {
                await AsyncStorage.setItem("id_meta_fijada", id_meta_fijada.toString());
            } else {
                await AsyncStorage.setItem("id_meta_fijada", '');
            }

            navigation.navigate("BottomTabNavigator");
        }
        catch(err){
            console.error(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            ofPerfiles();
        }, [])
    );

    return (
        <LinearGradient 
            style={ styles.container }
            colors={[
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 58, 16, 1)',
            ]}
            locations={[-0.0745, 0.3689, 1.134]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            {/* Header */}
            <View style={ styles.header }>
                <Text style={ styles.headerText }>Seleccionar Perfil</Text>
                { 
                    perfiles.length > 0 && 
                        <BotonNuevoPerfil size={ 50 } onCreate={ 
                            () => navigation.navigate("CrearPerfilScreen") }
                        /> 
                }
            </View> 

            <View style={{ 
                ...styles.imgContainer,
                marginTop: ( perfiles.length === 0 ) ? 50 : 20,
                justifyContent: ( perfiles.length === 0) ? 'center': 'space-between'
            }}>
                {
                    perfiles.map((item) => 
                        <Perfil key={ item.nombre } username={ item.nombre } 
                        image={ item.ruta_imagen } onSelect={ () => onSelect(item.nombre, item.ruta_imagen, item.id_perfil, item.id_meta_fijada) } />
                    )
                }

                {
                    ( perfiles.length === 0 ) && 
                        <BotonNuevoPerfil size={ 130 } onCreate={ () => navigation.navigate("CrearPerfilScreen") }/>
                }
            </View>
                
            <View style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 25
            }}>

                {/* Cerrar sesión */}
                <TouchableOpacity 
                    style={ styles.button }
                    activeOpacity={ 0.8 }
                    onPress={ () => logOut() }
                >
                    <Text 
                        style={ styles.buttonText }
                    >
                        Cerrar Sesión
                    </Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'black'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
    },
    headerText: {
        fontSize: 33,
        marginLeft: 4,
        color: 'white',
        // fontWeight: '500',
        marginRight: 20,
        fontFamily: 'Roboto-Bold',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '400',
        fontFamily: 'Roboto-Bold',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 290,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
    },
});
