import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { components } from '../../types/appTypes';

interface InitialStateInterface {
    activeComponent: components;
    isBottomTabShown: boolean;
}

const initialState: InitialStateInterface = {
    activeComponent: 'HomeScreen',
    isBottomTabShown: true,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: { 
        setActiveComponent(state, { payload }: PayloadAction<components>){
            state.activeComponent = payload;
        },
        setBarVisibility(state, { payload }: PayloadAction<boolean>){
            state.isBottomTabShown = payload;
        },
    },
});

export const { setActiveComponent, setBarVisibility } = uiSlice.actions;
