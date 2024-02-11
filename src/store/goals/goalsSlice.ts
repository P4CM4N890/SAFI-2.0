import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MetaRemove, MetaResponse, MetaFijadaResponse } from '../../interfaces/ApiInterfaces';

interface ErrorMessage {
    message: string;
};

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: [] as MetaResponse[],
        mainGoal: {} as MetaFijadaResponse,
        isLoading: false,
        message: ''
    },

    reducers: {
        startLoadingGoals: (state) => {
            state.isLoading = true;
        },
        setMainGoal: (state, { payload }: PayloadAction<MetaFijadaResponse>) => {
            state.isLoading = false;
            state.message = '';
            state.mainGoal = payload;
        },
        setGoals: (state, { payload }: PayloadAction<MetaResponse[]>) => {
            state.isLoading = false;
            state.message = '';
            state.goals = payload;
        },
        addGoal: (state, { payload }: PayloadAction<MetaResponse>) => {
            state.message = '';
            state.goals = [ ...state.goals, payload ];
        },
        removeGoal: (state, { payload }: PayloadAction<MetaRemove>) => {
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
        }
    }
});

export const { startLoadingGoals, setGoals, addGoal, removeGoal, setMessage, setMainGoal } = goalsSlice.actions;