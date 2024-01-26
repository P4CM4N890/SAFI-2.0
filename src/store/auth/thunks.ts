import AsyncStorage from "@react-native-async-storage/async-storage";
import { crearUsuario, login } from "../../api";
import { AppDispatch } from "../store";
import { checkingCredentials, loginR, logout, signUp } from "./authSlice";
import { UsuarioCreate } from "../../interfaces/ApiInterfaces";

export const startLogin = (correo: string, contrasena: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch( checkingCredentials() );
        
        try{
            const { data } = await login(correo, contrasena);

            AsyncStorage.setItem("token", data.session_token);

            dispatch( loginR(data) );
        }
        catch(error){
            const err = error as Error;
            
            if (err.message === "Invalid credentials"){
                dispatch( logout({message: "Los datos ingresados no son correctos."}) );
            }
            else{
                dispatch( logout({message: "Ha ocurrido un error. Intentalo de nuevo más tarde."}) );
            }
        }
    }
};

export const startSignUp = (usuario: UsuarioCreate) => {
    return async (dispatch: AppDispatch) => {
        dispatch( checkingCredentials() );
        
        try{
            await crearUsuario(usuario);

            dispatch( signUp() );
        }
        catch(err){
            let error = err as Error;

            console.error(err);

            dispatch( logout({ message: error.message }) );
        }
    };
};

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( logout({message: null}) );

        AsyncStorage.clear();
    }
};
