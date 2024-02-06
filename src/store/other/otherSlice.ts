import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CategoriaResponse, UsuarioResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    users: UsuarioResponse[];
    emails: string[];
    categorias: CategoriaResponse[];
}

const initialState: InitialStateInterface = {
    users: [],
    emails: [],
    categorias: [],
};

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: { 
        loadUsers(state, { payload }: PayloadAction<UsuarioResponse[]>){ 
            state.users = payload;
        },
        loadEmails(state, { payload }: PayloadAction<string[]>){
            state.emails = payload;
        },
        loadCategories(state, { payload }: PayloadAction<CategoriaResponse[]>){
            state.categorias = payload;
        },
    },
});

export const { loadUsers, loadEmails, loadCategories } = otherSlice.actions;
