import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FotoPerfil } from './FotoPerfil';

interface Props {
    profileName: string;
    image: string;
    hideDelete?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const OpcionPerfil = ( { profileName, image, hideDelete, onEdit, onDelete }: Props ) => {
    return (
        <View 
            style={ styles.container }
        >
            {/* <Icon name="person-circle-outline" size={ 40 } color='white'/> */}
            <View style={ styles.icon }>
                <FotoPerfil image={ image } size='small' />
            </View>
            <Text style={ styles.optionText }>{ profileName }</Text>

            <View style={ styles.buttonContainer }>
                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ onEdit }
                >
                    <Icon name="create-outline" size={ 35 } color='white'/>
                </TouchableOpacity>
                {
                    !hideDelete ? 
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ onDelete }
                        >
                            <Icon style={ styles.icon } name="trash-outline" size={ 35 } color='white'/>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                        >
                            <View style={ styles.icon } />
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 60,
        paddingHorizontal: 5,
        marginBottom: 15,
        borderWidth: 0.4,
        borderColor: 'white',
        borderRadius: 10,
        margin: 20,
        marginTop: 30,
    },
    optionText: {
        fontSize: 23,
        // fontWeight: 'bold',
        color: 'white',
        marginLeft: 20,
        width: '50%',
        fontFamily: 'Roboto-Regular',
        // backgroundColor: 'red',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
        width: 35,
    },
});
