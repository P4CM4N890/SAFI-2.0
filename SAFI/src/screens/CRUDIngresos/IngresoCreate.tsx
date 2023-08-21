import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageSourcePropType, Image, ToastAndroid, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { crearIngreso } from '../../api/PostRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MetaAhorroResponseModel } from '../../interfaces/ApiInterfaces';
import { obtenerMetas, obtenerPerfil } from '../../api/GetRequests';
import { actualizarMeta, actualizarPerfil } from '../../api/PutRequests';
import { modalStyles, styles_login } from '../../theme/appTheme';
import { PerfilNinoResponseModel } from '../../interfaces/ApiInterfaces';

interface Props extends StackScreenProps<any, any> { };

export const IngresoCreate = ({ navigation }: Props) => {

  // variables input
  const [dinero, setDinero] = useState("");
  const [meta, setMeta] = useState<MetaAhorroResponseModel>();

  // arreglo de metas para popular el picker
  const [metas, setMetas] = useState<MetaAhorroResponseModel[]>();

  // modal
  const [modalText, setModalText] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      // Do something when the screen is focused

      const consultarMetas = async () => {
        try {
          if (isActive) {
            let arrayMetas: MetaAhorroResponseModel[] = (await obtenerMetas()).data;
            const id_perfil = await AsyncStorage.getItem("perfil_actual_id");
            if (id_perfil){
              setMetas(arrayMetas.filter((meta) => {
                // console.log('meta actual: ', meta.id_perfil.id_perfil);
                // console.log('id perfil actual: ', parseInt(id_perfil));
                return meta.id_perfil.id_perfil === parseInt(id_perfil);
              }))
            }

            // if (metas == undefined) console.error('metas undefined');
          }
        } catch (e) {
          console.error(e);
        }
      };

      consultarMetas();

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // console.log("hola ingreso index unfocused");
        isActive = false;
      };
    }, [])
  );

  const ingresar = async () => {
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
      console.log('errorNaN');
      // ToastAndroid.show('Solo puedes ingresar un numero decimal.', ToastAndroid.SHORT)
      setModalText("Solo puedes ingresar un numero decimal.");
      setModalVisible(true);
      return;
    }

    try {
      const id_perfil = await AsyncStorage.getItem("perfil_actual_id");

      if (id_perfil && meta == null) {
        // Ingreso sin meta
        crearIngreso(new Date, dineroLimpio, 'Ahorro general', parseInt(id_perfil))
          .then((response) => console.log(response));

        const perfil: PerfilNinoResponseModel = (await obtenerPerfil(id_perfil)).data;
        actualizarPerfil(
          perfil.id_perfil,
          perfil.nombre,
          perfil.nombre,
          perfil.ahorro + dineroLimpio,
          perfil.ruta_imagen)
          .then((response) => console.log(response));

        setNavigate(true);
        setModalText("Ingreso creado con exito.");
        setModalVisible(true);
        return;
      } else if (id_perfil && meta) {
        // Ingreso con meta
        crearIngreso(
          new Date,
          dineroLimpio,
          meta.nombre,
          parseInt(id_perfil))
          .then((response) => console.log(response));

        // actualizar dinero
        meta.dinero_actual = meta.dinero_actual + dineroLimpio;
        actualizarMeta(
          new Date(meta.fecha_final),
          meta.nombre,
          meta.dinero_actual,
          meta.objetivo,
          meta.id_meta)
          .then((response) => console.log(response));

        const perfil: PerfilNinoResponseModel = (await obtenerPerfil(id_perfil)).data;
        actualizarPerfil(
          perfil.id_perfil,
          perfil.nombre,
          perfil.nombre,
          perfil.ahorro + dineroLimpio,
          perfil.ruta_imagen)
          .then((response) => console.log(response));

        setNavigate(true);
        setModalText("Ingreso creado con exito.");
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
                  navigation.navigate("IngresosScreen");
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
        <Text style={styles.headerText}>Nuevo Ingreso</Text>
      </View>

      <View style={{
        alignItems: 'center',
        marginTop: 65
      }}>
        {/* Input dinero */}
        <TextInput
          style={[styles.input, { height: 90, fontSize: 50 }]}
          placeholder="$0.00"
          autoCorrect={false}
          keyboardType="decimal-pad"
          autoCapitalize="none"
          // selectionColor="#000"
          placeholderTextColor="#484848"
          onChangeText={newDinero => setDinero(newDinero)}
        />

        {/* Input meta */}
        <Picker
          style={{ ...styles_login.input, height: 40, width: 300, borderRadius: 200, }}
          selectedValue={meta}
          onValueChange={(itemValue, itemIndex) =>
            setMeta(itemValue)
          }
          dropdownIconColor={'gray'}>
          <Picker.Item style={{ fontFamily: 'Roboto-Bold'}} label="Selecciona una meta" value={null} color='gray' />
          {metas?.map((meta) => {
            return <Picker.Item label={meta.nombre} value={meta} color='teal' key={meta.id_meta} />
          })}
          {/* <Picker.Item label="Ahorro general" value="1" color='green' />
          <Picker.Item label="Cheetos" value="2" color='orange' /> */}
        </Picker>


        {/* Ingresar */}
        <TouchableOpacity
          style={styles.signUpBtn}
          activeOpacity={0.8}
          onPress={ingresar}
        >
          <Text
            style={styles.signUpText}
          >
            Ingresar
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
  signUpBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 290,
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: 'green'
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
