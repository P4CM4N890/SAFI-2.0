import { AppDispatch } from "../store";

import { setGoalSlides, setHomeSlides } from './slidesSlice';
import { obtenerMetaFijada, obtenerMeta } from '../../api';

export const startLoadingSlides = (id_usuario: number) => {
    return async (dispatch: AppDispatch) => {
        try{
            const { data } = await obtenerMetaFijada(id_usuario);
            const { data: metaFijada } = await obtenerMeta(data.id_meta);

            dispatch( 
                setHomeSlides([
                    { 
                        title: metaFijada.nombre, 
                        type: 'mainGoal', 
                        startDate: metaFijada.fecha_inicio,
                        endDate: metaFijada.fecha_fin,
                        progress: 50,
                        found: true
                    },
                    {
                        type: 'latestIncome',
                        found: false
                    }
                ]) 
            );

            dispatch( 
                setGoalSlides([
                    { 
                        title: metaFijada.nombre, 
                        type: 'mainGoal', 
                        startDate: metaFijada.fecha_inicio,
                        endDate: metaFijada.fecha_fin,
                        progress: 50,
                        found: true
                    },
                    {
                        type: 'goalsSummary',
                        found: false
                    }
                ]) 
            );

        } catch(err){
            // dispatch( 
            //     setMessage({ message: 'Ocurrió un error al obtener las metas'}) 
            // );
        }
    };
};