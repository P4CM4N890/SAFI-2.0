import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const LoadingScreen = () => {
    const { checkTokens } = useContext( AuthContext );

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const correoActual = await AsyncStorage.getItem("correo")
        const tokenActual = await AsyncStorage.getItem("session_token")

        if( correoActual && tokenActual ) {
            checkTokens();
        }
    };

    return (
        <View className="w-full h-full items-center justify-center z-10">
            <ActivityIndicator size={ 30 } color="white"/>
        </View>
    );
};
