import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LogroResponse, LogrosObtenidosResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    logros: LogroResponse[];
    logrosObtenidos: LogrosObtenidosResponse[];
    isSaving: boolean;
}

const initialState: InitialStateInterface = { 
    logros: [],
    logrosObtenidos: [],
    isSaving: false,
};

export const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: { 
        savingData(state){ 
            state.isSaving = true;
        },
        loadAchievements(state, { payload }: PayloadAction<LogroResponse[]>){
            state.isSaving = false;            
            state.logros = payload;
        },
        loadGainedAchievements(state, { payload }: PayloadAction<LogrosObtenidosResponse[]>){
            state.isSaving = false;            
            state.logrosObtenidos = payload;
        },
        addGainedAchievement(state, { payload }: PayloadAction<LogrosObtenidosResponse>){
            state.isSaving = false;
            state.logrosObtenidos.push(payload);
        },
    },
});

export const { savingData, loadAchievements, loadGainedAchievements,
                addGainedAchievement } = achievementsSlice.actions;
