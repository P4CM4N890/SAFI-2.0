import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import preguntas from '../../assets/preguntas_frecuentes.json';
import { TituloDescripcionCard } from '../../components/TituloDescripcionCard';

export const FAQScreen = () => {
    const preguntasF = preguntas;

    return (
        // <ScrollView>
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
                    <Text style={ styles.headerText }>Preguntas Frecuentes</Text>
                </View>

                {/* Mensaje */}
                {/* <Text style={{ marginTop: 40, ...styles.message }}>
                    <Text style={{ fontWeight: 'bold' }}>Atención: </Text>
                    <Text>
                    Aún no nos han preguntado nada, y probablemente nunca lo hagan.
                    </Text>
                </Text> */}

                {
                    preguntasF.map((item) => 
                        <TituloDescripcionCard key={ item.titulo } elemento={ item }/>
                    )
                }

            </LinearGradient>
        // </ScrollView>
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
        fontFamily: 'Roboto-Bold',
        // fontWeight: '500',
    },
    message: {
        fontSize: 18, 
        color: 'white',
        textAlign: 'justify',
        fontFamily: 'Roboto-Regular',
    },
});
