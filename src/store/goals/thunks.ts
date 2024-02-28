import { format } from 'date-fns';

import { startLoadingGoals, setGoals, addGoal, removeGoal, setMessage, setMainGoalId, predictGoal, savingGoal, disableSavingState } from './goalsSlice';
import { crearMeta, crearMetaFijada, obtenerMetas, actualizarMeta, eliminarMetaFijada, predecirMeta } from '../../api';
import { setMainGoalSlide } from '../slides';
import { AppDispatch } from '../store';

import { MetaCreate, MetaEdit, PredictorObject } from '../../interfaces/ApiInterfaces';
import { GoalProgress } from '../contributions';

export const add = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingGoal() );

        try{
            // crear la meta
            const { data } = await crearMeta(meta);
            const { id } = data;

            // actualizar el state de las metas
            dispatch( addGoal({ id, ...meta }) );

            if(fijar) {
                // crear la meta fijada
                await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
                
                // actualizar el state del slide de la meta fijada
                dispatch(
                    setMainGoalSlide({ 
                        title: meta.nombre, 
                        type: 'mainGoal', 
                        startDate: format(new Date(meta.fecha_inicio), "dd'/'MM'/'yyyy"),
                        endDate: format(new Date(meta.fecha_fin), "dd'/'MM'/'yyyy"),
                        amountAchieved: 0,
                        totalAmount: meta.cantidad,
                        found: true
                    }) 
                );

                // actualizar el state del id de la meta fijada
                dispatch( setMainGoalId({ id }) );
            }

            dispatch( 
                setMessage({ message: 'Meta guardada correctamente' }) 
            );

            dispatch( disableSavingState() );

        } catch(err){
            let error = err as Error;
            
            if(error.message.includes('ya tiene una meta fijada')) {
                dispatch( 
                    setMessage({ message: 'Error, ya tienes una meta fijada' }) 
                );

            } else {
                dispatch( 
                    setMessage({ message: 'Ocurrió un error al registrar la meta' }) 
                );
            }
        }
    };
};

export const update = (id: string, id_usuario: number, meta: MetaEdit, fijar: boolean, fijado: boolean, goalsProgress: GoalProgress[]) => {
    return async (dispatch: AppDispatch) => {
        try{
            // actualizar la meta
            await actualizarMeta(id, meta);

            // actualizar el state de las metas
            dispatch( removeGoal({ id }) );
            dispatch( addGoal({ id, id_usuario, ...meta }) );

            // calcular el progreso de la meta
            const amountAchieved = goalsProgress.find( goalProgress => goalProgress.id === id )?.total || 0;

            if(fijar && !fijado) {
                // crear la meta fijada
                await crearMetaFijada({ id_usuario, id_meta: id });

                // actualizar el state del slide de la meta fijada
                dispatch(
                    setMainGoalSlide({ 
                        title: meta.nombre, 
                        type: 'mainGoal', 
                        startDate: format(new Date(meta.fecha_inicio), "dd'/'MM'/'yyyy"),
                        endDate: format(new Date(meta.fecha_fin), "dd'/'MM'/'yyyy"),
                        amountAchieved,
                        totalAmount: meta.cantidad,
                        found: true
                    }) 
                );

                // actualizar el state del id de la meta fijada
                dispatch( setMainGoalId({ id }) );

            } else if(!fijar && fijado) {
                // eliminar meta fijada
                await eliminarMetaFijada(id);

                // actualizar el state del slide de la meta fijada
                dispatch(
                    setMainGoalSlide({ 
                        type: 'mainGoal', 
                        found: false
                    }) 
                );

                // actualizar el state del id de la meta fijada
                dispatch( setMainGoalId({ id: '' }) );
            }

            dispatch( 
                setMessage({ message: 'Meta actualizada correctamente' }) 
            );

        } catch(err){
            let error = err as Error;

            if(error.message.includes('ya tiene una meta fijada')) {
                dispatch( 
                    setMessage({ message: 'Error, ya tienes una meta fijada' }) 
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
            // obtener las metas
            const { data } = await obtenerMetas();

            // actualizar el state de las metas
            dispatch( setGoals(data) );

        } catch(err){
            dispatch( 
                setMessage({ message: 'Ocurrió un error al obtener las metas' }) 
            );
        }
    };
};

export const cleanMessage = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( setMessage({ message: '' }) );
    };
};

export const predict = (datos: PredictorObject) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await predecirMeta(datos);
    
            dispatch( predictGoal( data ) );
        }
        catch(error){
            console.error(error);
        }
    };
};
