import { obtenerCorreos, obtenerUsuarios } from "../../api";
import { AppDispatch } from "../store";
import { loadEmails, loadUsers } from "./otherSlice";

export const startLoadingUsers = () => {
    return async (dispatch: AppDispatch) => {
        try{
            const usuarios = (await obtenerUsuarios()).data;

            dispatch( loadUsers(usuarios) );
        }
        catch(error){
            console.error(error);
        }
    };
};

export const startLoadingEmails = () => {
    return async (dispatch: AppDispatch) => {
        try{
            const correos = await obtenerCorreos();

            dispatch( loadEmails(correos) );
        }
        catch(error){
            console.error(error);
        }
    };
};
