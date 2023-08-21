import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../theme/appTheme';
import { VerMetasCards } from '../components/VerMetasCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetaAhorroResponseModel, PerfilNinoResponseModel } from '../interfaces/ApiInterfaces';
import { obtenerPerfil, obtenerMetas } from '../api/GetRequests';
import { eliminarMeta } from '../api/DelRequests';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderScreens } from '../components/HeaderScreens';
import { useNavigation } from '@react-navigation/native';
import { actualizarPerfilMetaFijada } from '../api/PutRequests';
import { modalStyles } from '../theme/appTheme';


export const VerMetasScreen = () => {
    const [metas, setMetas] = useState<MetaAhorroResponseModel[]>([]);
    const [ refresh, setRefresh ] = useState(false);
    const [ modalText, setModalText ] = useState<string | null>(null);
    const [ modalVisible, setModalVisible ] = useState(false);

    const navigation = useNavigation();

    const verMetas = async () => {
        try{
            const perfil = await AsyncStorage.getItem("perfil_actual_id");

            if(perfil){
                const idPerfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;

                const arrayMetas: MetaAhorroResponseModel[] = (await obtenerMetas()).data;

                const filtroArrayMetas = arrayMetas.filter((profile) =>
                profile.id_perfil.id_perfil === idPerfil.id_perfil);

                setMetas(filtroArrayMetas);
            }
        }
        catch(err){
            setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
            setModalVisible(true);
        }
    };

    const deleteMeta = async (id: number) => {
        try{
            const perfil = await AsyncStorage.getItem("perfil_actual_id");

            if(perfil){
                const idPerfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;
                if(idPerfil.id_meta_fijada === id){
                    await eliminarMeta(id);
                    actualizarPerfilMetaFijada(idPerfil.id_perfil, 0);
                    await AsyncStorage.setItem("id_meta_fijada", '0');
                    handleRefreshData();
                }
                else{
                    await eliminarMeta(id);
                    setModalText("Se ha eliminado la meta.");
                    setModalVisible(true);
                    handleRefreshData();
                }
            }
        }
        catch(err){
            console.log(err);
        }
    };

    const editMeta = async () => {
        try{
            
        }
        catch(err){
            console.log(err);
        }
    };

    const handleRefreshData = () => {
        setRefresh(!refresh);
    };

    // Ejecuta la función al cargar la ventana
    useFocusEffect(
        useCallback(() => {
            verMetas();
          },
          [refresh],
        )
        
    );

    return (
        <LinearGradient style={ styles.container }
        colors={[
                'rgba(0, 58, 16, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
            ]}
            start={{x : 1, y : 0}}
            end={{x : 0, y: 1}}
            locations={[0, 0.4, 1]}
        >
            <View style = { styles.header_column }>
                <View style={ styles.boxHeader1_column }>
                    <View style={ styles.photo }>
                        <HeaderScreens title='Todas las metas' />
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <Modal 
                    animationType="fade"
                    transparent={ true }
                    visible={ modalVisible }
                    onRequestClose={ () => {
                        setModalVisible(!modalVisible);
                    } }
                >
                    <View style={ modalStyles.centeredView }>
                        <View style={ modalStyles.modalView }>
                            <Text style={ modalStyles.modalText }>{ modalText }</Text>
                            {
                                (modalText === 'Ha ocurrido un error. Intentalo de nuevo más tarde.') ?
                                    <Image
                                        style={{ width: 150, height: 150, marginBottom: 10 }}
                                        source={require('../assets/4.png')}
                                    />
                                :
                                    <></>
                            }
                            <TouchableOpacity
                                style={ [modalStyles.button, modalStyles.buttonClose] }
                                onPress={ () => {
                                    setModalVisible(!modalVisible)
                                    setModalVisible(false);
                                    
                                } }
                            >
                                <Text style={ modalStyles.textStyle }>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    {
                        metas.map((item) => 
                            <VerMetasCards
                                key={item.id_meta}
                                title={item.nombre}
                                start={item.fecha_inicio}
                                finish={item.fecha_final}
                                resumen={item.dinero_actual}
                                total={item.objetivo}
                                onDelete={ () => deleteMeta(item.id_meta) }
                                onEdit={() => { navigation.navigate("EditMeta", { 
                                    id: item.id_meta,
                                    nombre: item.nombre,
                                    fecha: item.fecha_final,
                                    dinero: item.dinero_actual,
                                    objetivo: item.objetivo
                            });
                                handleRefreshData() } }
                            />
                        )
                    }
                </ScrollView>
            </View>
        </LinearGradient>
    );
};