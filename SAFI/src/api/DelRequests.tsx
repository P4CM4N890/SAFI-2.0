import axios, { AxiosError, AxiosResponse } from "axios";
import { apiSafi } from "./Instance";
import { checkToken } from "./PostRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const eliminarCuenta = async (correo: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/cuenta/${correo}`;

    try {
        const response = await apiSafi.delete(url, config);

        return response;
    }
    catch (err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
};

export const eliminarPerfil = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/perfil_nino/${id}`;
    console.log(url);
    

    try {
        const response = await apiSafi.delete(url, config);

        return response;
    }
    catch (err) {
        console.error(err);
        
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
};

export const eliminarIngreso = async (id_ingreso: number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/ingreso/${id_ingreso}`;

    try {
        const response = await apiSafi.delete(url, config);

        return response;
    }
    catch (err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
};

export const eliminarMeta = async (id:  number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/meta/${id}`;

    try {
        const response = await apiSafi.delete(url, config);

        return response;
    }
    catch (err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
};

