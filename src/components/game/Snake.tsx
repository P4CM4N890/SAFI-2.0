import { StyleSheet, View } from "react-native";
import { Colores } from "../../styles/colors";

interface Coordenada {
    x: number,
    y: number,
}

interface Props {
    snake: Coordenada[],
}

export const Snake = ({ snake }: Props) => {
    return (
        <>
            { snake.map((segment: any, index: number) => {
                const segmentStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10,
                }

                return <View key={ index } style={ [ styles.snake, segmentStyle ] } />
            })}
        </>
    );
};

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: Colores.primary,
        position: "absolute",
    }
})
