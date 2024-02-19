import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { 
    AbonoCreate, AbonoEdit, AbonoResponse, AbonoCreateResponse, GoalContributionId
} from '../../interfaces/ApiInterfaces';

interface ErrorMessage {
    message: string;
};

export const goalsContributionsSlice = createSlice({
    name: 'goalContributions',
    initialState: {
        contributions: [] as AbonoResponse[],
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
    startLoadingContributions, setGoalContributions, addContribution, removeContribution, updateContribution, setMessage
} = goalsContributionsSlice.actions;