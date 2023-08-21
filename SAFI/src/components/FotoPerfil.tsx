import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';

interface params {
    image: string;
    size: string;
};

interface img {
    src: ImageSourcePropType;
};

export const FotoPerfil = ({ image, size }: params) => {
    const imagen1: img = {
        src: require("../assets/skipper.png"),
    }

    const imagen2: img = {
        src: require("../assets/willy.jpg"),
    }

    const imagen3: img = {
        src: require("../assets/generico2.jpg"),
    }

    const imagen4: img = {
        src: require("../assets/perro.png"),
    }

    const imagen5: img = {
        src: require("../assets/pokemon.png"),
    }

    const imagen6: img = {
        src: require("../assets/robot.png"),
    }

    switch(image){
        case 'skipper':
            return (
                <Image source={ imagen1.src } style={{
                    width: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    height: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    borderRadius: 35,
                }}/>
            );
        case 'willy':
            return (
                <Image source={ imagen2.src } style={{
                    width: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    height: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    borderRadius: 35,
                }}/>
            );
        case 'girl':
            return (
                <Image source={ imagen3.src } style={{
                    width: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    height: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    borderRadius: 35,
                }}/>
            );
        case 'perro':
            return (
                <Image source={ imagen4.src } style={{
                    width: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    height: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    borderRadius: 35,
                }}/>
            );
        case 'pokemon':
            return (
                <Image source={ imagen5.src } style={{
                    width: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    height: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    borderRadius: 35,
                }}/>
            );
        case 'robot':
            return (
                <Image source={ imagen6.src } style={{
                    width: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    height: (size === 'small') ? 40 : (size === 'medium') ? "100%" : 70,
                    borderRadius: 35,
                }}/>
            );
        default:
            return (
                <TouchableOpacity>
                    <Text>Dios ayudame</Text>
                </TouchableOpacity>
            );
    }
};
