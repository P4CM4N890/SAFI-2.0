import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageSourcePropType, Image, ToastAndroid, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { crearIngreso } from '../../api/PostRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { IngresoResponseModel, MetaAhorroResponseModel, PerfilNinoResponseModel } from '../../interfaces/ApiInterfaces';
import { obtenerIngreso, obtenerMeta, obtenerMetas, obtenerPerfil } from '../../api/GetRequests';
import { actualizarIngreso, actualizarMeta, actualizarPerfil } from '../../api/PutRequests';
import { modalStyles, styles_login } from '../../theme/appTheme';

interface Props extends StackScreenProps<any, any> { };

export const IngresoEdit = ({ route, navigation }: Props) => {

  const { idIngreso, categoria } = route.params;

  // campos de los inputs
  const [dinero, setDinero] = useState("");
  // const [meta, setMeta] = useState(""); No se puede cambiar meta

  // ingreso antiguo
  const [ingresoAntiguo, setIngresoAntiguo] = useState<IngresoResponseModel>();
  // meta antigua
  const [metaAntigua, setMetaAntigua] = useState<MetaAhorroResponseModel>();

  // let metas: MetaAhorroResponseModel[] = [];

  // modal
  const [modalText, setModalText] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      // Do something when the screen is focused

      // consultar ingreso antiguo
      const consultarIngreso = async () => {
        try {
          let ingresoGet = (await obtenerIngreso(idIngreso)).data;
          if (isActive) {
            setIngresoAntiguo(ingresoGet);
          }
        } catch (error) {
          console.error(error)
        }
      }

      const consultarMeta = async () => {
        try {
          if (isActive) {
            const arrayMetas: MetaAhorroResponseModel[] = (await obtenerMetas()).data;
            const id_perfil = await AsyncStorage.getItem("perfil_actual_id");
            if (!id_perfil) throw new Error("id_perfil nulo"); // TODO error

            const metaConsulta: MetaAhorroResponseModel | undefined = arrayMetas.find((element) => {
              return element.id_perfil.id_perfil === parseInt(id_perfil)
                && element.nombre === categoria;
            })

            if (!metaConsulta) throw new Error("metaConsulta nulo"); // TODO error

            setMetaAntigua(metaConsulta);
          }
        } catch (e) {
          // TODO Handle error
        }
      };

      consultarIngreso();
      consultarMeta();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // console.log("hola ingreso index unfocused");
        isActive = false;
      };
    }, [])
  );

  const actualizar = async () => {
    if (dinero === '') {
      // ToastAndroid.show('Ingresa una cantidad en el campo de dinero.', ToastAndroid.SHORT);
      setModalText("Ingresa una cantidad en el campo de dinero.");
      setModalVisible(true);
      return;
    }

    let dineroLimpio: number = parseFloat(dinero);
    // TODO truncar a dos decimales
    if (dineroLimpio < 0) {
      // ToastAndroid.show('Ingresa una cantidad de dinero positivo.', ToastAndroid.SHORT);
      setModalText("Ingresa una cantidad de dinero positivo.");
      setModalVisible(true);
      return;
    }

    console.log(dineroLimpio);
    if (isNaN(dineroLimpio)) {
      console.log('errorNaN');// TODO error
      // ToastAndroid.show('Solo puedes ingresar un numero decimal.', ToastAndroid.SHORT)
      setModalText("Solo puedes ingresar un numero decimal.");
      setModalVisible(true);
      return;
    }

    try {
      const id_perfil = await AsyncStorage.getItem("perfil_actual_id");

      if (id_perfil && metaAntigua && ingresoAntiguo) {
        // Editar con meta

        // crearIngreso(new Date, dineroLimpio, meta, parseInt(id_perfil))
        //   .then((response) => console.log(response));
        actualizarIngreso(idIngreso, new Date(ingresoAntiguo.fecha_hora), dineroLimpio, ingresoAntiguo.categoria)
          .then((response) => console.log(response));


        // determinar el nuevo dinero actual de la meta
        let nuevo_dinero_para_meta = -1;

        const perfil: PerfilNinoResponseModel = (await obtenerPerfil(id_perfil)).data;
        // y el nuevo ahorro total del perfil
        let nuevo_ahorro_perfil = perfil.ahorro;

        if (metaAntigua.dinero_actual < dineroLimpio) {
          let diferencia = dineroLimpio - metaAntigua.dinero_actual;
          //sumar la diferencia para obtener el nuevo dinero
          nuevo_dinero_para_meta = metaAntigua.dinero_actual + diferencia;
          nuevo_ahorro_perfil = nuevo_ahorro_perfil + diferencia;
        } else if (metaAntigua.dinero_actual > dineroLimpio) {
          let diferencia = metaAntigua.dinero_actual - dineroLimpio;
          //restar la diferencia para obtener el nuevo dinero
          nuevo_dinero_para_meta = metaAntigua.dinero_actual - diferencia;
          nuevo_ahorro_perfil = nuevo_ahorro_perfil - diferencia;
        } else if (metaAntigua.dinero_actual === dineroLimpio) {
          // se mantienen
          nuevo_dinero_para_meta = metaAntigua.dinero_actual;
          nuevo_ahorro_perfil = nuevo_ahorro_perfil;
        } else {
          // ??
          if (nuevo_dinero_para_meta === -1) {
            console.error('Error en el nuevo dinero de la meta.');
            return;
          }
        }

        actualizarMeta(new Date(metaAntigua.fecha_final), metaAntigua.nombre, nuevo_dinero_para_meta, metaAntigua.objetivo, metaAntigua.id_meta)
          .then((response) => console.log(response.data));

        // actualizar ahorro total del perfil
        console.log('Nuevo ahorro perfil:');
        console.log(nuevo_ahorro_perfil);
        actualizarPerfil(
          perfil.id_perfil,
          perfil.nombre,
          perfil.nombre,
          nuevo_ahorro_perfil,
          perfil.ruta_imagen)
          .then((response) => console.log(response), () => console.log('error'));

        setNavigate(true);
        setModalText("Ingreso actualizado con exito.");
        setModalVisible(true);

        return;
      }

      if (id_perfil && ingresoAntiguo) {
        // Editar sin meta
        actualizarIngreso(idIngreso, new Date(ingresoAntiguo.fecha_hora), dineroLimpio, ingresoAntiguo.categoria)
          .then((response) => console.log(response));

        // -- Actualizar ahorro total del perfil
        const perfil: PerfilNinoResponseModel = (await obtenerPerfil(id_perfil)).data;
        let nuevo_ahorro_perfil = perfil.ahorro;
        // le sumamos o restamos la diferencia
        nuevo_ahorro_perfil = nuevo_ahorro_perfil + (dineroLimpio - ingresoAntiguo.cantidad);
        
        actualizarPerfil(
          perfil.id_perfil,
          perfil.nombre,
          perfil.nombre,
          nuevo_ahorro_perfil,
          perfil.ruta_imagen)
          .then((response) => console.log(response), () => console.log('error'));

        setNavigate(true);
        setModalText("Ingreso actualizado con exito.");
        setModalVisible(true);

        return;
      }
    } catch (err) {
      setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
      setModalVisible(true);
    }

  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 58, 16, 1)',
      ]}
      locations={[-0.0745, 0.3689, 1.134]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>{modalText}</Text>
            {
              (modalText === 'Ha ocurrido un error. Intentalo de nuevo más tarde.') ?
                <Image
                  style={{ width: 150, height: 150, marginBottom: 10 }}
                  source={require('../../assets/4.png')}
                />
              :
                <></>
            }
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible)
                if (navigate) {
                  navigation.navigate("IngresoIndex");
                }
                else {
                  setModalVisible(false);
                }
              }}
            >
              <Text style={modalStyles.textStyle}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar Ingreso</Text>
      </View>

      <View style={{
        alignItems: 'center',
        marginTop: 65
      }}>
        {/* Input dinero */}
        <TextInput
          style={[styles.input, { height: 90, fontSize: 50 }]}
          placeholder="$0.00"
          defaultValue={ingresoAntiguo?.cantidad.toString()}
          autoCorrect={false}
          keyboardType="decimal-pad"
          autoCapitalize="none"
          // selectionColor="#000"
          placeholderTextColor="#484848"
          onChangeText={newDinero => setDinero(newDinero)}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => ToastAndroid.show('No puedes cambiar la meta de un ingreso.', ToastAndroid.SHORT)}
        >
          {/* Input meta */}
          <Picker
              style={{ ...styles_login.input, height: 40, width: 300, borderRadius: 200, }}

            enabled={false} // deshabilitado
            dropdownIconColor={'white'}
          >
            <Picker.Item label={metaAntigua ? metaAntigua.nombre : 'Ahorro General'} value={metaAntigua} color='teal' />
          </Picker>
        </TouchableOpacity>

        {/* Editar */}
        <TouchableOpacity
          style={styles.ActualizarBtn}
          activeOpacity={0.8}
          onPress={actualizar}
        >
          <Text
            style={styles.signUpText}
          >
            Actualizar
          </Text>
        </TouchableOpacity>

        {/* Cancelar */}
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={() => { navigation.pop() }}
        >
          <Text
            style={styles.loginText}
          >
            Cancelar
          </Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'black'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  headerText: {
    fontSize: 45,
    marginLeft: 4,
    color: 'white',
    fontWeight: '500',
  },
  input: {
    height: 45,
    width: 300,
    marginVertical: 13,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 20,
    backgroundColor: '#AAB0C1',
    color: 'black'
  },
  signUpText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '400'
  },
  ActualizarBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 290,
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: '#006DFF'
  },
  loginText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400',
  },
  loginBtn: {
    alignItems: 'center',
    width: 290,
    marginTop: 10
  }
});
