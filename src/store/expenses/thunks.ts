import { actualizarGasto, crearGasto, eliminarGasto, obtenerGastos } from "../../api";
import { GastoCreate, GastoEdit, GastoResponse } from "../../interfaces/ApiInterfaces";
import { AppDispatch, RootState } from "../store";
import { addExpense, deleteExpense, loadExpenses, savingData, updateExpense } from "./expenseSlice";

export const startLoadingExpenses = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );

        try{
            const { data } = await obtenerGastos();

            dispatch( loadExpenses(data) );
        }
        catch(err){
            console.error(err);
        }
    };
};

export const startAddingExpense = (gasto: GastoCreate) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );
        
        try{
            const { data } = await crearGasto(gasto);

            let newGasto: GastoResponse = {
                ...gasto,
                id: data.id,
            };

            dispatch( addExpense(newGasto) );
        }
        catch(err){
            console.error(err);
        }
    };
};

export const startUpdatingExpense = (id: string, gasto: GastoEdit) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch( savingData() );

        const { gastos } = getState().expense;
        const index = gastos.findIndex( gasto => gasto.id === id );
        const newExpense: GastoResponse = {
            ...gastos[index],
            ...gasto,
        }

        try{
            await actualizarGasto(id, gasto);

            dispatch( updateExpense( { index, newExpense} ) );
        }
        catch(err){
            console.error(err);
        }
    };
};

export const startDeletingExpense = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );
        
        try{
            await eliminarGasto(id);

            dispatch( deleteExpense(id) );
        }
        catch(err){
            console.error(err);
        }
    };
};
