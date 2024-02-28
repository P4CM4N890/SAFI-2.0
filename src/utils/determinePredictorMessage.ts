import { ImageSourcePropType } from "react-native";

export const determinePredictorMessage = (prediction: number, probability: number): [string, ImageSourcePropType] => {

    const imageHigh = require('../assets/predictor/Normal.png') as ImageSourcePropType;
    const imageMedium = require('../assets/predictor/Hard.png') as ImageSourcePropType;
    const imageLow = require('../assets/predictor/Demon.png') as ImageSourcePropType;

    // Mensajes para cuando si puede cumplir la meta.
    if(prediction === 1){
        let message = "De acuerdo a tu historial, puedes cumplir la meta ";

        if( probability <= 33 ){
            return [message += "pero tendras que esforzarte mucho. ¡Tu puedes!"
                    , imageLow];
        }
        else if ( probability >= 33 && probability < 70 ) {
            return [message += "pero no te confies, esfuerzate.", imageMedium];
        }
        else {
            return [message += "sin ningun problema. ¡Vamos a ello!", imageHigh];
        }
    }
    // Mensajes para cuando no puede cumplir la meta.
    else {
        let message = "De acuerdo a tu historial, ";

        if( probability <= 33 ){
            return [message += "es probable de que no completes tu meta a tiempo, pero seguro lo logras."
                    , imageHigh];
        }
        else if ( probability >= 33 && probability < 70 ) {
            return [message += "la meta podria no ser completada a tiempo. Ponle mucho esfuerzo"
                    , imageMedium];
        }
        else {
            return [message += "es extremadamente dificil que llegues a completar la meta. ¡Esfuerzate al máximo!"
                    , imageLow];
        }
    }

};
