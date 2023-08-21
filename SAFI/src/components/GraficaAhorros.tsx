import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { IngresoResponseModel } from '../interfaces/ApiInterfaces';

type GraficaProps = {
  ingresos: IngresoResponseModel[];
};

type arregloMeses = {
  label: string;
  gradientColor: string;
  frontColor: string;
  value: number;
};

export const GraficaAhorros = ({ ingresos }: GraficaProps) => {

  const meses: arregloMeses[] = [];

  const ingresosOrdenados = ingresos.sort((a, b) => {
    // ordenar ingresos del mas reciente al mas antiguo
    return new Date(a.fecha_hora).getTime() - new Date(b.fecha_hora).getTime();
  })
  for (const elemento of ingresosOrdenados) {
    // de atras hacia adelante sumar los ingresos de cada mes
    if (meses.length == 6) break; // si ya hay 6 meses terminamos

    let fecha = new Date(elemento.fecha_hora);
    let mes = fecha.getMonth();
    let mesNombre = new Intl.DateTimeFormat("es-ES", {month: 'short'}).format(new Date().setMonth(mes)).toUpperCase();

    const indice = meses.findIndex(elemento => elemento.label === mesNombre);
    if (indice === -1) {
      // indice -1 no existe el mes entonces
      // lo agregamos al arreglo
      meses.push({
        label: mesNombre,
        gradientColor: '#009FFF',
        frontColor: '#006DFF',
        value: elemento.cantidad,
      });
    } else {
      // caso contrario le sumamos el valor
      let valor = meses[indice].value + elemento.cantidad;
      meses[indice] = {
        label: mesNombre,
        gradientColor: '#009FFF',
        frontColor: '#006DFF',
        value: valor,
      };
    }

  };

  // const data = [
  //   { value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Jan' },

  //   { value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Feb' },

  //   { value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Mar' },

  //   { value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Apr' },

  //   { value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'May' },

  //   { value: 3400, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Jun' },

  //   { value: 3600, frontColor: 'transparent', gradientColor: 'transparent', label: 'Jul' },

  //   { value: 3800, frontColor: 'transparent', gradientColor: 'transparent', label: 'Aug' },
  // ];

  // Obtener mes maximo
  let mesMaximo = meses.reduce(
    (mesAnterior, mesActual) => 
    mesAnterior.value >= mesActual.value ? mesAnterior : mesActual,
    {value: 0} // objeto con valor inicial
  ).value; // recogemos el valor

  // lo redondeamos hacia arriba a la centena mas cercana
  mesMaximo = Math.ceil(mesMaximo/100)*100;
  console.info(meses);
  console.log('mesMaximo: ' + mesMaximo);

  // arreglo YAxis calcula las labels de las secciones
  let arregloYAxis: string[] = ["$0"];
  if (mesMaximo/100 > 3) { // solo si es posible generar mas de 3 secciones
    for (let i = 1; i <= (mesMaximo/100); i++) {
      arregloYAxis.push("$" + (i*100).toString());
    }
  }
  console.log(arregloYAxis);

  return (
    <View
      style={{
        margin: 10,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
        Ultimos 6 meses
      </Text>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <BarChart
          data={meses}
          barWidth={30}
          initialSpacing={15}
          spacing={14}
          barBorderRadius={4}
          showGradient
          yAxisThickness={0}
          xAxisType={'dashed'}
          xAxisColor={'lightgray'}
          yAxisTextStyle={{ color: 'lightgray' }}
          // stepValue={1000}
          maxValue={mesMaximo}
          noOfSections={4}
          // yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
          // yAxisLabelTexts={arregloYAxis}
          labelWidth={40}
          xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
          // showLine
          lineConfig={{
            color: '#F29C6E',
            thickness: 4,
            curved: true,
            hideDataPoints: true,
            shiftY: 20,
            initialSpacing: -12,
          }}
        />
      </View>
    </View>
  );
};