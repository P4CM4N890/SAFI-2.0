import axios, { AxiosError, AxiosResponse } from "axios";
import { CambiarPasswordBaseModel, CuentaPutModel, IngresoPutModel, MetaAhorroPutModel, PerfilNinoPutModel, PerfilNinoMetaFijadaPutModel } from "../interfaces/ApiInterfaces";
import { apiSafi } from "./Instance";
import { checkToken } from "./PostRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const actualizarCuenta = async (nombre: string, 
    correo: string, fecha_de_nac: Date, password?: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/cuenta/${correo}`;

    let fechaSQL = fecha_de_nac.toISOString().slice(0, 10);
    let body: CuentaPutModel = {
        "nombre": nombre,
        "correo": correo,
        "fecha_de_nac": fechaSQL,
    };

    if(password){
        body.password = password;
        console.log("se envio una password");
    }
    
    try {
        const response = await apiSafi.put(url, body, config);
        let data = response.data;

        return data;
    }
    catch (err) {
        const errors = err as Error | AxiosError;

        if(!axios.isAxiosError(errors)){
            throw new Error(errors.message);
        }

        throw new Error(errors.response?.data?.detail);
    }
};

export const cambiarContraseña = async (correo: string, password: string): 
    Promise<AxiosResponse> => {
    
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let url = "/recuperar-cuenta/password";

    let body: CambiarPasswordBaseModel = {
        "correo": correo,
        "password": password
    };

    try {
        const response = await apiSafi.put(url, body, config);
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

export const actualizarIngreso = async (id_ingreso: number, fecha_hora: Date, 
    cantidad: number, categoria: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/ingreso/${id_ingreso}`;

    let fechaSQL = fecha_hora.toISOString().slice(0, 19).replace('T', ' ');
    let body: IngresoPutModel = {
        "fecha_hora": fechaSQL,
        "cantidad": cantidad,
        "categoria": categoria,
    };

    try {
        const response = await apiSafi.put(url, body, config);

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

export const actualizarPerfil = async (id: number, nombre: string, nuevoNombre: string, ahorro: number, 
    ruta_imagen: string): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/perfil_nino/${id}`;
    console.log(url);
    

    let body: PerfilNinoPutModel = {
        "nombre": nuevoNombre,
        "ahorro": ahorro,
        "ruta_imagen": ruta_imagen,
    };

    try {
        const response = await apiSafi.put(url, body, config);

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

export const actualizarPerfilMetaFijada = async (id: number, id_meta_fijada: number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/perfil_nino/fijar_meta/`;
    console.log(url);
    

    let body: PerfilNinoMetaFijadaPutModel = {
        "id_perfil": id,
        "id_meta_fijada": id_meta_fijada
    };

    try {
        const response = await apiSafi.put(url, body, config);

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

export const actualizarMeta = async (fecha_final: Date, nombre: string, 
    dinero_actual: number, objetivo: number, id_meta: number): Promise<AxiosResponse> => {
    const token = await checkToken();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    let url = `/meta/${id_meta}`;
    
    let fechaFinalSQL = fecha_final.toISOString().slice(0, 10);
    let body: MetaAhorroPutModel = {
        "fecha_final": fechaFinalSQL,
        "nombre": nombre,
        "objetivo": objetivo,
        "dinero_actual": dinero_actual,
    };

    try {
        const response = await apiSafi.put(url, body, config);

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
