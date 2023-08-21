import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FotoPerfil } from './FotoPerfil';

interface Props {
    username: string;
    image: string;
    // Agregar imágen
    onSelect?: () => void;
};

const Perfil = ( { username, onSelect, image }: Props ) => {
    return (
        <View style={{ alignContent: 'center' }}>
            <TouchableOpacity
                style={ styles.container }
                activeOpacity={ 0.7 }
                onPress={ onSelect }
            >
                {/* <Icon name="person-circle-outline" size={ 180 } color="white" /> */}
                <FotoPerfil image={ image } size='medium' />
            </TouchableOpacity>
            <Text style={ styles.username }>{ username }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 110,
        borderWidth: 3,
        marginTop: 15,
        borderRadius: 200,
        overflow: 'hidden',
    },
    username: {
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    }
});

export default Perfil;