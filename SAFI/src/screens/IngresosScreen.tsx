import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { GraficaAhorros } from '../components/GraficaAhorros';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderScreens } from '../components/HeaderScreens';
import { IngresoResponseModel } from '../interfaces/ApiInterfaces';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { obtenerIngresos } from '../api/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Estilo
import { styles } from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> { };

export const IngresosScreen = ({ navigation }: Props) => {
  const [tresUltimosIngresos, setTresUltimosIngresos] = useState<IngresoResponseModel[]>([]);
  const [todosIngresos, setTodosIngresos] = useState<IngresoResponseModel[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      // Do something when the screen is focused
      // console.log("hola ingreso index focused");

      const consultarIngresos = async () => {
        try {
          let ingresos: IngresoResponseModel[] = (await obtenerIngresos()).data;
          const id_perfil = await AsyncStorage.getItem("perfil_actual_id");
          // if (!id_perfil)
          if (id_perfil){
            ingresos = ingresos.filter((ingreso) => {
              return ingreso.id_perfil.id_perfil === parseInt(id_perfil);
            });
          }

          if (isActive) {
            setTodosIngresos(ingresos);
            setTresUltimosIngresos(ingresos.slice(-3).reverse());
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
      <ScrollView style={{ padding: 0, margin: 0, flex: 1 }} contentContainerStyle={{ paddingTop: 8 }}>
        <HeaderScreens title='Tu Proyeccion de Ahorro' />

        <GraficaAhorros ingresos={todosIngresos} />

        {/*  Nuevo Ingreso  */}
        <TouchableOpacity
          style={stylesThis.nuevoIngreso}
          activeOpacity={0.8}
          onPress={() => { navigation.navigate('IngresoCreate') }}
        >
          <Text style={[stylesThis.textoBoton, { fontSize: 25 }]}>
            Nuevo Ingreso
          </Text>
        </TouchableOpacity>

        {/* AhorrosRecientes */}
        <View style={stylesThis.ahorrosRecientes}>
          {tresUltimosIngresos.map((ingreso, index) => {
            const tiempo = ingreso.fecha_hora.split('T')[0];

            const ingresoReciente =
              <View key={ ingreso.id_ingreso } style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 30, color: 'white' }}>${ingreso.cantidad}</Text>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{tiempo}</Text>
                  <View style={{ backgroundColor: 'teal', paddingHorizontal: 15, borderStyle: 'solid', borderColor: 'gray', borderRadius: 8, borderWidth: 2 }}>
                    <Text style={{ color: 'white' }}>{ingreso.categoria}</Text>
                  </View>
                </View>
              </View>;

            if (index == 0 || index == 1) {
              return <>
                {ingresoReciente}
                <View key={ ingreso.fecha_hora} style={{ backgroundColor: 'gray', height: 5 }} />
              </>
            } else {
              return ingresoReciente;
            }
          })}


          {/* Ver mas */}
          <TouchableOpacity
            style={stylesThis.verMas}
            activeOpacity={0.8}
            onPress={() => { navigation.navigate('IngresoIndex') }}
          >
            <Text style={stylesThis.textoBoton}>
              Ver más
            </Text>
          </TouchableOpacity>
        </View>

        

      </ScrollView>
    </LinearGradient>
  )
};

const stylesThis = StyleSheet.create({
  ahorrosRecientes: {
    margin: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#101b29'
  },
  verMas: {
    backgroundColor: '#649292',
    width: 100,
    marginTop: 12,
    padding: 5,
    alignSelf: 'flex-end',
    borderRadius: 8
  },
  textoBoton: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Roboto-Bold",
  },
  nuevoIngreso: {
    backgroundColor: '#1d472b',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15,
    padding: 12,
    borderRadius: 15
  },

});