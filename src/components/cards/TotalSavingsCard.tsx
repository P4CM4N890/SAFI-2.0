import { Text, View } from 'react-native';
import { GastoResponse, IngresoResponse } from '../../interfaces/ApiInterfaces';

interface Props {
    ingresos: IngresoResponse[];
    gastos: GastoResponse[];
}

export const TotalSavingsCard = ({ ingresos, gastos }: Props) => {
    const totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.cantidad, 0);
    const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.cantidad, 0);

    const total = totalIngresos - totalGastos;

    return (
       
        <View className='w-full h-25 items-center mt-6 rounded-xl border-2 border-slate-200 overflow-hidden bg-white'>
            <View className='w-full bg-pastel-green py-1'>
                <Text 
                    className='text-base text-white text-left 
                    font-bold uppercase ml-3'
                >
                    Ahorro Total
                </Text>
                <Text 
                    className='text-2xl text-center mt-2 mb-2 
                    font-bold text-white uppercase'
                >
                   ${ total } MXN
                </Text>
            
            </View>
        </View>

    );

}
