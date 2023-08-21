import axios, { AxiosError, AxiosResponse } from "axios";
import { CambiarPasswordBaseModel, CorreoBaseModel, CuentaBaseModel, IngresoBaseModel, InicioSesionBaseModel, InicioSesionExitosoResponseModel, MetaAhorroBaseModel, PerfilNinoBaseModel, VerificarTokenBaseModel } from "../interfaces/ApiInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSafi } from "./Instance";

export const login = async (correo: string, password: string): 
    Promise<AxiosResponse> => {
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/sesion/login";

    let body: InicioSesionBaseModel = {
        "correo": correo,
        "password": password,
    };

    try {
        const response = await apiSafi.post(url, body, config);
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

export const checkToken = async () => {
    const token = await AsyncStorage.getItem("session_token");

    if (token) {
        return token;
    }
    
    return "";
};

export const crearCuenta = async (nombre: string, correo: string, fecha_de_nac: Date, 
    password: string): Promise<AxiosResponse> => {
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/cuenta/";

    let fechaSQL = fecha_de_nac.toISOString().slice(0, 10);
    let body: CuentaBaseModel = {
        "nombre": nombre,
        "correo": correo,
        "fecha_de_nac": fechaSQL,
        "password": password,
        "token": null
    };

    try {
        const response = await apiSafi.post(url, body, config);

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

export const obtenerTokenRecuperacion = async (correo: string): 
    Promise<AxiosResponse> => {
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/recuperar-cuenta";

    let body: CorreoBaseModel = {
        "correo": correo
    };

    try {
        const response = await apiSafi.post(url, body, config);
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

export const validarTokenRecuperacion = async (correo: string, token: string): 
    Promise<AxiosResponse> => {
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/recuperar-cuenta/validar";

    let body: VerificarTokenBaseModel = {
        "correo": correo,
        "token": token
    };

    try {
        const response = await apiSafi.post(url, body, config);
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

export const crearPerfil = async (nombre: string, ahorro: number, 
    ruta_imagen: string, id_cuenta: number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/perfil_nino";

    let body: PerfilNinoBaseModel = {
        "nombre": nombre,
        "ahorro": ahorro,
        "ruta_imagen": ruta_imagen,
        "id_cuenta": id_cuenta,
    };

    try {
        const response = await apiSafi.post(url, body, config);

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

export const crearIngreso = async (fecha_hora: Date, cantidad: number, 
    categoria: string, id_perfil: number): Promise<AxiosResponse> => {
    const token = await checkToken();
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/ingreso";

    let fechaSQL = fecha_hora.toISOString().slice(0, 19).replace('T', ' ');
    let body: IngresoBaseModel = {
        "fecha_hora": fechaSQL,
        "cantidad": cantidad,
        "categoria": categoria,
        "id_perfil": id_perfil,
    };

    try {
        const response = await apiSafi.post(url, body, config);

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

export const crearAhorro = async (fecha_inicio: Date, 
    fecha_final: Date, nombre: string, dinero_actual: number, objetivo: number, 
    id_perfil: number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = "/meta";

    let fechaInicioSQL = fecha_inicio.toISOString().slice(0, 10);
    let fechaFinalSQL = fecha_final.toISOString().slice(0, 10);
    let body: MetaAhorroBaseModel = {
        "fecha_inicio": fechaInicioSQL,
        "fecha_final": fechaFinalSQL,
        "nombre": nombre,
        "dinero_actual": dinero_actual,
        "objetivo": objetivo,
        "id_perfil": id_perfil,
    };

    try {
        const response = await apiSafi.post(url, body, config);

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
