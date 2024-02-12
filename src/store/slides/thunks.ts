import { AppDispatch } from "../store";

import { setMainGoalSlide, setLatestIncomeSlide, setGoalsSummarySlide } from './slidesSlice';
import { obtenerMetaFijada, obtenerMeta } from '../../api';

export const loadMainGoalSlide = (id_usuario: number) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await obtenerMetaFijada(id_usuario);
            const { data: metaFijada } = await obtenerMeta(data.id_meta);

            dispatch( 
                setMainGoalSlide({ 
                    title: metaFijada.nombre, 
                    type: 'mainGoal', 
                    startDate: metaFijada.fecha_inicio,
                    endDate: metaFijada.fecha_fin,
                    progress: 50,
                    found: true
                }) 
            );

        } catch(err){

            dispatch( 
                setMainGoalSlide({ 
                    type: 'mainGoal', 
                    found: false
                }) 
            );
        }
    };
};

export const loadLatestIncomeSlide = (id_usuario: number) => {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch( 
                setLatestIncomeSlide({ 
                    type: 'latestIncome', 
                    found: false
                }) 
            );

        } catch(err){

            dispatch( 
                setLatestIncomeSlide({ 
                    type: 'latestIncome', 
                    found: false
                }) 
            );
        }
    };
};

export const loadGoalsSummarySlide = (id_usuario: number) => {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch( 
                setGoalsSummarySlide({ 
                    type: 'goalsSummary', 
                    found: false
                }) 
            );

        } catch(err){

            dispatch( 
                setGoalsSummarySlide({ 
                    type: 'goalsSummary', 
                    found: false
                }) 
            );
        }
    };
};