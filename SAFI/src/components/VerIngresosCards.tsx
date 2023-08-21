import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  View, Text, StyleSheet,
  ImageSourcePropType, Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

interface Icono {
  src: ImageSourcePropType;
};

type CardProps = {
  dinero: string;
  fecha: string;
  categoria: string;
  idIngreso: number;
};

const icono_edit: Icono = {
  src: require('../assets/ico_edit.png')
};

const icono_delete: Icono = {
  src: require('../assets/ico_delete.png')
};

export const VerIngresosCards = ({ dinero, fecha, categoria, idIngreso }: CardProps) => {

  const navigation = useNavigation();

  return (
    <View style={styles.containerIngreso}>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{dinero}</Text>
        </View>
        <View style={styles.containerFecha}>
          <View style={styles.boxFecha}>
            <Text style={styles.texto}>Fecha:</Text>
          </View>
          <View style={styles.boxFechaValue}>
            <Text style={styles.textoFecha}>{fecha}</Text>
          </View>
        </View>
        <View style={{marginVertical: 5, marginHorizontal: 25, alignItems: 'center', backgroundColor: 'teal', borderStyle: 'solid', borderColor: colores.borderC, borderRadius: 8, borderWidth: 2}}>
          <Text style={styles.textoCategoria}>{categoria}</Text>
        </View>
      </View>
      <View style={styles.bttns}>
        <View style={[styles.containerBtton, styles.bttn1]}>
          <TouchableOpacity
            style={styles.toucha}
            onPress={() => navigation.navigate('IngresoEditar', {idIngreso, categoria})}
          >
            <Image
              source={icono_edit.src}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.containerBtton, styles.bttn2]}>
          <TouchableOpacity
            style={styles.toucha}
          >
            <Image
              source={icono_delete.src}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

export const colores = {
  primary: '#1E1E1E',
  footer: '#090B0A',
  title: 'white',
  tabsActiveColor: '#7a7979',
  tabsInactiveColor: '#ffffff',
  bg: '#1B221F',
  borderC: '#51595D',
  texto: 'white',
  verde: '#214E28',
  azul: '#212B4E',
  verdeLimon: '#5CE998',
};

const styles = StyleSheet.create({
  containerIngreso: {
    flex: 1,
    backgroundColor: colores.bg,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colores.borderC,
    margin: 5,
    padding: 0,
    flexDirection: 'row',
  },

  containerTitle: {
    flex: 1,
  },

  containerFecha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 25,
  },

  content: {
    flex: 7,
    paddingVertical: 10,
    borderRightWidth: 2,
    borderRightColor: colores.borderC,
  },

  bttns: {
    flex: 1,
    flexDirection: 'column',
  },

  containerBtton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colores.borderC,
  },

  bttn1: {
    borderBottomWidth: 1,
  },

  bttn2: {
    borderTopWidth: 1,

  },

  toucha: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxFecha: {
    flex: 1,
    alignItems: 'center',
  },

  boxFechaValue: {
    flex: 4,
    alignItems: 'flex-end',
  },

  containerProgress: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 35,
    color: colores.title,
    margin: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  textoGrande: {
    marginLeft: 5,
    fontSize: 18,
    color: colores.texto,
  },

  textoFecha: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colores.texto,
  },
  
  textoCategoria: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  texto: {
    fontSize: 15,
    color: colores.texto,
  },
});