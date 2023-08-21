import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';

interface Props extends StackScreenProps<any, any> {};

interface Logo {
    src: ImageSourcePropType;
}

export const ConfirmarCuentaScreen = ( { navigation }: Props ) => {

    const logo: Logo = {
        src: require('../assets/logo.png')
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
                <Image 
                    source={ logo.src }
                    style={{
                        width: 48, 
                        height: 48,
                        resizeMode: 'center'
                    }}
                />
                <Text style={ styles.headerText }>SAFI</Text>
            </View>

            <View style={{
                alignItems: 'center',
                marginTop: 65
            }}>
                {/* Registo exitoso */}
                <Text style={ styles.title }>¡Tu registro ha sido exitoso!</Text>

                {/* Revisa tu e-mail */}
                <Text style={ styles.message }>Revisa tu correo electrónico para confirmar tu cuenta</Text>

                {/* Volver al login */}
                <TouchableOpacity 
                    style={ styles.button }
                    activeOpacity={ 0.8 }
                    onPress={ () => { navigation.navigate('InicioSesionScreen') } }
                >
                    <Text 
                        style={ styles.buttonText }
                    >
                        Regresar
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
        marginTop: 100
    },
    headerText: {
        fontSize: 45,
        marginLeft: 4,
        color: 'white',
        // fontWeight: '500',
        fontFamily: 'Roboto-Bold',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        // fontWeight: '400'
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
    title: {
        fontSize: 30,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30
    },
    message: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    }
});
