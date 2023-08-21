import React, {useState, useEffect, useCallback} from 'react'
import { View, Text } from 'react-native';
import { styles } from '../theme/appTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FotoPerfil } from './FotoPerfil';
import { useFocusEffect } from '@react-navigation/native';


interface Props {
    title: string;
}

export const HeaderScreens = ({title}: Props) => {
    const [ imagen, setImagen ] = useState("");

    // useEffect(() => {
    //     const getImg = async () => {
    //         const rutaImagen = await AsyncStorage.getItem("ruta_imagen");
    //         setImagen(rutaImagen || '');
    //     }
        
    //     getImg();
    // }, []);

    useFocusEffect(
        useCallback(() => {
            const getImg = async () => {
                const rutaImagen = await AsyncStorage.getItem("ruta_imagen");
                setImagen(rutaImagen || '');
            }
            
            getImg();
        }, [])
    );
    

    return (
        <View style = { styles.header_column }>
            <View style={ styles.boxHeader1_column }>
                <FotoPerfil image={ imagen } size='large' />
            </View>
            <View style={ styles.boxHeader2_column }>
                <Text style={ styles.title }>{title}</Text>
            </View>
        </View>
    )
}
