import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    option: string;
    onTouch: () => void;
}

const OpcionConfiguracion = ( { iconName, option, onTouch }: Props ) => {
    return (
        <TouchableOpacity 
            activeOpacity={ 0.7 }
            style={ styles.container }
            onPress={ () => onTouch() }
        >
            <Icon name={ iconName } size={ 30 } color='white'/>
            <Text style={ styles.optionText }>{ option }</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 55,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white'
    },
    optionText: {
        fontSize: 23,
        // fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
    }
});

export default OpcionConfiguracion;