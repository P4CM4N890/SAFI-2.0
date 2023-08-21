import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

// Estilo
import { styles } from '../../theme/appTheme';
import { obtenerIngresos } from '../../api/GetRequests';
import { IngresoResponseModel } from '../../interfaces/ApiInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderScreens } from '../../components/HeaderScreens';
import { VerIngresosCards } from '../../components/VerIngresosCards';

interface Props extends StackScreenProps<any, any> { };

export const IngresoIndex = ({ navigation }: Props) => {
  const [ingresos, setIngresos] = useState<IngresoResponseModel[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      // Do something when the screen is focused
      // console.log("hola ingreso index focused");

      const consultarIngresos = async () => {
        try {
          let ingresos: IngresoResponseModel[] = (await obtenerIngresos()).data;
          const id_perfil = await AsyncStorage.getItem("perfil_actual_id");
          if (!id_perfil) throw new Error(""); // TODO error
          
          ingresos = ingresos.filter((ingreso) => {
            return ingreso.id_perfil.id_perfil === parseInt(id_perfil);
          });
          // TODO ordenar los ingresos por fecha
          ingresos = ingresos.reverse(); // del mas reciente al mas antiguo

          if (isActive) {
            setIngresos(ingresos);
          }
        } catch (e) {
          console.error(e);
        }
      };

      consultarIngresos();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // console.log("hola ingreso index unfocused");
        isActive = false;
      };
    }, [])
  );

  return (
    <LinearGradient style={styles.container}
      colors={[
        'rgba(0, 58, 16, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
      ]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.4, 1]}
    >
      <View style={{minHeight: 130}}>
        <HeaderScreens title='Todos los ingresos' />
      </View>

      <FlatList 
        style={{ flex: 8, marginHorizontal: 10, marginVertical: 15, padding: 5 }}
        contentContainerStyle={{marginBottom: 5}}
        data={ingresos}
        renderItem={({ item }) => (
          <VerIngresosCards
            key={item.id_ingreso}
            dinero={'$' + item.cantidad}
            fecha={item.fecha_hora.split('T')[0]}
            categoria={item.categoria}
            idIngreso={item.id_ingreso}
          />
        )}
      >
      </FlatList>
    </LinearGradient>
  )
};