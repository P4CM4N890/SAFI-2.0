import axios, { AxiosError, AxiosResponse } from 'axios';
import { apiInstance } from './instance';
import { InicioSesion, MetaCreate, UsuarioCreate } from '../interfaces/ApiInterfaces'

export const login = async (correo: string, password: string): 
    Promise<AxiosResponse> => {
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/sesion/login";

    let body: InicioSesion = {
        "correo": correo,
        "contrasena": password,
    };

    try {
        const response = await apiInstance.post(url, body, config);
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

export const crearUsuario = async (usuario: UsuarioCreate): Promise<AxiosResponse> => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/usuario/"

    let body = {
        ...usuario,
    }

    try {
        const response = await apiInstance.post(url, body, config);
        return response;
    }
    catch (err) {
        const errors = err as Error | AxiosError;
        
        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
}

export const crearMeta = async (meta: MetaCreate): Promise<AxiosResponse> => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/meta/"

    let body = {
        ...meta,
    }

    try {
        const response = await apiInstance.post(url, body, config);
        return response;
    }
    catch (err) {
        const errors = err as Error | AxiosError;
        
        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
}
