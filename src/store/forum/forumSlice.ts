import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PreguntaResponse, RespuestaResponse } from '../../interfaces/ApiInterfaces';

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

interface AddLike {
    targetIndex: number;
    userId: number;
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
        deleteQuestion(state, { payload }: PayloadAction<string>){
            state.isSaving = false;
            state.preguntas = state.preguntas.filter( preg => preg.id !== payload );
        },
        savingData(state){
            state.isSaving = true;
        },
        createAnswer(state, { payload }: PayloadAction<RespuestaResponse>){
            state.isSaving = false;
            state.respuestas.push(payload);
        },
        deleteAnswer(state, { payload }: PayloadAction<string>){
            state.isSaving = false;
            state.respuestas = state.respuestas.filter( resp => resp.id !== payload );
        },
        addLikeToQuestion(state, { payload }: PayloadAction<AddLike>){
            state.isSaving = false;
            state.preguntas[payload.targetIndex].likes += 1;
            state.preguntas[payload.targetIndex].id_usuario_liked.push(payload.userId);
        },
        addLikeToAnswer(state, { payload }: PayloadAction<AddLike>){
            state.isSaving = false;
            state.respuestas[payload.targetIndex].likes += 1;
            state.respuestas[payload.targetIndex].id_usuario_liked.push(payload.userId);
        },
    },
});

export const { loadQuestions, savingData, 
    createQuestion, createAnswer, deleteAnswer, 
    deleteQuestion, addLikeToQuestion, addLikeToAnswer } = forumSlice.actions;

