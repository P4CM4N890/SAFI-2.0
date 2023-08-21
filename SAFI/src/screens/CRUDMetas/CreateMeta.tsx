import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { modalStyles } from '../../theme/appTheme';
import { HeaderScreens } from '../../components/HeaderScreens';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../../hooks/useForm';
import { crearAhorro } from '../../api/PostRequests';
import { obtenerPerfil } from '../../api/GetRequests';
import { PerfilNinoResponseModel } from '../../interfaces/ApiInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNotification } from '../../helpers/createNotification';
import { StackScreenProps } from '@react-navigation/stack';

// función para mostrar la fecha con el formato d/m/aaaa pd: es de Alain
interface Props extends StackScreenProps<any, any> { };

function parseDate(dateString: string): Date {
  const dateParts = dateString.split('/');

  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[2]);

  const date = new Date(year, month, day);

  return date;
};

const initialState = {
  meta: "",
  dinero: 0,
};


export const CreateMeta = ({ navigation }: Props) => {
  // const navigation = useNavigation(); 

  const minimum = parseDate(new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleString('es-MX'));
  console.log('minimum', minimum);

  // Datos a almacenar
  const { meta, dinero, onChange } = useForm(initialState);

  const [date, setDate] = useState(minimum);
  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState(parseDate(new Date().toLocaleDateString('es-MX')));
  const [showFecha, setShowFecha] = useState(false);
  const [modalText, setModalText] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [navigate, setNavigate] = useState(false);

  // Función para crear la meta
  const createMeta = async () => {
    try {
      const perfil = await AsyncStorage.getItem("perfil_actual_id");

      if (perfil) {
        const id_perfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;

        if (fecha > date) {
          setModalText("La fecha a finalizar no puede ser antes de la fecha de inicio.");
          setModalVisible(true);
        }
        else {
          await crearAhorro(fecha, date, meta, 0, dinero, id_perfil.id_perfil);

          createNotification(meta, date);

          setNavigate(true);
          setModalText("Meta creada con exito.");
          setModalVisible(true);
        }
      }
    }
    catch (err) {
      if (meta.length < 2) {
        setModalText("El nombre debe superar los dos caracteres.");
        setModalVisible(true);
      }
      else if (dinero <= 0) {
        setModalText("La meta a alcanzar no puede ser menor a un centavo.");
        setModalVisible(true);
      }
      else {
        setModalText("Ha ocurrido un error. Intentalo de nuevo más tarde.");
        setModalVisible(true);
      }
    }
  }

  return (
    <LinearGradient style={stylesM.container}
      colors={[
        'rgba(0, 58, 16, 1)',
        'rgba(0, 0, 0, 1)',
        'rgba(0, 0, 0, 1)',
      ]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.4, 1]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={{ flex: 1 }}>
        <HeaderScreens title='Crear Meta' />
        <View style={stylesM.containerContent}>
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
                  (modalText === 'Meta creada con exito.') ?
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={require('../../assets/ok.png')}
                    />
                  : (modalText === 'Ha ocurrido un error. Intentalo de nuevo más tarde.') ?
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
                      navigation.navigate("MetasScreen");
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
          {/* Input para el nombre de la meta */}
          <View style={[stylesM.datos, stylesM.margen]}>
            <Text style={stylesM.header}>Nombre de la meta:</Text>
            <TextInput
              style={stylesM.inputs}
              underlineColorAndroid='transparent'
              onChangeText={(value) => onChange(value, 'meta')}
            />
          </View>
          {/* Input para ingresar la fecha cuando se inicia */}
          <View style={stylesM.datos}>
            <Text style={stylesM.header}>Fecha inicial:</Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              activeOpacity={1}
              style={[stylesM.fecha, stylesM.iconos]}
            >
              <Icon name="calendar-outline" size={24} color="white" style={stylesM.espacio} />
              <Text style={stylesM.textoIconos}>
                {fecha.toLocaleDateString('es-MX')}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              date={fecha}
              mode='date'
              maximumDate={new Date()}
              onConfirm={(date) => {
                setOpen(false)
                setFecha(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
          {/* Input para establecer la fecha a finalizar */}
          <View style={stylesM.datos}>
            <Text style={stylesM.header}>Fecha propuesta a finalizar:</Text>
            <TouchableOpacity
              onPress={() => setShowFecha(true)}
              activeOpacity={1}
              style={[stylesM.fecha, stylesM.iconos]}
            >
              <Icon name="calendar-outline" size={24} color="white" style={stylesM.espacio} />
              <Text style={stylesM.textoIconos}>
                {date.toLocaleDateString('es-MX')}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={showFecha}
              date={date}
              minimumDate={date}
              mode='date'
              onConfirm={(date) => {
                setShowFecha(false)
                setDate(date)
              }}
              onCancel={() => {
                setShowFecha(false)
              }}
            />
          </View>
          {/* Dinero actual */}
          <View style={stylesM.datos}>
            <Text style={stylesM.header}>Dinero actual:</Text>
            <View style={[stylesM.iconos, stylesM.border]}>
              <Icon name="cash-outline" size={24} color="white" style={stylesM.espacio} />
              <TextInput
                style={[stylesM.inputs, stylesM.dinero]}
                inputMode='numeric'
                editable={false}
                defaultValue='$0'
              />
            </View>
          </View>
          {/* Meta */}
          <View style={stylesM.datos}>
            <Text style={stylesM.header}>Meta a alcanzar:</Text>
            <View style={[stylesM.iconos, stylesM.border]}>
              <Icon name="trophy-outline" size={24} color="white" style={stylesM.espacio} />
              <TextInput
                style={[stylesM.inputs, stylesM.dinero]}
                inputMode='numeric'
                editable={true}
                placeholder='$0'
                placeholderTextColor={colores.texto}
                onChangeText={(value) => onChange(value, 'dinero')}
              />
            </View>
          </View>
          {/* Botones */}
          <View style={stylesM.bttns}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[stylesM.botones, stylesM.guardar]}
                onPress={createMeta}
              >
                <Text style={stylesM.textoBttns}>Guardar</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[stylesM.botones, stylesM.cancelar]}
                onPress={() => navigation.goBack()}
              >
                <Text style={stylesM.textoBttns}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export const colores = {
  primary: '#1E1E1E',
  footer: '#090B0A',
  title: 'white',
  tabsActiveColor: '#7a7979',
  tabsInactiveColor: '#ffffff',
  bg: '#1B221F',
  borderC: '#51595D',
  texto: '#888888',
  verde: '#214E28',
  azul: '#212B4E',
  verdeLimon: '#5CE998',
  rojo: '#6D0014',
};

const stylesM = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerContent: {
    flex: 9,
    backgroundColor: colores.bg,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colores.borderC,
    marginVertical: 20,
    marginHorizontal: 15,
  },

  datos: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 5,
  },

  fecha: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    paddingVertical: 5,
  },

  margen: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },

  espacio: {
    marginHorizontal: 10,
    marginVertical: 2,
    flex: 1,
  },

  dinero: {
    padding: 5,
    borderRadius: 15,
    flex: 10,
  },

  header: {
    color: colores.texto,
    fontSize: 16,
  },

  inputs: {
    borderRadius: 2,
    fontSize: 22,
    color: 'white',
  },

  bttns: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconos: {
    flexDirection: 'row',
  },

  textoIconos: {
    fontSize: 22,
    color: 'white',
    marginHorizontal: 5,
    flex: 10,
  },

  border: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },

  botones: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },

  guardar: {
    backgroundColor: colores.verde,
    borderBottomLeftRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelar: {
    backgroundColor: colores.rojo,
    borderBottomRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBttns: {
    color: colores.title,
    fontSize: 22,
  },
});