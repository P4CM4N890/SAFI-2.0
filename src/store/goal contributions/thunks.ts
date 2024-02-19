import { format } from 'date-fns';

import { AppDispatch } from '../store';
import { MetaCreate, MetaEdit } from '../../interfaces/ApiInterfaces';

export const add = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{

        } catch(err){
            let error = err as Error;
        }
    };
};

export const update = (id: string, id_usuario: number, meta: MetaEdit, fijar: boolean, fijado: boolean) => {
    return async (dispatch: AppDispatch) => {
        try{
            
        } catch(err){
            let error = err as Error;
        }
    };
};

export const getAll = () => {
    return async (dispatch: AppDispatch) => {
        try{

        } catch(err){

        }
    };
};

export const cleanMessage = () => {
    return async (dispatch: AppDispatch) => {
        // dispatch( setMessage({ message: '' }) );
    };
};