import { obtenerUsuarios } from "../../api";
import { AppDispatch } from "../store";
import { loadUsers } from "./otherSlice";

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
