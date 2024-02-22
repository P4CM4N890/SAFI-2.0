import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AbonoResponse, GoalContributionId } from '../../interfaces/ApiInterfaces';

interface ErrorMessage {
    message: string;
};

export interface GoalProgress {
    id: string;
    total: number;
};

export const goalsContributionsSlice = createSlice({
    name: 'goalContributions',
    initialState: {
        contributions: [] as AbonoResponse[],
        goalsProgress: [] as GoalProgress[],
        isLoading: true,
        message: ''
    },

    reducers: {
        startLoadingContributions: (state) => {
            state.isLoading = true;
        },
        setGoalContributions: (state, { payload }: PayloadAction<AbonoResponse[]>) => {
            state.isLoading = false;
            state.message = '';
            state.contributions = payload;
        },
        setGoalsProgress: (state, { payload }: PayloadAction<GoalProgress[]>) => {
            state.goalsProgress = payload;
        },
        addContribution: (state, { payload }: PayloadAction<AbonoResponse>) => {
            state.message = '';
            state.contributions = [ ...state.contributions, payload ];
        },
        removeContribution: (state, { payload }: PayloadAction<GoalContributionId>) => {
            state.message = '';
            state.contributions = state.contributions.filter(contribution => contribution.id !== payload.id);
        },
        updateContribution: (state, { payload }: PayloadAction<AbonoResponse>) => {
            state.message = '';
            state.contributions = state.contributions.map(contribution =>
                contribution.id === payload.id ? { ...contribution, ...payload } : contribution
            );
        },
        setMessage: (state, { payload }: PayloadAction<ErrorMessage>) => {
            state.message = payload.message;
        }
    }
});

export const { 
    startLoadingContributions, setGoalContributions, addContribution, removeContribution, updateContribution, 
    setMessage, setGoalsProgress
} = goalsContributionsSlice.actions;