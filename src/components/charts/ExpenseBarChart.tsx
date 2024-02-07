import { BarChart } from "react-native-gifted-charts";
import { GastoResponse } from "../../interfaces/ApiInterfaces";

interface Props {
    data: GastoResponse[];
}

interface arregloMeses {
    label: string;
    gradientColor: string;
    frontColor: string;
    value: number;
};

export const ExpenseBarChart = ({ data }: Props) => {
    const meses: arregloMeses[] = []

    const dataSorted = data.sort((a, b) => {
        // ordenar ingresos del mas reciente al mas antiguo
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });

    for (const elemento of dataSorted) {
        // de atras hacia adelante sumar los ingresos de cada mes
        if (meses.length == 6) break; // si ya hay 6 meses terminamos
    
        let fecha = new Date(elemento.fecha);
        let mes = fecha.getMonth();
        let mesNombre = new Intl.DateTimeFormat("es-ES", {month: 'short'}).format(new Date().setMonth(mes)).toUpperCase();

        const indice = meses.findIndex(elemento => elemento.label === mesNombre);
        if (indice === -1) {
            // indice -1 no existe el mes entonces
            // lo agregamos al arreglo
            meses.push({
                label: mesNombre,
                gradientColor: '#009FFF',
                frontColor: '#D83333',
                value: elemento.cantidad,
            });
        } 
        else {
            // caso contrario le sumamos el valor
            let valor = meses[indice].value + elemento.cantidad;
            meses[indice] = {
                label: mesNombre,
                gradientColor: '#009FFF',
                frontColor: '#D83333',
                value: valor,
            };
        }
    }

    // Obtener mes maximo
    let mesMaximo = meses.reduce((mesAnterior, mesActual) => 
        mesAnterior.value >= mesActual.value ? mesAnterior : mesActual,
        {value: 0} // objeto con valor inicial
    ).value; // recogemos el valor
    // lo redondeamos hacia arriba a la centena mas cercana
    mesMaximo = Math.ceil(mesMaximo / 100) * 100;

    return (
        <BarChart
            data={ meses }
            barWidth={ 30 }
            initialSpacing={ 15 }
            spacing={ 14 }
            barBorderRadius={ 4 }
            yAxisThickness={ 0 }
            xAxisType={ 'dashed' }
            xAxisColor={ 'black' }
            xAxisLabelTextStyle={{ color: 'black', textAlign: 'center' }}
            yAxisTextStyle={{ color: 'black' }}
            maxValue={ mesMaximo }
            noOfSections={ 4 }
            labelWidth={ 40 }
            showLine
            lineConfig={{
                color: '#F29C6E',
                thickness: 4,
                curved: true,
                hideDataPoints: true,
                shiftY: 20,
                initialSpacing: 15,
                spacing: 14,
            }}
        />
    );
};

