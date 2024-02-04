import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppDispatch } from '../store';
import { startLoadingGoals, setGoals } from './goalSlice';

import { crearMeta } from '../../api';
import { MetaCreate } from '../../interfaces/ApiInterfaces';

export const addGoal = (meta: MetaCreate) => {
    return async (dispatch: AppDispatch) => {
        // dispatch( checkingCredentials() );
        
        try{
            const { data } = await crearMeta(meta);
            // dispatch( updateGoals() )
        }
        catch(err){
            let error = err as Error;

            // dispatch( logout({ message: error.message }) );
        }
    };
};

