import { AppDispatch } from '../store';
import { startLoadingGoals, setGoals, addGoal, removeGoal } from './goalsSlice';
import { crearMeta, crearMetaFijada, obtenerMetas, actualizarMeta } from '../../api';

import { MetaCreate, MetaEdit } from '../../interfaces/ApiInterfaces';

export const add = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await crearMeta(meta);
            const { id } = data;

            if(fijar) {
                await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
                // si la meta no se pudo fijar, mostrar un mensaje
            }

            dispatch( addGoal({ id, ...meta }) );

        } catch(err){
            let error = err as Error;
            // si ocurrió un error, mostrar un mensaje
        }
    };
};

export const update = (id: string, id_usuario: number, meta: MetaEdit, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await actualizarMeta(id, meta);

            if(fijar) {
                await crearMetaFijada({ id_usuario, id_meta: id });
                // si la meta no se pudo fijar, mostrar un mensaje
            }

            dispatch( removeGoal({ id }) );
            dispatch( addGoal({ id, id_usuario, ...meta }) );

        } catch(err){
            let error = err as Error;
            // si ocurrió un error, mostrar un mensaje
        }
    };
};

export const getAll = () => {
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