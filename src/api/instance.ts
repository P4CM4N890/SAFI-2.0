import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiInstance = axios.create({
    // baseURL: 'http://10.0.2.2:8000/', // Para el emulador.
    // baseURL: 'http://localhost:8000/', // Para dispositivo fisico.
    baseURL: 'http://52.191.94.172:8000/' // Azure
});

export const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
        return token;
    }
    
    return "";
};
