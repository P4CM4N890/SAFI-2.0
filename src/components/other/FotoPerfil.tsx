import { Image, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';

interface params {
    image: ImageSourcePropType;
    size: 'small' | 'medium' | string;
};

interface img {
    src: ImageSourcePropType;
};

enum SIZE {
    small = 50,
    medium = 70,
    large = 100,
}

export const FotoPerfil = ({ image, size }: params) => {
    const imagen1: img = {
        src: require("../../assets/profile/Picture1.jpg"),
    }
    
    const imagen2: img = {
        src: require("../../assets/profile/Picture2.jpg"),
    }
    
    const imagen3: img = {
        src: require("../../assets/profile/Picture3.jpg"),
    }
    
    const imagen4: img = {
        src: require("../../assets/profile/Picture4.jpg"),
    }

    switch(image){
        case imagen1.src:
            return (
                <Image source={ imagen1.src } style={{
                    width: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    height: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    borderRadius: 35,
                }}/>
            );
        case imagen2.src:
            return (
                <Image source={ imagen2.src } style={{
                    width: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    height: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    borderRadius: 35,
                }}/>
            );
        case imagen3.src:
            return (
                <Image source={ imagen3.src } style={{
                    width: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    height: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    borderRadius: 35,
                }}/>
            );
        case imagen4.src:
            return (
                <Image source={ imagen4.src } style={{
                    width: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    height: (size === 'small') ? SIZE.small : (size === 'medium') ? SIZE.medium : 70,
                    borderRadius: 35,
                }}/>
            );
        default:
            return (
                <Text>Dios ayudame</Text> 
            );
    }
};