import { AppDispatch } from '../store';
import { startLoadingGoals, setGoals } from './goalsSlice';
import { crearMeta, crearMetaFijada, obtenerMetas } from '../../api';

import { MetaCreate } from '../../interfaces/ApiInterfaces';

export const addGoal = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await crearMeta(meta);
            const { id } = data;

            if(fijar) {
                await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
                // si la meta no se pudo fijar, mostrar un mensaje
            }

            // dispatch( updateGoals() )

        } catch(err){
            let error = err as Error;
            // dispatch( logout({ message: error.message }) );
        }
    };
};

export const getGoals = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( startLoadingGoals() );

        try{
            const { data } = await obtenerMetas();
            dispatch( setGoals(data) );

        } catch(err){
            let error = err as Error;
            // dispatch( logout({ message: error.message }) );
        }
    };
};