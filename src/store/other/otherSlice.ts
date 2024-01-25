import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UsuarioResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    users: UsuarioResponse[];
}

const initialState: InitialStateInterface = {
    users: [],
};

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: { 
        loadUsers(state, { payload }: PayloadAction<UsuarioResponse[]>){ 
            state.users = payload;
        },
    },
});

export const { loadUsers } = otherSlice.actions;
