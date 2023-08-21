import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import CustomSwitch from '../../components/CustomSwitch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

interface Props extends StackScreenProps<any, any> {};

export const EditarConsejosScreen = ({ navigation }: Props) => {
    const [ isAllowed, setIsAllowed ] = useState(true);

    const updateSettings = async (value: Boolean) => {
        const path = RNFS.DocumentDirectoryPath + '/settings.json';
        

        if (!await RNFS.exists(path)) {
            RNFS.writeFile(path, JSON.stringify({
                tips: (value) ? 1 : 0
            }), 'utf8')
                .then(() => {
                    console.log('Archivo Settings actualizado.');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const getPrevConfig = async () => {
        const prevConfig = await AsyncStorage.getItem("allow-consejos");
        setIsAllowed((prevConfig === '1'));
    }

    const onToggle = async ( value: boolean ) => {
        setIsAllowed(value);
        const stringValue = value ? "1" : "0";
        updateSettings(value);

        
        await AsyncStorage.setItem("allow-consejos", stringValue);
    };

    useEffect(() => {
        getPrevConfig();
    }, [])
    

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
                <Text style={ styles.headerText }>Consejos</Text>
            </View>

            {/* Mensaje */}
            <Text style={{ marginTop: 40, ...styles.message }}>
                <Text style={{ fontWeight: 'bold' }}>Atención: </Text>
                <Text>
                    Los consejos son una recopilación de sugerencias que a muchas personas les han ayudado a tener una mejor administración financiera, seguir los consejos le ayudará a saber administrar mejor su dinero, sin embargo, si tienes problemas serios al administrarte deberia de consultar a un asesor financiero.
                </Text>
            </Text>

            <View style={ styles.permissionContainer }>
                <Text style={ styles.permissionText }>
                    Deseo recibir consejos financieros en la pantalla principal de la aplicación
                </Text>
                <CustomSwitch isOn={ isAllowed } onChange={ ( value ) => onToggle(value) }/>
            </View>
            
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        marginTop: 35
    },
    headerText: {
        fontSize: 35,
        marginLeft: 4,
        color: 'white',
        // fontWeight: '500'
        fontFamily: 'Roboto-Bold',
    },
    message: {
        fontSize: 18, 
        color: 'white',
        textAlign: 'justify',
        fontFamily: 'Roboto-Regular',
    },
    permissionText: {
        width: '80%',
        fontSize: 16,
        color: 'white',
        fontFamily: 'Roboto-Regular',
    },
    permissionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        height: 80,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black'
    }
});