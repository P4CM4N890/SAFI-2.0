import { View, Text } from "react-native"
import { Button } from "../components/Login-SignIn/Button";
import { Input } from "../components/Login-SignIn/Input";

export const TestScreen = () => {
    return (
        <View className="items-center justify-center bg-white p-12">
            <Text className="text-2xl text-green-900">
                Prueba 2
            </Text>
            <Input placeholder="Correo electrónico" type="email"/>
            <Input placeholder="Contraseña" type="text" extraClass="my-6"/>
            <Button label="iniciar sesión"/>
        </View>
    );
};
