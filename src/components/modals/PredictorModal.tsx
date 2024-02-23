import { Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../store/hooks";

interface Props {
    modalVisible: boolean;
    setModalVisible: (isVisible: boolean) => void;
    onClose?: () => void;
}

export const PredictorModal = ({ modalVisible, setModalVisible, onClose}: Props) => {
    const { prediction } = useAppSelector( state => state.goals );

    const imageHigh = require('../../assets/predictor/Normal.png') as ImageSourcePropType;
    const imageMedium = require('../../assets/predictor/Hard.png') as ImageSourcePropType;
    const imageLow = require('../../assets/predictor/Demon.png') as ImageSourcePropType;

    const percentage = Number(prediction!.probabilidad);

    const imageToShow = ( percentage <= 33 ) ? imageLow 
    : ( percentage > 33 && percentage <= 70 ) ? imageMedium : imageHigh;

    let textToShow = 'De acuerdo con tu historial, ';
    textToShow += ( percentage <= 33 ) ? 'tienes que esforzarte mucho extra para completar tu meta. ¡Tu puedes!' 
    : ( percentage > 33 && percentage <= 70 ) ? 'es muy probable que completes tu meta, pero no te confies.' 
    : 'cumpliras tu meta sin ninguna dificultad.';

    return (
        <Modal
            animationType="fade"
            transparent
            visible={ modalVisible }
            onRequestClose={ () => {
                setModalVisible(!modalVisible);
                if(onClose) onClose();
            }}
        >
            <View
                className='w-full flex-1 justify-center items-center mt-2'
            >
                <View 
                    className='m-5 rounded-2xl p-9 items-center bg-white'
                >
                    <Image className='w-10 h-10' source={ imageToShow } />

                    <Text
                        className='mb-4 text-black text-center font-bold text-lg mt-4'
                    >
                        { textToShow }
                    </Text>

                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        className='bg-red rounded-2xl p-3 mt-4'
                        onPress={ () => {
                            setModalVisible(!modalVisible);
                            if(onClose) onClose();
                        }}
                    >
                        <Text
                            className='text-white text-center font-bold'
                        >
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </Modal>
    );
};


