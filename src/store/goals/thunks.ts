import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppDispatch } from '../store';
import { startLoadingGoals, setGoals } from './goalsSlice';
import { crearMeta, crearMetaFijada } from '../../api';

import { MetaCreate, MetaFijadaCreate } from '../../interfaces/ApiInterfaces';
import { CreateMetaResponse } from '../../types/responseTypes';

export const addGoal = (meta: MetaCreate, fijar: boolean) => {
    return async (dispatch: AppDispatch) => {
        // dispatch( checkingCredentials() );
        
        try{

            const { data } = await crearMeta(meta);
            const { id } = data;

            if(fijar) {
                await crearMetaFijada({ id_usuario: meta.id_usuario, id_meta: id });
                // si la meta no se pudo fijar, mostrar un mensaje
            }

            // dispatch( updateGoals() )
        }
        catch(err){
            let error = err as Error;

            // dispatch( logout({ message: error.message }) );
        }
    };
};