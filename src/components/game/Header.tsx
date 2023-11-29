import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colores } from "../../styles/colors";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    reloadGame: () => void;
    pauseGame: () => void;
    isPaused: boolean;
    isGameOver: boolean;
    children: JSX.Element;
}

export const Header = ({ children, reloadGame, pauseGame, isPaused, isGameOver}: Props) => {
    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ reloadGame }>
                <Icon name="reload-circle-outline" size={ 30 } color={ Colores.primary } />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={ pauseGame }>
                {
                    !isGameOver &&
                    <Icon 
                        name={ isPaused ? "pause-circle-outline" : "play-circle-outline" } 
                        size={ 30 } 
                        color={ Colores.primary }
                        disabled
                    />
                }
            </TouchableOpacity>

            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 12,
        borderColor: Colores.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: Colores.background,
    }
})
