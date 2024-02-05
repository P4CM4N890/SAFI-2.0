import { AppDispatch } from '../store';
import { startLoadingGoals, setGoals, updateGoals, setGoal,  } from './goalsSlice';
import { crearMeta, crearMetaFijada, obtenerMetas, obtenerMeta, actualizarMeta } from '../../api';

import { MetaCreate, MetaEdit } from '../../interfaces/ApiInterfaces';

export const addGoal = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await crearMeta(meta);
            const { id } = data;

            if(fijar) {
                await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
                // si la meta no se pudo fijar, mostrar un mensaje
            }

            dispatch( updateGoals({ id, ...meta }) );

        } catch(err){
            let error = err as Error;
            // si ocurrió un error, mostrar un mensaje
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
            // si ocurrió un error, mostrar un mensaje
        }
    };
};

export const getGoal = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch( startLoadingGoals() );

        try{
            const { data } = await obtenerMeta(id);
            dispatch( setGoal(data) );

        } catch(err){
            let error = err as Error;
            // si ocurrió un error, mostrar un mensaje
        }
    };
};

export const updateGoal = (id: string, meta: MetaEdit, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await actualizarMeta(id, meta);
            // const { id } = data;

            // if(fijar) {
            //     await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
            //     // si la meta no se pudo fijar, mostrar un mensaje
            // }

            // dispatch( updateGoals({ id, ...meta }) );

        } catch(err){
            let error = err as Error;
            // si ocurrió un error, mostrar un mensaje
        }
    };
};