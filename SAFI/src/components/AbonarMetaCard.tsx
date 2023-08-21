import React from "react";
import { View, Text, StyleSheet, ImageSourcePropType, Image, TouchableOpacity } from "react-native";
import * as Progress from 'react-native-progress';

interface Icono {
    src: ImageSourcePropType;
};

type CardProps = {
    title: string;
    start: string;
    finish: string;
    resumen: number;
    total: number;
    onTouch?: () => void;
};

export const AbonarMetaCards = (props: CardProps) => {
    return (
        <TouchableOpacity style={styles.containerMeta}
            onPress={ props.onTouch }
        >
            <View style={styles.content}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                <View style={styles.containerFecha}>
                    <View style={styles.fecha}>
                        <View style={styles.boxFecha}>
                            <Text style={styles.texto}>Fecha de Inicio:</Text>
                        </View>
                        <View style={styles.boxFecha}>
                            <Text style={styles.textoFecha}>{props.start}</Text>
                        </View>
                    </View>
                    <View style={styles.fecha}>
                        <View style={styles.boxFecha}>
                            <Text style={styles.texto}>Fecha a Finalizar:</Text>
                        </View>
                        <View style={styles.boxFecha}>
                            <Text style={styles.textoFecha}>{props.finish}</Text>
                        </View>
                    </View>
                </View>
                {/* Barra de progreso */}
                <View style={styles.containerProgress}>
                    <Text style={styles.textoGrande}>${props.resumen} / ${props.total}</Text>
                    <Progress.Bar 
                        progress={(props.resumen)/(props.total)}
                        color={colores.verdeLimon}
                        height={8}
                        width={300}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const colores = {
    primary: '#1E1E1E',
    footer: '#090B0A',
    title: 'white',
    tabsActiveColor: '#7a7979',
    tabsInactiveColor: '#ffffff',
    bg: '#1B221F',
    borderC: '#51595D',
    texto: '#888888',
    verde: '#214E28',
    azul: '#212B4E',
    verdeLimon: '#5CE998',
};

const styles = StyleSheet.create({
    containerMeta: {
        flex: 0.32,
        minHeight: 130,
        backgroundColor: colores.bg,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colores.borderC,
        margin: 15,
        flexDirection: 'row',
    },

    containerTitle: {
        flex: 0.7,
    },

    containerFecha: {
        flex: 0.6,
    },

    content: {
        flex: 1,
    },

    bttns: {
        flex: 0.12,
        flexDirection: 'column',
    },

    containerBtton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colores.borderC,
    },

    bttn1: {
        borderBottomWidth: 1,
    },

    bttn2: {
        borderTopWidth: 1,

    },

    toucha: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fecha: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    boxFecha: {
        flex: 1,
        alignItems: 'center',
    },

    containerProgress: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },

    title: {
        fontSize: 20,
        color: colores.title,
        marginTop: 10,
        marginLeft: 15,
    },

    textoGrande: {
        fontSize: 18,
        color: colores.texto,
        marginLeft: 5,
    },

    textoFecha: {
        fontSize: 15,
        color: colores.texto,
        fontWeight: 'bold',
    },

    texto: {
        fontSize: 15,
        color: colores.texto,
    },
});