import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IngresoResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    ingresos: IngresoResponse[];
    isSaving: boolean;
    errorMessage: string | null;
};

const initialState: InitialStateInterface = {
    ingresos: [],
    isSaving: false,
    errorMessage: '',
};

export const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        savingData(state){
            state.isSaving = true;
        },
        loadIncomes(state, { payload }: PayloadAction<IngresoResponse[]>){
            state.isSaving = false;
            state.ingresos = [...payload];
        },
        addIncome(state, { payload }: PayloadAction<IngresoResponse>){
            state.isSaving = false;
            state.ingresos.push(payload);
        },
    },
});

export const { savingData, loadIncomes, addIncome } = incomeSlice.actions;
