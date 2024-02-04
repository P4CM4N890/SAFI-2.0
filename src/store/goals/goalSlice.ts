import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// import { categoryIcon, iconColor, priority } from '../../types/appTypes';
import { MetaCreate } from '../../interfaces/ApiInterfaces';

export const goalSlice = createSlice({
    name: 'auth',
    initialState: {
        goals: [] as MetaCreate[],
        isLoading: false
    },

    reducers: {
        startLoadingGoals: (state) => {
            state.isLoading = true;
        },
        setGoals: (state, action) => {
            state.isLoading = false;
            state.goals = action.payload.goals;
        },
        updateGoals: (state, { payload }: PayloadAction<MetaCreate>) => {
            state.goals = [ ...state.goals, payload ]
        }
    }
});

export const { startLoadingGoals, setGoals } = goalSlice.actions;