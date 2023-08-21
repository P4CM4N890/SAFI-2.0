import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    onCreate: () => void;
    size: number;
};

const BotonNuevoPerfil = ({ onCreate, size }: Props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={ onCreate }
                activeOpacity={ 0.7 }
            >
                <Icon name="add-circle-outline" size={ size } color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default BotonNuevoPerfil;