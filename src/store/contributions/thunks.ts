import { AppDispatch } from '../store';
import { crearAbono, obtenerAbonos, actualizarAbono, eliminarAbono } from '../../api';
import { addContribution, setGoalContributions, setMessage, startLoadingContributions, updateContribution, removeContribution } from './goalContributionsSlice';

import { AbonoCreate, AbonoEdit } from '../../interfaces/ApiInterfaces';

export const add = (abono: AbonoCreate) => {
    return async (dispatch: AppDispatch) => {
        try{
            // crear abono
            const { data } = await crearAbono(abono);

            // actualizar el state de los abonos
            dispatch( addContribution({ ...abono, id: data.id }) );

            // actualizar el state del mensaje
            dispatch( setMessage({ message: 'El abono se registró correctamente' }) );

        } catch(err){
            let error = err as Error;

            if(error.message.includes('No se encontro la meta')) {
                dispatch( setMessage({ message: 'Error, la meta fue eliminada' }) );
            } else {
                dispatch( setMessage({ message: 'Error al abonar a la meta' }) );
            }
        }
    };
};

export const update = (contribution_id: string, user_id: number, abono: AbonoEdit) => {
    return async (dispatch: AppDispatch) => {
        try{
            // crear abono
            await actualizarAbono(contribution_id, abono);

            // actualizar el state de los abonos
            dispatch( 
                updateContribution({ ...abono, id_usuario: user_id, id: contribution_id }) 
            );

            // actualizar el state del mensaje
            dispatch( setMessage({ message: 'El abono se actualizó correctamente' }) );
            
        } catch(err){
            let error = err as Error;

            if(error.message.includes('No se encontro la meta')) {
                dispatch( setMessage({ message: 'Error, la meta fue eliminada' }) );
            } else {
                dispatch( setMessage({ message: 'Error al abonar a la meta' }) );
            }
        }
    };
};

export const remove = (contribution_id: string) => {
    return async (dispatch: AppDispatch) => {
        try{
            // obtener los abonos
            await eliminarAbono(contribution_id);

            // actualizar el state de los abonos
            dispatch( removeContribution({ id: contribution_id }) );

            // actualizar el state del mensaje
            dispatch( setMessage({ message: 'El abono se eliminó correctamente' }) );

        } catch(err){
            dispatch( 
                setMessage({ message: 'Ocurrió un error al eliminar el abono' }) 
            );
        }
    };
};

export const getAll = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( startLoadingContributions() );

        try{
            // obtener los abonos
            const { data } = await obtenerAbonos();

            // actualizar el state de los abonos
            dispatch( setGoalContributions(data) );

        } catch(err){
            dispatch( 
                setMessage({ message: 'Ocurrió un error al obtener los abonos' }) 
            );
        }
    };
};

export const cleanMessage = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( setMessage({ message: '' }) );
    };
};