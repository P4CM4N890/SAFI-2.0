import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MetaResponse, MetaId, PredecirMetaResponse } from '../../interfaces/ApiInterfaces';

interface ErrorMessage {
    message: string;
};

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: [] as MetaResponse[],
        mainGoalId: '' as string,
        isLoading: false,
        message: '',
        prediction: {} as PredecirMetaResponse | null,
    },

    reducers: {
        startLoadingGoals: (state) => {
            state.isLoading = true;
        },
        setGoals: (state, { payload }: PayloadAction<MetaResponse[]>) => {
            state.isLoading = false;
            state.message = '';
            state.goals = payload;
        },
        setMainGoalId: (state, { payload }: PayloadAction<MetaId>) => {
            state.mainGoalId = payload.id;
        },
        addGoal: (state, { payload }: PayloadAction<MetaResponse>) => {
            state.message = '';
            state.goals = [ ...state.goals, payload ];
        },
        removeGoal: (state, { payload }: PayloadAction<MetaId>) => {
            state.message = '';
            state.goals = state.goals.filter(goal => goal.id !== payload.id);
        },
        updateGoal: (state, { payload }: PayloadAction<MetaResponse>) => {
            state.message = '';
            state.goals = state.goals.map(goal =>
                goal.id === payload.id ? { ...goal, ...payload } : goal
            );
        },
        setMessage: (state, { payload }: PayloadAction<ErrorMessage>) => {
            state.message = payload.message;
        },
        predictGoal: (state, { payload }: PayloadAction<PredecirMetaResponse>) => {
            state.prediction = payload;
        },
        savingGoal: (state) => {
            state.isLoading = true;
        },
        disableSavingState: (state) => {  
            state.isLoading = false;
        },
    }
});

export const { startLoadingGoals, setGoals, addGoal, 
    removeGoal, setMessage, setMainGoalId, predictGoal, 
    savingGoal, disableSavingState } = goalsSlice.actions;