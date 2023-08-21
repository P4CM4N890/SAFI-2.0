import React from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType
} from 'react-native';
import { StyleSheet, TouchableOpacity } from "react-native";

type CardProps = {
  tipo: string;
  ahorro? : number;
  navegar?: () => void;
};

interface Imagen {
  src: ImageSourcePropType;
}

export const MenuCard = ({ tipo, ahorro, navegar }: CardProps) => {

  const imagen_metas: Imagen = {
    src: require('../assets/metas.png')
  };
  const imagen_ingresos: Imagen = {
    src: require('../assets/ingresos.png')
  };
  const imagen_consejo: Imagen = {
    src: require('../assets/consejo.png')
  };

  switch (tipo) {
    case 'ahorro': {
      return (
        <View style={[styles_card.general, styles_card.ahorro]}>
          <Text style={styles_card.texto_titulo}>AHORRO TOTAL:</Text>
          <Text style={styles_card.ahorro_cant}>${ ahorro }</Text>
        </View>
      );
    }
    case 'metas': {
      return (
        <TouchableOpacity 
          style={[styles_card.general, styles_card.metas, { flexDirection: 'row' }]}
          onPress={ navegar }
        >
          <View style={styles_card.columna_texto}>
            <Text style={styles_card.texto_titulo}>METAS:</Text>
            <Text style={styles_card.texto}>No busques pretextos, empieza a planificar el ahorro para poder comprar lo que deseas.</Text>
          </View>
          <View style={styles_card.columna_imagen}>
            <Image
              source={imagen_metas.src}
              style={styles_card.imagenes}
            />
          </View>
        </TouchableOpacity>
      );
    }
    case 'ingresos': {
      return (
        <TouchableOpacity 
          style={[styles_card.general, styles_card.ingresos, { flexDirection: 'row' }]}
          onPress={ navegar }
        >
          <View style={styles_card.columna_texto}>
            <Text style={styles_card.texto_titulo}>INGRESOS:</Text>
            <Text style={styles_card.texto}>Lleva un registro de todo el dinero que vas ahorrando. Tranquilo, Hacienda no se enterará.</Text>
          </View>
          <View style={styles_card.columna_imagen}>
            <Image
              source={imagen_ingresos.src}
              style={styles_card.imagenes}
            />
          </View>
        </TouchableOpacity>
      );
    }
    case 'consejo': {
      return (
        <View style={[styles_card.general, styles_card.consejo, { flexDirection: 'row' }]}>
          <View style={styles_card.columna_texto}>
            <Text style={styles_card.texto_titulo}>CONSEJO DEL DIA:</Text>
            <Text style={styles_card.texto}>Para ahorrar en comida raspa el azucar de tu pan para preparar tu café.</Text>
          </View>
          <View style={styles_card.columna_imagen}>
            <Image
              source={imagen_consejo.src}
              style={styles_card.imagenes}
            />
          </View>
        </View>
      );
    }
    default: { // Tarjeta por defecto
      return (
        <View style={styles_card.general}>
          <Text>Defecto</Text>
        </View>
      );
    }
  }

};

const styles_card = StyleSheet.create({
  general: {
    borderRadius: 15,
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ahorro: {
    backgroundColor: '#214E28',
  },

  metas: {
    backgroundColor: '#101928',
  },

  ingresos: {
    backgroundColor: '#1a1027',
  },

  consejo: {
    backgroundColor: '#0d1110',
  },

  texto_titulo: {
    color: '#ffffff',
    fontSize: 24,
    // fontWeight: '800',
    fontFamily: 'Roboto-Black',
  },

  ahorro_cant: {
    color: '#35d863',
    fontSize: 24,
    // fontWeight: '800',
    fontFamily: 'Roboto-Black',
  },

  columna_texto: {
    flex: 5,
    flexDirection: 'column',
    marginLeft: 30,
  },

  columna_imagen: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    color: '#888888',
    fontFamily: 'Roboto-Regular',
  },

  imagenes: {
    width: 48,
    height: 48,
    resizeMode: 'center'
  },
});