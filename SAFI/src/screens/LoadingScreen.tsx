import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = () => {

    const { checkTokens } = useContext( AuthContext );

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const correoActual = await AsyncStorage.getItem("correo")
        const tokenActual = await AsyncStorage.getItem("session_token")

        // console.log({ correoActual, tokenActual })

        if( correoActual && tokenActual ) {
            checkTokens();
        }
    };

    return (
        <LinearGradient 
            style={ styles.container }
            colors={[
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 58, 16, 1)',
            ]}
            locations={[-0.0745, 0.3689, 1.134]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            <ActivityIndicator size={ 30 } color="white"/>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoadingScreen;