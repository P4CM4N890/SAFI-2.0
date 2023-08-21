import React, { useCallback, useState } from 'react'
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../theme/appTheme';
import { CardsMetas } from '../components/CardsMetas'
import { HeaderScreens } from '../components/HeaderScreens';
import { obtenerPerfil, obtenerMetas } from '../api/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetaAhorroResponseModel, PerfilNinoResponseModel} from '../interfaces/ApiInterfaces';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerMeta } from '../api/GetRequests';

export const MetasScreen = () => {
    type itemType = {
        value: number
    }

    const [ metas, setMetas ] = useState<MetaAhorroResponseModel[]>([]);
    const [ metaFijada, setMetaFijada ] = useState<MetaAhorroResponseModel>();
    const [ refresh, setRefresh ] = useState(false);
    const [ flag, setflag ] = useState(false);
    const [ sumaMetas, setSumaMetas ] = useState(0);
    const [ dineroEnd, setDineroEnd ] = useState(1);
    const [ metasTerminadas, setMetasTerminadas ] = useState(0);
    
    
    const [ dineroMetas, setDineroMetas ] = useState<itemType[]>([])

    // Con esta función se van a recuperar las metas y contabilizarlas
    const verMetas = async () => {
        try{
            setDineroMetas([]);
            const perfil = await AsyncStorage.getItem("perfil_actual_id");

            if(perfil){
                const idPerfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;

                const arrayMetas: MetaAhorroResponseModel[] = (await obtenerMetas()).data;

                const filtroArrayMetas = arrayMetas.filter((profile) =>
                profile.id_perfil.id_perfil === idPerfil.id_perfil);

                // Variable temporal para contar las metas existentes
                let suma = 0;
                // Variable temporal para contar las metas que ya fueron finalizadas
                let sumaTerminadas = 0;
                let tempo = 0;


                for(var i=0; i<filtroArrayMetas.length; i++){

                    if(filtroArrayMetas[i].dinero_actual === filtroArrayMetas[i].objetivo){
                        sumaTerminadas++;
                    }

                    if(filtroArrayMetas[i].dinero_actual !== 0){
                        tempo = filtroArrayMetas[i].dinero_actual;
                        
                        setDineroMetas(dineroMetas => [...dineroMetas, { value : tempo}])          
                        setflag(true);
                    }
                    
                    suma++;
                };

                setSumaMetas(suma);
                setMetasTerminadas(sumaTerminadas);
                setMetas(filtroArrayMetas);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    const handleRefreshData = () => {
        setRefresh(!refresh);
    };


    const getMetaFija = async () => {
        try{
            const id_meta = await AsyncStorage.getItem("id_meta_fijada") || '';
        
            if (id_meta !== '0') {
                const data : MetaAhorroResponseModel = (await obtenerMeta(id_meta)).data;
                setDineroEnd(data.objetivo);
                setMetaFijada(data);
            }
            else{
                // Fix meta fijada
                setMetaFijada(undefined);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    // Ejecuta la función al cargar la ventana
    useFocusEffect(
        useCallback(() => {
            getMetaFija();
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
            <HeaderScreens title='Tus Metas' />
            <View style={styles.content}>
                <CardsMetas 
                    tipo='meta'
                    title={metaFijada?.nombre}
                    start={metaFijada?.fecha_inicio}
                    finish={metaFijada?.fecha_final}
                    resumen={metaFijada?.dinero_actual}
                    total={dineroEnd}
                />
                <CardsMetas 
                    tipo='resumen' 
                    metas={metasTerminadas}
                    metasTotal={sumaMetas}
                    datos={dineroMetas}
                    flag={flag}
                />
                <CardsMetas tipo='botones' />
                <CardsMetas tipo='add' />
            </View>
        </LinearGradient>
    );
};