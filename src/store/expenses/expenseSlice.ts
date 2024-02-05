import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialStateInterface {  }

const initialState: InitialStateInterface = {  };

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: { 
        actionFn(state, action: PayloadAction<string>){ 
            
        },
    },
});

export const { } = expenseSlice.actions;
