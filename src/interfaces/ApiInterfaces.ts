
// POST

export interface UsuarioCreate {
    nombre: string
    correo: string
    contrasena: string
    fecha_de_nac: string
    ruta_imagen: string
    high_score: number
    experiencia: number
};

export interface TokenCreate {
    id_usuario: number
}

export interface InicioSesion {
    correo: string
    contrasena: string
}

export interface CambiarContrasena {
    correo: string
    password: string
}

export interface ValidarToken {
    correo: string
    token: string
}

export interface CategoriaCreate {
    nombre: string
    descripcion: string
}

export interface MetaCreate {
    id_usuario: number
    nombre: string
    cantidad: number
    descripcion: string
    fecha_inicio: string
    fecha_fin: string
    completada: number
    icono: string
    color: string
    prioridad: string
}

export interface MetaCreateResponse {
    nombre: string;
    id:     string;
}

export interface IngresoCreate {
    id_usuario: number
    nombre: string
    cantidad: number
    icono: string
    color: string
    fecha: string
}

export interface AbonoCreate {
    id_usuario: number
    cantidad: number
    id_meta_abonada: string
    fecha: string
}

export interface AbonoCreateResponse {
    status: string;
    id:     string;
}

export interface GastoCreate {
    id_usuario: number
    cantidad: number
    categoria: string
    color: string
    fecha: string
}

export interface RecordatorioDePagoCreate {
    id_usuario: number
    nombre: string
    fecha: string
    hora: string
    descripcion: string
}

export interface PreguntaCreate {
    id_usuario: number
    titulo: string
    descripcion: string
    fecha: string
    categoria: string
    likes: number
    id_usuario_liked: number[]
}

export interface RespuestaCreate {
    id_pregunta: string
    id_usuario: number
    cuerpo: string
    fecha: string
    likes: number
    id_usuario_liked: number[]
}

export interface MetaFijadaCreate {
    id_usuario: number
    id_meta: string
}

export interface MetaFijadaCreateResponse {
    status: string;
    id:     string;
}

export interface PredictorObject {
    id_usuario: number
    cantidad: number
    fecha_inicio: string
    fecha_fin: string
}

export interface LogroCreate {
    nombre: string
    descripcion: string
    experiencia: number
    cantidad_metas_cumplidas: number
}

export interface LogroObtenidoCreate {
    id_usuario: number;
    id_logro: string;
}

// GET

export interface UsuarioResponse {
    id_usuario: number
    nombre: string
    correo: string
    contrasena: string
    fecha_de_nac: string
    ruta_imagen: string
    high_score: number
    experiencia: number
}

export interface TokenResponse {
    id_token: number
    id_usuario: number
    token: string
}

export interface CategoriaResponse {
    id: string
    nombre: string
    descripcion: string
}

export interface MetaResponse {
    id: string
    id_usuario: number
    nombre: string
    cantidad: number
    descripcion: string
    fecha_inicio: string
    fecha_fin: string
    completada: number
    icono: string
    color: string
    prioridad: string
}

export interface IngresoResponse {
    id: string
    id_usuario: number
    nombre: string
    cantidad: number
    icono: string
    color: string
    fecha: string
}

export interface AbonoResponse {
    id: string
    id_usuario: number
    cantidad: number
    id_meta_abonada: string
    fecha: string
}

export interface GastoResponse {
    id: string
    id_usuario: number
    cantidad: number
    categoria: string
    color: string
    fecha: string
}

export interface RecordatorioDePagoResponse {
    id: string
    id_usuario: number
    nombre: string
    fecha: string
    hora: string
    descripcion: string
}

export interface PreguntaResponse {
    id: string
    id_usuario: number
    titulo: string
    descripcion: string
    fecha: string
    categoria: string
    likes: number
    id_usuario_liked: number[]
}

export interface RespuestaResponse {
    id: string
    id_pregunta: string
    id_usuario: number
    cuerpo: string
    fecha: string
    likes: number
    id_usuario_liked: number[]
}

export interface MetaFijadaResponse {
    id: string
    id_usuario: number
    id_meta: string
}

export interface LogroResponse {
    id: string
    nombre: string
    descripcion: string
    ruta_imagen: string
}

export interface LogrosObtenidosResponse {
    id: string
    id_usuario: number
    id_logro: string
}

export interface PredecirMetaResponse {
    prediccion: string;
    probabilidad: string;
}

// PUT

export interface UsuarioEdit {
    nombre: string
    correo: string
    contrasena?: string
    fecha_de_nac: string
    ruta_imagen: string
    high_score: number
    experiencia: number
}

export interface TokenEdit {
    token: string
}

export interface CategoriaEdit {
    nombre?: string
    descripcion?: string
}

export interface MetaEdit {
    nombre?: string
    cantidad?: number
    descripcion?: string
    fecha_inicio?: string
    fecha_fin?: string
    completada?: number
    icono?: string
    color?: string
    prioridad?: string
}

export interface MetaEditResponse {
    status: string;
}

export interface IngresoEdit {
    nombre?: string
    cantidad?: number
    icono?: string
    color?: string
    fecha?: string
}

export interface AbonoEdit {
    cantidad: number
    id_meta_abonada: string
    fecha: string
}

export interface GastoEdit {
    cantidad?: number
    categoria?: string
    color?: string
    fecha?: string
}

export interface RecordatorioDePagoEdit {
    nombre?: string
    fecha?: string
    hora?: string
    descripcion?: string
}

export interface PreguntaEdit {
    titulo?: string
    descripcion?: string
    likes?: number
    id_usuario_liked?: number[]
}

export interface RespuestaEdit {
    cuerpo?: string
    likes?: number
    id_usuario_liked?: number[]
}

export interface MetaFijadaEdit {
    id_meta?: string
}

export interface LogroEdit {
    nombre?: string
    descripcion?: string
    experiencia?: number
    cantidad_metas_cumplidas?: number
}

// DELETE

export interface MetaId {
    id: string;
}

export interface GoalContributionId {
    id: string;
}