import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MetaResponse, MetaId } from '../../interfaces/ApiInterfaces';

interface ErrorMessage {
    message: string;
};

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: [] as MetaResponse[],
        mainGoalId: '' as string,
        isLoading: false,
        message: ''
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
        }
    }
});

export const { startLoadingGoals, setGoals, addGoal, removeGoal, setMessage, setMainGoalId } = goalsSlice.actions;