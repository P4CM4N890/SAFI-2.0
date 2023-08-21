import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import OpcionConfiguracion from '../components/OpcionConfiguracion';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {};

export const ConfiguracionScreen = ({ navigation }: Props) => {

    const { logOut } = useContext( AuthContext );

    const onLogOut = async () => {
        try{
            logOut();
        }
        catch(err){
            console.error(err);
        }
    };

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
                <Text style={ styles.headerText }>Configuración</Text>
            </View>

            {/* Menú de opciones */}
            <View style={ styles.menu }>
                <OpcionConfiguracion option="Mi Cuenta" iconName="person-outline" 
                onTouch={ () => { navigation.navigate("MiCuentaScreen") } } />
                <OpcionConfiguracion option="Aviso de Privacidad" iconName="eye-off-outline" 
                onTouch={ () => { navigation.navigate("AvisoPrivacidadScreen") } } />
                <OpcionConfiguracion option="Preguntas Frecuentes" iconName="help-circle-outline" 
                onTouch={ () => { navigation.navigate("FAQScreen") } } />
                <OpcionConfiguracion option="Ajustes de Consejos" iconName="chatbox-ellipses-outline" 
                onTouch={ () => { navigation.navigate("EditarConsejosScreen") } } />
                <OpcionConfiguracion option="Cambiar de Perfil" iconName="person-circle-outline" 
                onTouch={ () => { navigation.navigate("SeleccionPerfilScreen") } } />
                <OpcionConfiguracion option="Cerrar Sesión" iconName="log-out-outline" 
                onTouch={ onLogOut } />
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
    menu: {
        marginTop: 45
    }
});