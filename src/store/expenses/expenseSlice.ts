import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GastoResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    gastos: GastoResponse[],
    isSaving: boolean;
    errorMessage: string | null;
}

interface UpdateExpense {
    newExpense: GastoResponse;
    index: number;
}

const initialState: InitialStateInterface = {
    gastos: [],
    isSaving: false,
    errorMessage: null,
};

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: { 
        savingData(state){
            state.isSaving = true;
        },
        loadExpenses(state, { payload }: PayloadAction<GastoResponse[]>){
            state.isSaving = false;
            state.gastos = payload;
        },
        addExpense(state, { payload }: PayloadAction<GastoResponse>){
            state.isSaving = false;
            state.gastos.push(payload);
        },
        updateExpense(state, { payload }: PayloadAction<UpdateExpense>){
            state.isSaving = false;
            state.gastos[payload.index] = { ...payload.newExpense };
        },
        deleteExpense(state, { payload }: PayloadAction<string>){
            state.isSaving = false;
            state.gastos = state.gastos.filter( gasto => gasto.id !== payload );
        }
    },
});

export const { savingData, loadExpenses, addExpense, 
    updateExpense, deleteExpense } = expenseSlice.actions;
