import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UsuarioEdit } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    uuid: number | null;
    email: string | null;
    nombre: string | null;
    token: string | null;
    fecha_de_nac: string | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    ruta_imagen: string | null;
    high_score: number | null;
    experiencia: number | null;
    errorMessage: string | null;
    recoverToken: { correo: string, token: string } | null;
    isSavingUser: boolean;
}

interface loginPayload {
    id: number;
    correo: string;
    nombre: string;
    fecha_de_nac: string;
    session_token: string;
    ruta_imagen: string;
    high_score: number;
    experiencia: number;
}

interface logoutPayload {
    message: string | null;
}

interface recoveryTokenPayload {
    correo: string;
    token: string;
}

const initialState: InitialStateInterface = {
    uuid: null,
    email: null,
    token: null,
    nombre: null,
    fecha_de_nac: null,
    status: 'not-authenticated',
    ruta_imagen: null,
    high_score: null,
    experiencia: null,
    errorMessage: null,
    recoverToken: null,
    isSavingUser: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        loginR(state, { payload }: PayloadAction<loginPayload>){ 
            state.status = 'authenticated';
            state.uuid = payload.id;
            state.email = payload.correo;
            state.nombre = payload.nombre;
            state.fecha_de_nac = payload.fecha_de_nac;
            state.token = payload.session_token;
            state.ruta_imagen = payload.ruta_imagen;
            state.high_score = payload.high_score;
            state.experiencia = payload.experiencia;
            state.errorMessage = '';
        },

        logout(state, { payload }: PayloadAction<logoutPayload>){
            state.status = 'not-authenticated';
            state.uuid = null;
            state.email = null;
            state.nombre = null;
            state.token = null;
            state.ruta_imagen = null;
            state.high_score = null;
            state.experiencia = null;
            state.errorMessage = payload.message;
        },

        signUp(state){
            state.status = 'checking';
            state.errorMessage = '';
        },

        checkingCredentials(state){ 
            state.status = 'checking';
        },

        setToken(state, { payload }: PayloadAction<recoveryTokenPayload>){
            state.recoverToken = { correo: payload.correo, token: payload.token };
        },

        changePassword(state){
            state.recoverToken = null;
        },

        setNewHighScore(state, { payload }: PayloadAction<number>){
            state.high_score = payload;
        },

        setNewExperience(state, { payload }: PayloadAction<number>){
            state.experiencia = (state.experiencia as number) + payload;
        },

        savingUser(state){
            state.isSavingUser = true;
        },

        updateUser(state, { payload }: PayloadAction<UsuarioEdit>){
            if(state.nombre !== payload.nombre){
                state.nombre = payload.nombre;
            }

            if(state.fecha_de_nac !== payload.fecha_de_nac){
                state.fecha_de_nac = payload.fecha_de_nac;
            }

            if(state.ruta_imagen !== payload.ruta_imagen){
                state.ruta_imagen = payload.ruta_imagen;
            }

            state.isSavingUser = false;
        },
    },
});

export const { loginR, logout, checkingCredentials, updateUser, savingUser,
    signUp, setToken, changePassword, setNewHighScore, setNewExperience } = authSlice.actions;
