import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from 'react-native';
import { StyleSheet } from "react-native";
import consejos from "../assets/consejos.json"


interface Imagen {
    src: ImageSourcePropType;
}

interface Props {
    consejo: {
        titulo: string,
        descripcion: string,
    },
};

export const ConsejoCard = ({ consejo }: Props) => {
    const imagen_consejo: Imagen = {
        src: require('../assets/consejo.png')
    };
    const [ modal, setModal ] = useState<Boolean>(false);

    // const indiceAleatorio = Math.floor(Math.random() * consejos.length);
    const tipDelDia = consejo;

    return (
        <TouchableOpacity 
            style={!modal ? styles_card.general : styles_card.modal}
            onPress={() => setModal(!modal)}
        >
            <View style={styles_card.columna_texto}>
                <Text style={styles_card.texto_titulo}>{!modal ? 'CONSEJO DEL DIA:' : tipDelDia.titulo}</Text>
                <Text 
                    style={styles_card.modal_texto}
                    numberOfLines={(!modal) ? 4 : 100}
                    >
                    {tipDelDia.descripcion}
                </Text>
            </View>
            {
                (!modal) ?
                    <View style={styles_card.columna_imagen}>
                        <Image
                            source={imagen_consejo.src}
                            style={styles_card.imagenes}
                            />
                    </View>
                :
                    <></>
            }
        </TouchableOpacity>
    )
}


const styles_card = StyleSheet.create({
    general: {
        borderRadius: 15,
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d1110',
        flexDirection: 'row',
    },
    
    modal: {
        position: 'absolute',
        borderRadius: 15,
        flex: 1,
        marginHorizontal: 10,
        marginVertical: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d1110',
        flexDirection: 'row',
        paddingRight: 30,
        width: '95%',
        paddingVertical: 20,
        borderColor: '#888888',
        borderWidth: 2,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    modal_texto: {
        color: '#888888',
        textAlign: 'justify',
    },

    texto_titulo: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '800',
    },

    columna_texto: {
        flex: 5,
        flexDirection: 'column',
        marginLeft: 30,
    },

    columna_imagen: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    texto: {
        color: '#888888',
    },

    imagenes: {
        width: 48,
        height: 48,
        resizeMode: 'center'
    },
});