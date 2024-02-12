import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HomeSlide {
    title?: string;
    startDate?: string;
    endDate?: string;
    progress?: number;
    incomeAmount?: number;
    type: 'mainGoal' | 'latestIncome';
    found: boolean;
};

interface GoalSlide {
    title?: string;
    startDate?: string;
    endDate?: string;
    progress?: number;
    percentage?: number;
    type: 'mainGoal' | 'goalsSummary';
    found: boolean;
};

export const slidesSlice = createSlice({
    name: 'goals',
    initialState: {
        mainGoalSlide: {} as HomeSlide,
        latestIncomeSlide: {} as HomeSlide,
        goalsSummarySlide: {} as GoalSlide,
    },

    reducers: {
        setMainGoalSlide: (state, { payload }: PayloadAction<HomeSlide>) => {
            state.mainGoalSlide = payload;
        },
        setLatestIncomeSlide: (state, { payload }: PayloadAction<HomeSlide>) => {
            state.latestIncomeSlide = payload;
        },
        setGoalsSummarySlide: (state, { payload }: PayloadAction<GoalSlide>) => {
            state.goalsSummarySlide = payload;
        },
    }
});

export const { setMainGoalSlide, setLatestIncomeSlide, setGoalsSummarySlide } = slidesSlice.actions;