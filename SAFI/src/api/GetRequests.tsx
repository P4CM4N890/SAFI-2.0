import axios, { AxiosError, AxiosResponse } from "axios";
import { apiSafi } from "./Instance";
import { checkToken } from "./PostRequests";


export const obtenerCuentas = async (): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = "/cuenta";

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};

export const obtenerCuenta = async (correo: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/cuenta/${correo}`;

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }; 
};

export const obtenerPerfiles = async (): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = "/perfil_nino/";

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};

export const obtenerPerfil = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/perfil_nino/${id}`;

    try {
        const response = await apiSafi.get(url, config);
        console.log(response.data);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};

export const obtenerIngresos = async (): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = "/ingreso";

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};

export const obtenerIngreso = async (id_ingreso: number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/ingreso/${id_ingreso}`;

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};

export const obtenerMetas = async (): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = "/meta";

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};

export const obtenerMeta = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();
    
    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/meta/${id}`;

    try {
        const response = await apiSafi.get(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
};
