import React from 'react'
import { StyleSheet, Text } from 'react-native';

interface Props {
    elemento: {
        titulo: string,
        descripcion: string,
    }
};

export const TituloDescripcionCard = ( { elemento }: Props) => {
    return (
        <Text style={{ marginTop: 40, ...styles.message }}>
            <Text style={{ fontWeight: 'bold' }}>{ elemento.titulo } </Text>
            <Text>{ elemento.descripcion }</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    message: {
        fontSize: 18, 
        color: 'white',
        textAlign: 'justify',
        fontFamily: 'Roboto-Regular',
    },
});
