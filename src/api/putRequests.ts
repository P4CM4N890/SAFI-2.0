import axios, { AxiosError, AxiosResponse } from "axios";
import { apiInstance, checkToken } from './instance';
import { AbonoEdit, CategoriaEdit, GastoEdit, IngresoEdit, MetaEdit, 
    UsuarioEdit, RecordatorioDePagoEdit, PreguntaEdit, 
    RespuestaEdit, MetaFijadaEdit } from '../interfaces/ApiInterfaces';

export const actualizarUsuario = async (correo: string, usuario: UsuarioEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/usuarios/${correo}`;

    let body = {
        ...usuario,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarCategoria = async (id: string, categoria: CategoriaEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/categoria/${id}`;

    let body = {
        ...categoria,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarMeta = async (id: string, meta: MetaEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/meta/${id}`;

    let body = {
        ...meta,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarIngreso = async (id: string, ingreso: IngresoEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/ingreso/${id}`;

    let body = {
        ...ingreso,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarAbono = async (id: string, abono: AbonoEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/abono/${id}`;

    let body = {
        ...abono,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarGasto = async (id: string, gasto: GastoEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/gasto/${id}`;

    let body = {
        ...gasto,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarRecordatorio = async (id: string, recordatorio: RecordatorioDePagoEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/recordatorio/${id}`;

    let body = {
        ...recordatorio,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarPregunta = async (id: string, pregunta: PreguntaEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/pregunta/${id}`;

    let body = {
        ...pregunta,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarRespuesta = async (id: string, respuesta: RespuestaEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/respuesta/${id}`;

    let body = {
        ...respuesta,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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

export const actualizarMetaFijada = async (id: string, metaFijada: MetaFijadaEdit): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/metaFijada/${id}`;

    let body = {
        ...metaFijada,
    }
    
    try {
        const response = await apiInstance.put(url, body, config);
        
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
