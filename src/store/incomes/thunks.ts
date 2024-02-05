import { actualizarIngreso, crearIngreso, eliminarIngreso, obtenerIngresos } from "../../api";
import { IngresoCreate, IngresoEdit, IngresoResponse } from "../../interfaces/ApiInterfaces";
import { AppDispatch, RootState } from "../store";
import { addIncome, deleteIncome, loadIncomes, savingData, updateIncome } from "./incomeSlice";

export const startLoadingIncomes = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch( savingData() );

        const { uuid } = getState().auth;

        try{
            const { data } = await obtenerIngresos();
            const ingresosFiltrados = data.filter( ingreso => ingreso.id_usuario === uuid );
            
            dispatch( loadIncomes( ingresosFiltrados ) );
        }
        catch(err){
            console.error(err);
        }
    };
};

export const startAddingIncome = (ingreso: IngresoCreate) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );
        
        try{
            const { data } = await crearIngreso(ingreso);

            let newIngreso: IngresoResponse = {
                ...ingreso,
                id: data.id,
            }

            dispatch( addIncome(newIngreso) );
        }
        catch(error){
            console.error(error);
        }
    };
};

export const startUpdatigIncome = (id: string, ingreso: IngresoEdit) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch( savingData() );
        const { ingresos } = getState().income;

        const index = ingresos.findIndex( ingreso => ingreso.id === id );
        const newIncome: IngresoResponse = {
            ...ingresos[index],
            ...ingreso,
        }

        try{
            await actualizarIngreso(id, ingreso);

            dispatch( updateIncome({index, newIncome}) )
        }
        catch(err){
            console.error(err);
        }
    };
};

export const startDeletingIncome = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );

        try{
            await eliminarIngreso(id);

            dispatch( deleteIncome(id) );
        }
        catch(err){
            console.error(err);
        }
    };
};
