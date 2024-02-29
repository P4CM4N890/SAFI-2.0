import { agregarLogro, obtenerLogros, obtenerLogrosObtenidosGeneral } from "../../api";
import { AppDispatch, RootState } from "../store";
import { addGainedAchievement, loadAchievements, loadGainedAchievements, savingData } from "./achievementsSlice";

export const startLoadingAchievements = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );

        try{
            const { data } = await obtenerLogros();

            dispatch( loadAchievements(data) );
        }
        catch(error){
            console.error(error);
        }
    };
};

export const startLoadingGainedAchievements = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch( savingData() );

        const { uuid } = getState().auth;

        try{
            const { data } = await obtenerLogrosObtenidosGeneral();

            const logrosFiltered = data.filter((logro) => logro.id_usuario === Number(uuid));

            dispatch( loadGainedAchievements(logrosFiltered) );
        }
        catch(error){
            console.error(error);
        }
    };
};

export const startAddingNewGainedAchievement = (id_logro: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch( savingData() );
        
        const { uuid } = getState().auth;

        try{
            const { data } = await agregarLogro(uuid as number, id_logro);

            dispatch( addGainedAchievement({
                id: data.id,
                id_logro,
                id_usuario: uuid as number,
            }) );
        }
        catch(error){
            console.error(error);
        }
    };
};
