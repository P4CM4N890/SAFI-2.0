import { LineChart } from 'react-native-gifted-charts';
import { GastoResponse, IngresoResponse } from '../../interfaces/ApiInterfaces';

interface Props {
    ingresos: IngresoResponse[];
    gastos: GastoResponse[];
}

interface arregloMeses {
    label: string;
    gradientColor: string;
    frontColor: string;
    value: number;
}

const createMonthArray = (data: IngresoResponse[] | GastoResponse[], color: string, ) => {
    const meses: arregloMeses[] = [];

    for (const elemento of data) {
        // de atras hacia adelante sumar los ingresos de cada mes
        if (meses.length == 6) break; // si ya hay 6 meses terminamos
    
        let fecha = new Date(elemento.fecha);
        let mes = fecha.getMonth();
        let mesNombre = new Intl.DateTimeFormat("es-ES", {month: 'short'}).format(new Date().setMonth(mes)).toUpperCase();

        const indice = meses.findIndex(elemento => elemento.label === mesNombre);
        if (indice === -1) {
            meses.push({
                label: mesNombre,
                gradientColor: color,
                frontColor: color,
                value: elemento.cantidad,
            });
        } 
        else {
            // caso contrario le sumamos el valor
            let valor = meses[indice].value + elemento.cantidad;
            meses[indice] = {
                label: mesNombre,
                gradientColor: color,
                frontColor: color,
                value: valor,
            };
        }
    }

    return meses;
}

export const HomeLineChart = ({ ingresos, gastos }: Props) => {
    const ingresosSorted = ingresos.sort((a, b) => {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
    const gastosSorted = gastos.sort((a, b) => {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });

    const ingresosTotales = createMonthArray(ingresosSorted, '#60D833');
    const gastosTotales = createMonthArray(gastosSorted, '#D83333');

    // Obtener mes maximo
    let mesMaximo = ingresosTotales.reduce((mesAnterior, mesActual) => 
        mesAnterior.value >= mesActual.value ? mesAnterior : mesActual,
        {value: 0} // objeto con valor inicial
    ).value; // recogemos el valor
    // lo redondeamos hacia arriba a la centena mas cercana
    mesMaximo = Math.ceil(mesMaximo / 100) * 100;

    return (
        <LineChart 
            data={ ingresosTotales }
            data2={ gastosTotales }
            maxValue={ mesMaximo }
            color1='#60D833'
            color2='#D83333'
            yAxisLabelWidth={ 45 }
            xAxisColor={ 'black' }
            yAxisColor={ 'black' }
            xAxisLabelTextStyle={{ color: 'black' }}
            yAxisTextStyle={{ color: 'black' }}
        />
    );
};
