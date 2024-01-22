import { crearPregunta, crearRespuesta, eliminarPregunta, 
    eliminarRespuesta, obtenerPreguntas, obtenerRespuestas } from "../../api";
import { PreguntaCreate, PreguntaResponse, 
    RespuestaCreate, RespuestaResponse } from "../../interfaces/ApiInterfaces";
import { AppDispatch, RootState } from "../store";
import { createAnswer, createQuestion, deleteAnswer, 
    deleteQuestion, loadQuestions, savingData } from "./forumSlice";

export const startLoadingQuestions = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );

        try{
            const preguntas = ( await obtenerPreguntas() ).data;
            const respuestas = ( await obtenerRespuestas() ).data;
            
            const data = {
                preguntas,
                respuestas,
            }

            dispatch( loadQuestions(data) );
        }
        catch(error){
            console.error(error);
        }
    };
};

export const startSavingQuestion = ({ pregunta, descripcion }: { pregunta: string, descripcion: string}) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { uuid } = getState().auth;

        dispatch( savingData() );

        let newPregunta: PreguntaCreate = {
            titulo: pregunta,
            descripcion: descripcion,
            categoria: 'Pregunta',
            id_usuario: uuid || 0,
            fecha: new Date().toISOString(),
            likes: 0,
            id_usuario_liked: [],
        }

        try{
            const { data } = await crearPregunta(newPregunta);
            
            let preguntaArray: PreguntaResponse = {
                ...newPregunta,
                id: data.id,
            };

            dispatch( createQuestion(preguntaArray) );
        }
        catch(error){
            console.error(error);
        }
    };
}

export const startDeletingQuestion = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );

        try{
            await eliminarPregunta(id);

            dispatch( deleteQuestion(id) );
        }
        catch(error){
            console.error(error);
        }
    };
};

export const startSavingAnswer = (descripcion: string, id_pregunta: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { uuid } = getState().auth;

        dispatch( savingData() );
        
        let newAnswer: RespuestaCreate = {
            id_pregunta: id_pregunta,
            cuerpo: descripcion,
            id_usuario: uuid || 0,
            fecha: new Date().toISOString(),
            likes: 0,
            id_usuario_liked: [],
        }

        try{
            const { data } = await crearRespuesta(newAnswer);

            let newAnswerWithId: RespuestaResponse = {
                ...newAnswer,
                id: data.id,
            }

            dispatch( createAnswer(newAnswerWithId) );
        }
        catch(error){
            console.error(error);
        }
    };
}

export const startDeletingAnswer = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch( savingData() );
        
        try{
            await eliminarRespuesta(id);
            
            dispatch( deleteAnswer(id) );
        }
        catch(error){
            console.error(error);
        }
    };
};
