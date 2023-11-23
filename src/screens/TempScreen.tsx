import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "../components/buttons/Button";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { obtenerCategoria, obtenerCategorias, obtenerMeta, obtenerMetas, obtenerUsuario, obtenerUsuarios } from "../api/getRequests";
import { CategoriaEdit, UsuarioCreate, UsuarioEdit } from "../interfaces/ApiInterfaces";
import { actualizarCategoria, actualizarUsuario } from "../api/putRequests";
import { eliminarUsuario } from "../api/delRequests";
import { crearUsuario } from "../api/postRequests";

export const TempScreen = () => {
    const { logOut } = useContext( AuthContext );

    const onLogOut = async () => {
        try{
            logOut();
        }
        catch(err){
            console.error(err);
        }
    };

    const peticion = async () => {
        
        try{
            // const { id, nombre, descripcion } = (await obtenerCategoria("e1b20484-fb9e-431b-a8c7-49ed6f3e25d4")).data;
            
            // console.log(id, nombre, descripcion);

            // let categoria: CategoriaEdit = {
            //     nombre: "Transportacion",
            // }

            // let usuario: UsuarioCreate = {
            //     nombre: "Prueba",
            //     correo: "prueba@gmail.com",
            //     fecha_de_nac: "2002-10-21",
            //     contrasena: "1234",
            //     ruta_imagen: "",
            // }

            // const response = (await crearUsuario(usuario));

            const response = (await eliminarUsuario("prueba@gmail.com")).data
            
            console.log(response);
        }
        catch(error) {
            console.error(error);
        }

    }

    return (
        <>
            <View className='content-center'>
                <Text style={{ fontSize: 50, fontWeight: "bold", color: "blue"}}>TEST ZONE</Text>
            
                <TouchableOpacity
                    className={`bg-primary px-8 py-3 rounded-xl shadow-xl shadow-gray-700 mt-5`}
                    activeOpacity={ 0.8 }
                    onPress={ onLogOut }
                >
                    <Text className="text-xl font-bold text-white uppercase">Logout</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    className={`bg-black px-8 py-3 rounded-xl shadow-xl shadow-gray-700 mt-10`}
                    activeOpacity={ 0.8 }
                    onPress={ peticion }
                >
                    <Text className="text-xl font-bold text-white uppercase">Probar</Text>
                </TouchableOpacity>
            </View>

        </>
    );
};
