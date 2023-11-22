import axios, { AxiosError, AxiosResponse } from "axios";
import { apiInstance, checkToken } from './instance';
import { AbonoResponse, CategoriaResponse, GastoResponse, IngresoResponse, 
    MetaFijadaResponse, MetaResponse, PreguntaResponse, RecordatorioDePagoResponse, 
    RespuestaResponse, UsuarioResponse } from "../interfaces/ApiInterfaces";

export const obtenerUsuarios = async (): Promise<AxiosResponse<UsuarioResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = "/usuario/";

    try {
        const response = await apiInstance.get<UsuarioResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerUsuario = async (correo: number): Promise<AxiosResponse<UsuarioResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/usuario/${correo}`;

    try {
        const response = await apiInstance.get<UsuarioResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerCategorias = async (): Promise<AxiosResponse<CategoriaResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/categoria/`;

    try {
        const response = await apiInstance.get<CategoriaResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerCategoria = async (nombre: string): Promise<AxiosResponse<CategoriaResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/categoria/${nombre}`;

    try {
        const response = await apiInstance.get<CategoriaResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerMetas = async (): Promise<AxiosResponse<MetaResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/meta/`;

    try {
        const response = await apiInstance.get<MetaResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerMeta = async (id: string): Promise<AxiosResponse<MetaResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/meta/${id}`;

    try {
        const response = await apiInstance.get<MetaResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerIngresos = async (): Promise<AxiosResponse<IngresoResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/ingreso/`;

    try {
        const response = await apiInstance.get<IngresoResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerIngreso = async (id: string): Promise<AxiosResponse<IngresoResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/ingreso/${id}`;

    try {
        const response = await apiInstance.get<IngresoResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerAbonos = async (): Promise<AxiosResponse<AbonoResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/abono/`;

    try {
        const response = await apiInstance.get<AbonoResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerAbono = async (id: string): Promise<AxiosResponse<AbonoResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/abono/${id}`;

    try {
        const response = await apiInstance.get<AbonoResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerGastos = async (): Promise<AxiosResponse<GastoResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/gasto/`;

    try {
        const response = await apiInstance.get<GastoResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerGasto = async (id: string): Promise<AxiosResponse<GastoResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/gasto/${id}`;

    try {
        const response = await apiInstance.get<GastoResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerRecordatorios = async (): Promise<AxiosResponse<RecordatorioDePagoResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/recordatorio/`;

    try {
        const response = await apiInstance.get<RecordatorioDePagoResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerRecordatorio = async (id: string): Promise<AxiosResponse<RecordatorioDePagoResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/recordatorio/${id}`;

    try {
        const response = await apiInstance.get<RecordatorioDePagoResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerPreguntas = async (): Promise<AxiosResponse<PreguntaResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/pregunta/`;

    try {
        const response = await apiInstance.get<PreguntaResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerPregunta = async (id: string): Promise<AxiosResponse<PreguntaResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/pregunta/${id}`;

    try {
        const response = await apiInstance.get<PreguntaResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerRespuestas = async (): Promise<AxiosResponse<RespuestaResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/respuesta/`;

    try {
        const response = await apiInstance.get<RespuestaResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerRespuesta = async (id: string): Promise<AxiosResponse<RespuestaResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/respuesta/${id}`;

    try {
        const response = await apiInstance.get<RespuestaResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerMetasFijadas = async (): Promise<AxiosResponse<MetaFijadaResponse[]>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/metaFijada/`;

    try {
        const response = await apiInstance.get<MetaFijadaResponse[]>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

export const obtenerMetaFijada = async (id: string): Promise<AxiosResponse<MetaFijadaResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    let url = `/metaFijada/${id}`;

    try {
        const response = await apiInstance.get<MetaFijadaResponse>(url, config);
        
        return response;
    }
    catch(err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    };
}

