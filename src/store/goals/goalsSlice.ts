import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MetaRemove, MetaResponse } from '../../interfaces/ApiInterfaces';

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: [] as MetaResponse[],
        isLoading: false
    },

    reducers: {
        startLoadingGoals: (state) => {
            state.isLoading = true;
        },
        setGoals: (state, { payload }: PayloadAction<MetaResponse[]>) => {
            state.isLoading = false;
            state.goals = payload
        },
        addGoal: (state, { payload }: PayloadAction<MetaResponse>) => {
            state.goals = [ ...state.goals, payload ]
        },
        removeGoal: (state, { payload }: PayloadAction<MetaRemove>) => {
            state.goals = state.goals.filter(goal => goal.id !== payload.id);
        },
        updateGoal: (state, { payload }: PayloadAction<MetaResponse>) => {
            state.goals = state.goals.map(goal =>
                goal.id === payload.id ? { ...goal, ...payload } : goal
            );
        },
    }
});

export const { startLoadingGoals, setGoals, addGoal, removeGoal } = goalsSlice.actions;