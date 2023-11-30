import { StyleSheet, View, Text } from "react-native";
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

                return(
                    index === 0 ? 
                        <View key={ index } style={ [ styles.snake, segmentStyle ] } />
                    :
                        <View key={ index } style={ [ styles.body, segmentStyle ] } />
                        
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'red',
        position: "absolute",
    },

    body: {
        width: 15,
        height: 15,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#a6ffcb',
        position: "absolute",
        opacity: 5,
    }
})
