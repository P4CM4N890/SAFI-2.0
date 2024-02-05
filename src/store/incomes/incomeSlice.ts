import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IngresoResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    ingresos: IngresoResponse[];
    isSaving: boolean;
    errorMessage: string | null;
};

interface UpdateIncome {
    newIncome: IngresoResponse;
    index: number;
}

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
        updateIncome(state, { payload }: PayloadAction<UpdateIncome>){
            state.isSaving = false;
            state.ingresos[payload.index] = payload.newIncome;
        },
        deleteIncome(state, { payload }: PayloadAction<string>){
            state.isSaving = false;
            state.ingresos = state.ingresos.filter( ingreso => ingreso.id !== payload );
        },
    },
});

export const { savingData, loadIncomes, 
    addIncome, updateIncome, deleteIncome } = incomeSlice.actions;
