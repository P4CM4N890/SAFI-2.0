import { crearIngreso, obtenerIngresos } from "../../api";
import { IngresoCreate, IngresoResponse } from "../../interfaces/ApiInterfaces";
import { AppDispatch, RootState } from "../store";
import { addIncome, loadIncomes, savingData } from "./incomeSlice";

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
