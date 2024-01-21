import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { uiSlice } from './ui/uiSlice';
import { forumSlice } from './forum/forumSlice';
import { otherSlice } from './other/otherSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        forum: forumSlice.reducer,
        other: otherSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;