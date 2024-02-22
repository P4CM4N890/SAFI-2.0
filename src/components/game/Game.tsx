import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Snake } from "./Snake";
import { checkGameOver } from "../../utils/checkGameOver";
import { Food } from "./Food";
import { checkItsFood } from "../../utils/checkItsFood";
import { randomPosition } from "../../utils/randomPosition";
import { Header } from "./Header";
import { Colores } from "../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useUiStore } from "../../hooks";
import { startSettingNewHighScore } from "../../store/auth";

const SNAKE_POSICION_INICIAL = [{ x: 5, y: 5}];
const BORDES = { xMin: 1, xMax: 34, yMin: 1, yMax: 68 };
// const BORDES = { xMin: 1, xMax: 36, yMin: 1, yMax: 72 }; pal jodido emulador
const COMIDA_POSICION_INICIAL = randomPosition(BORDES.xMax, BORDES.yMax);
const INTERVALO_MOVIMIENTO = 20;
const INCREMENTO_SCORE = 1;

enum Direcciones {
    Right,
    Up,
    Left,
    Down,
}

export const Game = () => {
    const dispatch = useAppDispatch();
    const { high_score } = useAppSelector( state => state.auth );
    const { changeBarVisibility } = useUiStore();

    const [ direction, setDirection ] = useState<Direcciones>(Direcciones.Right);
    const [ gameOver, setGameOver ] = useState(false);
    const [ snake, setSnake ] = useState(SNAKE_POSICION_INICIAL);
    const [ food, setFood ] = useState(COMIDA_POSICION_INICIAL);
    const [ score, setScore ] = useState(0);
    const [ isPaused, setIsPaused ] = useState(false);

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
          };
    }, []);

    useEffect(() => {
        if(!gameOver){
            const intervalID = setInterval(() => {
                !isPaused && moverSerpiente();
            }, INTERVALO_MOVIMIENTO);

            return () => clearInterval(intervalID);
        }
    }, [gameOver, snake, isPaused]);

    const pauseGame = () => {
        setIsPaused(!isPaused);
    }

    const reloadGame = () => {
        setSnake(SNAKE_POSICION_INICIAL);
        setFood(COMIDA_POSICION_INICIAL);
        setGameOver(false);
        setScore(0);
        setDirection(Direcciones.Right);
        setIsPaused(false);
    }

    const moverSerpiente = () => {
        const head = snake[0];
        const newHead = {
            ...head,
        };

        // Revisar si hubo game over.
        if (checkGameOver(head, BORDES)) {
            setGameOver(prev => !prev);

            if(score > (high_score as number)){
                dispatch( startSettingNewHighScore(score) );
            }
            
            return;
        }

        switch(direction){
            case Direcciones.Up:
                newHead.y -= 1;
                break;
            case Direcciones.Down:
                newHead.y += 1;
                break;
                case Direcciones.Left:
                newHead.x -= 1;
                break;
            case Direcciones.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }

        // Revisar si se comio la comida.
        if(checkItsFood(newHead, food, 2)) {
            setFood(randomPosition(BORDES.xMax, BORDES.yMax));
            setSnake([newHead, ...snake]);
            setScore(score + INCREMENTO_SCORE);
        }
        else {
            // Mover la serpiente.
            setSnake([newHead, ...snake.slice(0, -1)])
        }
    };

    const onSwipe = (event: PanGestureHandlerGestureEvent) => {
        const { translationX, translationY } = event.nativeEvent;

        const transX = Math.round(translationX);
        const transY = Math.round(translationY);

        // Validar si nos movemos en el eje X.
        if (Math.abs(transX) > Math.abs(transY)) {
            // Validar si nos movemos a la izq o der.
            if(transX > 0){
                setDirection(Direcciones.Right);
            }
            else{
                setDirection(Direcciones.Left);
            }
        }
        else{
            // Validar si nos movemos arriba o abajo.
            if(transY > 0){
                setDirection(Direcciones.Down);
            }
            else {
                setDirection(Direcciones.Up);
            }
        }
    }

    return (
        <PanGestureHandler onGestureEvent={ onSwipe }>
            <SafeAreaView style={ styles.container }>
                <Header 
                    reloadGame={ reloadGame }
                    isPaused={ isPaused }
                    pauseGame={ pauseGame }
                    isGameOver={ gameOver }
                >
                    {
                        !gameOver ?
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colores.primary }}>Puntuación: { score }</Text>
                            :
                            <>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colores.primary }}>Puntuación: { score }</Text>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colores.primary }}>Record: { high_score }</Text>
                            </>
                    }
                </Header>

                <View style={ styles.bound }>
                    <Snake snake={ snake }/>
                    <Food { ...food } />
                </View>
                
            </SafeAreaView>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({    
    container: {
        flex: 1,
        backgroundColor: Colores.primary,
    },

    bound: {
        flex: 1,
        borderWidth: 12,
        borderColor: Colores.primary,
        backgroundColor: Colores.background,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    }
});
