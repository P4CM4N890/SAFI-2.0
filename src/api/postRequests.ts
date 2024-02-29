import axios, { AxiosError, AxiosResponse } from 'axios';
import { apiInstance, checkToken } from './instance';
import { 
    AbonoCreate, CategoriaCreate, GastoCreate, IngresoCreate, 
    InicioSesion, MetaCreate, UsuarioCreate, ValidarToken, RecordatorioDePagoCreate, 
    PreguntaCreate, RespuestaCreate, MetaFijadaCreate, PredictorObject, LogroCreate,
    MetaCreateResponse, MetaFijadaCreateResponse, AbonoCreateResponse, PredecirMetaResponse, LogrosObtenidosResponse, LogroObtenidoCreate 
} from '../interfaces/ApiInterfaces';

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

export const generarTokenRecuperacion = async (correo: string): Promise<AxiosResponse> => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/token/generar_token/";

    let body = {
        correo
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

export const validarTokenRecuperacion = async (token: ValidarToken): Promise<AxiosResponse> => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/token/validar_token/";

    let body = {
        ...token
    };

    try {
        const response = await apiInstance.post<{ status: string }>(url, body, config);

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

export const crearUsuario = async (usuario: UsuarioCreate): Promise<AxiosResponse> => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/usuarios/";

    let body = {
        ...usuario,
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
}

export const crearMeta = async (meta: MetaCreate): Promise<AxiosResponse<MetaCreateResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/meta/";

    let body = {
        ...meta,
    };

    try {
        const response = await apiInstance.post(url, body, config);
        return response;

    } catch (err) {
        const errors = err as Error | AxiosError;
        
        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
}

export const crearCategoria = async (categoria: CategoriaCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/categoria/";

    let body = {
        ...categoria,
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
}

export const crearIngreso = async (ingreso: IngresoCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/ingreso/";

    let body = {
        ...ingreso,
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
}

export const crearAbono = async (abono: AbonoCreate): Promise<AxiosResponse<AbonoCreateResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/abono/";

    let body = {
        ...abono,
    };

    try {
        const response = await apiInstance.post(url, body, config);
        return response;
        
    } catch (err) {
        const errors = err as Error | AxiosError;
        
        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
}

export const crearGasto = async (gasto: GastoCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/gasto/";

    let body = {
        ...gasto,
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
}

export const crearRecordatorio = async (recordatorio: RecordatorioDePagoCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/recordatorio/";

    let body = {
        ...recordatorio,
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
}

export const crearPregunta = async (pregunta: PreguntaCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/pregunta/";

    let body = {
        ...pregunta,
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
}

export const crearRespuesta = async (respuesta: RespuestaCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/respuesta/";

    let body = {
        ...respuesta,
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
}

export const crearMetaFijada = async (metaFijada: MetaFijadaCreate): Promise<AxiosResponse<MetaFijadaCreateResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/metaFijada/";

    let body = {
        ...metaFijada,
    };

    try {
        const response = await apiInstance.post(url, body, config);
        return response;
        
    } catch (err) {
        const errors = err as Error | AxiosError;
        
        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
}

export const crearLogro = async (logro: LogroCreate): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/logro/";

    let body = {
        ...logro,
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
}

export const predecirMeta = async (predictor: PredictorObject): Promise<AxiosResponse<PredecirMetaResponse>> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/predictorMetas/";

    let body = {
        ...predictor,
    };

    try {
        const response = await apiInstance.post<PredecirMetaResponse>(url, body, config);

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

export const agregarLogro = async (id_usuario: number, id_logro: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/logrosObtenidos/`;

    let body: LogroObtenidoCreate = { 
        id_logro,
        id_usuario,
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
