import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UsuarioResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    users: UsuarioResponse[];
    emails: string[];
}

const initialState: InitialStateInterface = {
    users: [],
    emails: [],
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
    },
});

export const { loadUsers, loadEmails } = otherSlice.actions;
