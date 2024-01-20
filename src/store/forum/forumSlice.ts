import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PreguntaResponse, 
    RespuestaResponse } from '../../interfaces/ApiInterfaces';

interface InitialStateInterface {
    preguntas: PreguntaResponse[];
    respuestas: RespuestaResponse[];
    isSaving: boolean;
    errorMessage: string | null;
}

interface InitialLoad {
    preguntas: PreguntaResponse[],
    respuestas: RespuestaResponse[],
}

const initialState: InitialStateInterface = {
    preguntas: [],
    respuestas: [],
    isSaving: false,
    errorMessage: null,
};

export const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: { 
        loadQuestions(state, { payload }: PayloadAction<InitialLoad>){
            state.isSaving = false;
            state.preguntas = [...payload.preguntas];
            state.respuestas = [...payload.respuestas];
        },
        createQuestion(state, { payload }: PayloadAction<PreguntaResponse>){
            state.isSaving = false;
            state.preguntas.push(payload);
        },
        savingData(state){
            state.isSaving = true;
        },
    },
});

export const { loadQuestions, savingData, createQuestion } = forumSlice.actions;

