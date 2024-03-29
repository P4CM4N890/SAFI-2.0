import { format } from 'date-fns';
import { AppDispatch } from '../store';

import { setMainGoalSlide, setLatestIncomeSlide, setGoalsSummarySlide } from './slidesSlice';
import { setMainGoalId } from '../goals';

import { obtenerMetaFijada, obtenerMeta } from '../../api';
import { GoalProgress } from '../contributions';
import { IngresoResponse, MetaResponse } from '../../interfaces/ApiInterfaces';

export const loadMainGoalSlide = (id_usuario: number, goalsProgress: GoalProgress[]) => {
    return async (dispatch: AppDispatch) => {
        try{
            // obtener la meta fijada
            const { data } = await obtenerMetaFijada(id_usuario);
            const { data: metaFijada } = await obtenerMeta(data.id_meta);

            // calcular el progreso de la meta
            const amountAchieved = goalsProgress.find( goalProgress => goalProgress.id === metaFijada.id )?.total || 0;

            // actualizar el state del slide
            dispatch( 
                setMainGoalSlide({ 
                    title: metaFijada.nombre, 
                    type: 'mainGoal', 
                    startDate: format(new Date(metaFijada.fecha_inicio), "dd'/'MM'/'yyyy"),
                    endDate: format(new Date(metaFijada.fecha_fin), "dd'/'MM'/'yyyy"),
                    amountAchieved,
                    totalAmount: metaFijada.cantidad,
                    found: true
                }) 
            );

            // actualizar el state del id de la meta fijada
            dispatch( setMainGoalId({ id: data.id_meta }) );

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

export const loadLatestIncomeSlide = (id_usuario: number, ingreso: IngresoResponse) => {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch( 
                setLatestIncomeSlide({ 
                    type: 'latestIncome',
                    incomeAmount: ingreso.cantidad,
                    title: ingreso.nombre,
                    found: true
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

export const loadGoalsSummarySlide = (goals: MetaResponse[], goalsProgress: GoalProgress[]) => {
    return async (dispatch: AppDispatch) => {
        if(goals.length === 0) {
            dispatch( 
                setGoalsSummarySlide({ 
                    type: 'goalsSummary', 
                    found: false
                }) 
            );
            
            return;
        }

        // calcular la cantidad total de las metas
        const total = goals.reduce((total, goal) => total + goal.cantidad, 0);

        // calcular el progreso de las metas
        const progress = goalsProgress.reduce((total, goal) => total + goal.total, 0);

        dispatch( 
            setGoalsSummarySlide({ 
                type: 'goalsSummary', 
                percentage: ((progress * 100) / total),
                found: true,
            }) 
        );
    };
};