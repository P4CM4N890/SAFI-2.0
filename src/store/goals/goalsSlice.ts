import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MetaCreate } from '../../interfaces/ApiInterfaces';

export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: [] as MetaCreate[],
        isLoading: false
    },

    reducers: {
        startLoadingGoals: (state) => {
            state.isLoading = true;
        },
        setGoals: (state, { payload }: PayloadAction<MetaCreate[]>) => {
            state.isLoading = false;
            state.goals = payload
        },
        updateGoals: (state, { payload }: PayloadAction<MetaCreate>) => {
            state.goals = [ ...state.goals, payload ]
        }
    }
});

export const { startLoadingGoals, setGoals } = goalsSlice.actions;