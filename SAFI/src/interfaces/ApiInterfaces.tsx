
// POST

export interface CuentaBaseModel {
    nombre: string;
    correo: string;
    fecha_de_nac: string;
    password: string;
    token: string | null;
};

export interface InicioSesionBaseModel {
    correo: string;
    password: string;
};

export interface CorreoBaseModel {
    correo: string;
}

export interface VerificarTokenBaseModel {
    correo: string;
    token: string;
}

export interface CambiarPasswordBaseModel {
    correo: string;
    password: string;
}

export interface RecuperarCuentaBaseModel {
    correo: string;
    token: string;
    password: string; 
    passwordConfirm: string;
}

export interface PerfilNinoBaseModel {
    nombre: string;
    ahorro: number;
    ruta_imagen: string;
    id_cuenta: number;
};

export interface IngresoBaseModel {
    fecha_hora: string;
    cantidad: number;
    categoria: string;
    id_perfil: number;
};

export interface MetaAhorroBaseModel {
    fecha_inicio: string;
    fecha_final: string;
    nombre: string;
    dinero_actual: number;
    objetivo: number;
    id_perfil: number;
};

// GET

export interface CuentaResponseModel {
    id_cuenta: number;
    nombre: string;
    correo: string;
    fecha_de_nac: string;
    password: string;
};

export interface ReferenciaCuentaResponseModel {
    id_cuenta: number;
    nombre: string;
    correo: string;
};

export interface InicioSesionExitosoResponseModel {
    session_token: string;
    correo: string;
    nombre: string;
    fecha_de_nac: string;
};

export interface PerfilNinoResponseModel {
    id_perfil: number;
    nombre: string;
    ahorro: number;
    ruta_imagen: string;
    id_meta_fijada: number,
    id_cuenta: {
        correo: string;
        id_cuenta: number;
        nombre: string;
    };
};

export interface ReferenciaPerfilResponseModel {
    id_perfil: number;
    nombre: string;
};

export interface IngresoResponseModel {
    id_ingreso: number;
    fecha_hora: string;
    cantidad: number;
    categoria: string;
    id_perfil: {
        id_perfil: number;
        nombre: string;
    };
};

export interface MetaAhorroResponseModel {
    id_meta: number;
    fecha_inicio: string;
    fecha_final: string;
    nombre: string;
    dinero_actual: number;
    objetivo: number;
    id_perfil: {
        id_perfil: number;
        nombre: string;
    };
};

// PUT

export interface CuentaPutModel {
    nombre: string;
    correo: string;
    fecha_de_nac: string;
    password?: string;
};

export interface PerfilNinoPutModel {
    nombre: string;
    ahorro: number;
    ruta_imagen: string;
};

export interface PerfilNinoMetaFijadaPutModel {
    id_perfil: number,
    id_meta_fijada: number;
};

export interface IngresoPutModel {
    fecha_hora: string;
    cantidad: number;
    categoria: string; 
};

export interface MetaAhorroPutModel {
    fecha_final: string;
    nombre: string;
    dinero_actual: number;
    objetivo: number;
};
