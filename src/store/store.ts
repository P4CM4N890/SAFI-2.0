import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { uiSlice } from './ui';
import { forumSlice } from './forum';
import { otherSlice } from './other';
import { incomeSlice } from './incomes';
import { expenseSlice } from './expenses';
import { goalsSlice } from './goals/goalsSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        forum: forumSlice.reducer,
        income: incomeSlice.reducer,
        expense: expenseSlice.reducer,
        goals: goalsSlice.reducer,
        other: otherSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;