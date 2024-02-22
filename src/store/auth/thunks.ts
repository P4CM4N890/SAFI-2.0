import AsyncStorage from "@react-native-async-storage/async-storage";
import { actualizarPassword, actualizarUsuario, crearUsuario, generarTokenRecuperacion, login } from "../../api";
import { AppDispatch, RootState } from "../store";
import { changePassword, checkingCredentials, loginR, logout, savingUser, setNewHighScore, setToken, signUp, updateUser } from "./authSlice";
import { CambiarContrasena, UsuarioCreate, UsuarioEdit } from "../../interfaces/ApiInterfaces";

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
            
            const { data } = await login(usuario.correo, usuario.contrasena);
            AsyncStorage.setItem("token", data.session_token);

            dispatch( loginR(data) );
        }
        catch(err){
            let error = err as Error;

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

export const startSendingToken = (correo: string) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { token } = (await generarTokenRecuperacion(correo)).data;
            dispatch( setToken({correo, token}) );
        }
        catch(err){
            let error = err as Error;

            dispatch( logout({ message: error.message }) );
        }
    };
};

export const startChangingPassword = (datos: CambiarContrasena) => {
    return async (dispatch: AppDispatch) => {
        try{
            await actualizarPassword(datos);
            dispatch( changePassword() );
        }
        catch(err){
            let error = err as Error;

            dispatch( logout({ message: error.message }) );
        }
    };
};

export const startSettingNewHighScore = (highScore: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { email, experiencia, nombre, ruta_imagen, fecha_de_nac } = getState().auth;

        const newUsuario: UsuarioEdit = {
            correo: email as string,
            nombre: nombre as string,
            ruta_imagen: ruta_imagen as string,
            experiencia: experiencia as number,
            fecha_de_nac: fecha_de_nac as string,
            high_score: highScore,
        }

        try{
            await actualizarUsuario(email as string, newUsuario);

            dispatch( setNewHighScore(highScore) );
        }
        catch(err){
            let error = err as Error;

            console.error(error);
            // dispatch( logout({ message: error.message }) );
        }
    };
};

export const startUpdatingUser = (usuario: UsuarioEdit) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch( savingUser() );

        const { email } = getState().auth;

        try{
            await actualizarUsuario(email as string, usuario);

            dispatch( updateUser( usuario ) );
        }
        catch(err){
            let error = err as Error;

            console.error(error);
        }
    };
};
