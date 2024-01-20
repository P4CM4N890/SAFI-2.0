import { crearPregunta, obtenerPreguntas, obtenerRespuestas } from "../../api";
import { PreguntaCreate, PreguntaResponse } from "../../interfaces/ApiInterfaces";
import { AppDispatch, RootState } from "../store";
import { createQuestion, loadQuestions, savingData } from "./forumSlice";

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

