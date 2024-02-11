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
        homeSlides: [] as HomeSlide[],
        goalSlides: [] as GoalSlide[],
        isLoading: true
    },

    reducers: {
        setHomeSlides: (state, { payload }: PayloadAction<HomeSlide[]>) => {
            state.isLoading = false;
            state.homeSlides = payload;
        },
        setGoalSlides: (state, { payload }: PayloadAction<GoalSlide[]>) => {
            state.isLoading = false;
            state.goalSlides = payload;
        },
    }
});

export const { setHomeSlides, setGoalSlides } = slidesSlice.actions;