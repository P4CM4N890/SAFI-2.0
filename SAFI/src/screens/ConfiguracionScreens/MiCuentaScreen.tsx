import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles, styles_signup } from '../../theme/appTheme';
import { OpcionPerfil } from '../../components/OpcionPerfil';
import { obtenerPerfiles } from '../../api/GetRequests';
import { PerfilNinoResponseModel } from '../../interfaces/ApiInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { eliminarPerfil } from '../../api/DelRequests';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {};

export const MiCuentaScreen = ({ navigation }: Props) => {
    const [ perfiles, setPerfiles ] = useState<PerfilNinoResponseModel[]>([]);
    const [ refresh, setRefresh ] = useState(false);
    const [ perfilActualId, setPerfilActualId ] = useState("");

    const ofPerfiles = async () => {
        try{
            const response = await obtenerPerfiles();
            const correoActual = await AsyncStorage.getItem("correo");
            const perfilAcId = await AsyncStorage.getItem("perfil_actual_id");

            if(correoActual){
                const data: PerfilNinoResponseModel[] = response.data;
                
                const perfilesFiltrados = data.filter( (perfil) => 
                perfil.id_cuenta.correo === correoActual );

                setPerfiles(perfilesFiltrados);              
            }

            if(perfilAcId){
                setPerfilActualId(perfilAcId);
            }
        }
        catch(err){
            console.error(err);
        }
    };

    const deleteProfile = async (id: string) => {
        try{
            await eliminarPerfil(id);

            handleRefreshData();
        }
        catch(err){
            console.error(err);
        }
    };

    const handleRefreshData = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        ofPerfiles();
    }, [refresh]);
    
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
            <View style={ stylesMiCuenta.header }>
                <Text style={ stylesMiCuenta.headerText }>Mi Cuenta</Text>
            </View>
            
            {
                perfiles.map((item) =>
                    perfilActualId !== item.id_perfil.toString() ?
                            <OpcionPerfil
                                key={ item.id_perfil }
                                profileName={ item.nombre }

                                onDelete={ () => deleteProfile(item.id_perfil.toString()) } 
                                image={ item.ruta_imagen }

                                onEdit={ () => { navigation.navigate("EditarPerfilScreen", 
                                { id: item.id_perfil, username: item.nombre, ahorro: item.ahorro, ruta_imagen: item.ruta_imagen }); handleRefreshData() } } 
                            />
                        :
                            <OpcionPerfil
                                key={ item.id_perfil }
                                profileName={ item.nombre }

                                onDelete={ () => deleteProfile(item.id_perfil.toString()) }
                                image={ item.ruta_imagen }

                                hideDelete
                                onEdit={ () => { navigation.navigate("EditarPerfilScreen", 
                                { id: item.id_perfil, username: item.nombre, ahorro: item.ahorro, ruta_imagen: item.ruta_imagen }); handleRefreshData() } } 
                            />
                )
            }
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity 
                    style={ stylesMiCuenta.editBtn }
                    activeOpacity={ 0.8 }
                    onPress={ () => { navigation.navigate("ModificarCuentaScreen") } }
                    >
                    <Text 
                        style={ stylesMiCuenta.editText }
                        >
                        Editar Datos de la Cuenta
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const stylesMiCuenta = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        marginTop: 35
    },
    headerText: {
        fontSize: 35,
        marginLeft: 27,
        color: 'white',
        fontWeight: '500',
        fontFamily: 'Roboto-Bold'
    },
    menu: {
        marginTop: 45
    },
    editText: {
        fontSize: 20,
        color: 'white',
        // fontWeight: '400',
        fontFamily: 'Roboto-Bold',
    },
    editBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 290,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'green'
    },
});
