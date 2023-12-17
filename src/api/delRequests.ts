import axios, { AxiosError, AxiosResponse } from "axios";
import { apiInstance, checkToken } from './instance';

export const eliminarUsuario = async (correo: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/usuarios/${correo}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarCategoria = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/categoria/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarMeta = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/meta/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarIngreso = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/ingreso/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarAbono = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/abono/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarGasto = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/gasto/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarRecordatorio = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/recordatorio/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarPregunta = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/pregunta/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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

export const eliminarRespuesta = async (id: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/respuesta/${id}`;

    try {
        const response = await apiInstance.delete(url, config);

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
