import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateInterface {
    uuid: number | null;
    email: string | null;
    nombre: string | null;
    token: string | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    ruta_imagen: string | null;
    high_score: number | null;
    experiencia: number | null;
    errorMessage: string | null;
}

interface loginPayload {
    id: number;
    correo: string;
    nombre: string;
    session_token: string;
    ruta_imagen: string;
    high_score: number;
    experiencia: number;
}

interface logoutPayload {
    message: string | null;
}

const initialState: InitialStateInterface = {
    uuid: null,
    email: null,
    token: null,
    nombre: null,
    status: 'not-authenticated',
    ruta_imagen: null,
    high_score: null,
    experiencia: null,
    errorMessage: null,
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

        checkingCredentials(state){ 
            state.status = 'checking';
        },
    },
});

export const { loginR, logout, checkingCredentials } = authSlice.actions;
