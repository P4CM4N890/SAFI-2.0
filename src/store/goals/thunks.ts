import { AppDispatch } from '../store';
import { startLoadingGoals, setGoals, addGoal, removeGoal, setMessage, setMainGoal } from './goalsSlice';
import { crearMeta, crearMetaFijada, obtenerMetas, obtenerMetaFijada, actualizarMeta } from '../../api';

import { MetaCreate, MetaEdit } from '../../interfaces/ApiInterfaces';

export const add = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await crearMeta(meta);
            const { id } = data;

            dispatch( addGoal({ id, ...meta }) );

            if(fijar) {
                await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
            }

            dispatch( 
                setMessage({ message: 'Meta guardada correctamente' }) 
            );

        } catch(err){
            let error = err as Error;
            
            if(error.message.includes('ya tiene una meta fijada')) {
                dispatch( 
                    setMessage({ message: 'Error al fijar la meta, ya tienes una meta fijada' }) 
                );

            } else {
                dispatch( 
                    setMessage({ message: 'Ocurrió un error al agregar la meta' }) 
                );
            }
        }
    };
};

export const update = (id: string, id_usuario: number, meta: MetaEdit, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            await actualizarMeta(id, meta);

            dispatch( removeGoal({ id }) );
            dispatch( addGoal({ id, id_usuario, ...meta }) );

            if(fijar) {
                await crearMetaFijada({ id_usuario, id_meta: id });
            }

            dispatch( 
                setMessage({ message: 'Meta actualizada correctamente' }) 
            );

        } catch(err){
            let error = err as Error;

            if(error.message.includes('ya tiene una meta fijada')) {
                dispatch( 
                    setMessage({ message: 'Error al fijar la meta, ya tienes una meta fijada' }) 
                );

            } else {
                dispatch( 
                    setMessage({ message: 'Ocurrió un error al actualizar la meta' }) 
                );
            }
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
            dispatch( 
                setMessage({ message: 'Ocurrió un error al obtener las metas'}) 
            );
        }
    };
};

export const getMain = (id_usuario: number) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await obtenerMetaFijada(id_usuario);
            dispatch( setMainGoal(data) );

        } catch(err){
            dispatch( 
                setMessage({ message: 'Ocurrió un error al obtener la meta fijada'}) 
            );
        }
    };
};

export const cleanMessage = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( setMessage({ message: '' }) );
    };
};