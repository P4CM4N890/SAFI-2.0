import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    img: string;
    size?: number;
}

const OpcionAvatar = ( { img, size = 107 }: Props ) => {
    return (
        <TouchableOpacity 
            activeOpacity={ 0.7 }
            style={ styles.container }
        >
            <Icon name={ img } size={ size } color='white'/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }
});

export default OpcionAvatar;