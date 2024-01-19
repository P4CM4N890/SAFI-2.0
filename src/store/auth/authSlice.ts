import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateInterface {
    uuid: number | null;
    email: string | null;
    token: string | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage: string | null;
}

interface loginPayload {
    id: number;
    correo: string;
    session_token: string;
}

interface logoutPayload {
    message: string | null;
}

const initialState: InitialStateInterface = {
    uuid: null,
    email: null,
    token: null,
    status: 'not-authenticated',
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
            state.token = payload.session_token;
            state.errorMessage = '';
        },

        logout(state, { payload }: PayloadAction<logoutPayload>){
            state.status = 'not-authenticated';
            state.uuid = null;
            state.email = null;
            state.token = null;
            state.errorMessage = payload.message;
        },

        checkingCredentials(state){ 
            state.status = 'checking';
        },
    },
});

export const { loginR, logout, checkingCredentials } = authSlice.actions;
