import { StyleSheet, Text } from "react-native";

interface Props {
    x: number;
    y: number;
}

export const Food = ({ x, y }: Props) => {
    return (
        <Text
            style={ [ { top: y * 10, left: x * 10 }, styles.food ] }
        >
            💰
        </Text>
    );
};

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 7,
        position: "absolute",
    }
});
