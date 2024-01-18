import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiInstance = axios.create({
    // baseURL: 'http://10.0.2.2:8000/', // Para el emulador.
    baseURL: 'http://localhost:8000/', // Para dispositivo fisico.
    // baseURL: 'http://20.253.41.120:8000/' // Azure
});

export const checkToken = async () => {
    const token = await AsyncStorage.getItem("session_token");

    if (token) {
        return token;
    }
    
    return "";
};
