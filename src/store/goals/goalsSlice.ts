import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MetaResponse } from '../../interfaces/ApiInterfaces';

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
        updateGoals: (state, { payload }: PayloadAction<MetaResponse>) => {
            state.goals = [ ...state.goals, payload ]
        }
    }
});

export const { startLoadingGoals, setGoals } = goalsSlice.actions;