import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "../components/buttons/Button";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

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

    return (
        <>
            <View>
                <Text style={{ fontSize: 50, fontWeight: "bold", color: "red"}}>Holaaaaa</Text>
            
                <TouchableOpacity
                    className={`bg-primary px-8 py-3 rounded-xl shadow-xl shadow-gray-700`}
                    activeOpacity={ 0.8 }
                    onPress={ onLogOut }
                >
                    Logout
                </TouchableOpacity>
            </View>

        </>
    );
};
