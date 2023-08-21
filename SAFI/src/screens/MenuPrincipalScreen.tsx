import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../theme/appTheme';
import { MenuCard } from '../components/MenuCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FotoPerfil } from '../components/FotoPerfil';
import { obtenerPerfil } from '../api/GetRequests';
import { PerfilNinoResponseModel } from '../interfaces/ApiInterfaces';
import RNFS from 'react-native-fs';
import { ConsejoCard } from '../components/ConsejoCard';
import consejos from '../assets/consejos.json';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {};

export const MenuPrincipalScreen = ({ navigation }: Props) => {

    const [ imagen, setImagen ] = useState("");
    const [ ahorro, setAhorro ] = useState(0);
    const [ nombre, setNombre ] = useState("");
    const [ showTips, setShowTips ] = useState(1);

    const indiceAleatorio = Math.floor(Math.random() * consejos.length);
    const tipDelDia = consejos[indiceAleatorio];

    const checkSettings = async () => {
        const path = RNFS.DocumentDirectoryPath + '/settings.json';

        if (!await RNFS.exists(path)) {
            RNFS.writeFile(path, JSON.stringify({tips: 1}), 'utf8')
                .then(() => {
                    console.log('Archivo Settings creado.');
                })
                .catch((error) => {
                    console.log(error);
                });
            setShowTips(1);
        } else {
            console.log("Settings existe");
            const actualConfig = await AsyncStorage.getItem("allow-consejos");
            
            console.log({actualConfig});
            if (actualConfig === '1') {
                setShowTips(1);
            } else if (actualConfig === '0') {
                setShowTips(0);
            } else {
                RNFS.readFile(path, 'utf8')
                    .then((contenido) => {
                        const settings = JSON.parse(contenido);
                        
                        setShowTips(settings.tips);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }

    const obtenerDatos = async () => {
        try{
            const perfilActual = await AsyncStorage.getItem("perfil_actual_id");
            const imgActual = await AsyncStorage.getItem("ruta_imagen") || '';

            if (perfilActual) {
                const response: PerfilNinoResponseModel = (await obtenerPerfil(perfilActual)).data;
                const foto_perfil = response.ruta_imagen;

                // console.log({ rutaImagen })

                if(foto_perfil){
                    setImagen(imgActual);
                }

                setAhorro(response.ahorro);
                setNombre(response.nombre);
            }
        }
        catch(err){
            console.error(err);
        }
    };
    
    useFocusEffect(
        useCallback(() => {
            obtenerDatos();
            checkSettings();
        }, [])
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
            <View style={ styles.header }>
                <View style={ styles.boxHeader1 }>
                    <Text style={ styles.bienvenida }>¡Bienvenido 
                        <Text style={{ ...styles.title, fontWeight: 'bold' }}> { nombre } </Text>!
                    </Text>
                </View>
                <TouchableOpacity style={ styles.boxHeader2 } onPress={ () => { navigation.navigate("SeleccionPerfilScreen") } }>
                    <View style={ styles.photo }>
                        <FotoPerfil image={ imagen } size='medium' />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <MenuCard tipo='ahorro' ahorro={ ahorro } />
                <MenuCard tipo='metas' navegar={() => navigation.navigate("MetasStackNavigator")} />
                <MenuCard tipo='ingresos' navegar={() => navigation.navigate("IngresosStackNavigator")}/>
                {
                    showTips ?
                        <ConsejoCard consejo={ tipDelDia }/>
                    :
                        <></>
                }
            </View>
        </LinearGradient>
    );
};
