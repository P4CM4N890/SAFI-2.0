import React from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType
} from 'react-native';
import { StyleSheet } from "react-native";

type BotonNavProps = {
  tipo: string;
};

interface Icono {
  src: ImageSourcePropType;
}

export const BotonNav = (props: BotonNavProps) => {

  /* Campana = Menu de notificaciones,
  *  $ = Ahorros,
  *  La casa es la página principal,
  *  la bandera son las metas
  *  y el engran son las configuraciones
  */

  const icono_notificaciones: Icono = {
    src: require('../assets/ico_notificaciones.png')
  };
  const icono_ahorros: Icono = {
    src: require('../assets/ico_ahorros.png')
  };
  const icono_pagina_principal: Icono = {
    src: require('../assets/ico_pagina_principal.png')
  };
  const icono_metas: Icono = {
    src: require('../assets/ico_metas.png')
  };
  const icono_configuracion: Icono = {
    src: require('../assets/ico_configuracion.png')
  };

  switch (props.tipo) {
    case 'notificaciones': {
      return (
        <View style={styles_boton_nav.general}>
          <Image
            source={icono_notificaciones.src}
            style={styles_boton_nav.icono}
          />
        </View>
      );
    }
    case 'ahorros': {
      return (
        <View style={styles_boton_nav.general}>
          <Image
            source={icono_ahorros.src}
            style={styles_boton_nav.icono}
          />
        </View>
      );
    }
    case 'pagina_principal': {
      return (
        <View style={styles_boton_nav.general}>
          <Image
            source={icono_pagina_principal.src}
            style={styles_boton_nav.icono}
          />
        </View>
      );
    }
    case 'metas': {
      return (
        <View style={styles_boton_nav.general}>
          <Image
            source={icono_metas.src}
            style={styles_boton_nav.icono}
          />
        </View>
      );
    }
    case 'configuracion': {
      return (
        <View style={styles_boton_nav.general}>
          <Image
            source={icono_configuracion.src}
            style={styles_boton_nav.icono}
          />
        </View>
      );
    }
    default: { // Tarjeta por defecto
      return (
        <View>
          <Text>Defecto</Text>
        </View>
      );
    }
  }

};

const styles_boton_nav = StyleSheet.create({
  general: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    flex: 1
  }
});