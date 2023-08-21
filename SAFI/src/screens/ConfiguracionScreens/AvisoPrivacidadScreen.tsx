import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text } from 'react-native';
import aviso from '../../assets/aviso_privacidad.json';
import { TituloDescripcionCard } from '../../components/TituloDescripcionCard';
import { ScrollView } from 'react-native-gesture-handler';

export const AvisoPrivacidadScreen = () => {
    const avisoPrivacidad = aviso;

    return (
        <ScrollView>
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
                    <Text style={ styles.headerText }>Aviso de Privacidad</Text>
                </View>

                {/* Mensaje */}
                <Text style={{ marginTop: 40, ...styles.message }}>
                    {/* <Text style={{ fontWeight: 'bold' }}>Atención: </Text> */}
                    <Text>
                        En cumplimiento con lo establecido en la legislación vigente en materia de 
                        protección de datos personales, se emite el siguiente aviso de privacidad:
                    </Text>
                </Text>

                {
                    avisoPrivacidad.map((item) =>
                        <TituloDescripcionCard key={ item.titulo } elemento={ item }/>
                    )
                }

                <Text style={{ marginTop: 20, ...styles.message }}>
                    <Text>
                        Si tiene alguna duda o desea ejercer alguno de sus derechos respecto a sus 
                        datos personales, por favor, póngase en contacto con nosotros a través de los 
                        medios proporcionados.
                    </Text>
                </Text>

                <Text style={{ marginTop: 40, ...styles.message }}>
                    <Text style={{ fontWeight: 'bold' }}>Fecha de última actualización: </Text>
                    <Text>
                        22 de mayo de 2023
                    </Text>
                </Text>

                <Text style={{ fontWeight: 'bold' }}>Atención: </Text>
            </LinearGradient>
        </ScrollView>
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
});
