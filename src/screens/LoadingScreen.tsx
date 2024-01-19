import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const LoadingScreen = () => {
    return (
        <View className="w-full h-full items-center justify-center z-10">
            <ActivityIndicator size={ 30 } color="black"/>
        </View>
    );
};
