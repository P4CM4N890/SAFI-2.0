import { Image, ImageSourcePropType, Modal, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { determinePredictorMessage } from "../../utils";

interface Props {
    modalVisible: boolean;
    setModalVisible: (isVisible: boolean) => void;
    onClose?: () => void;
}

export const PredictorModal = ({ modalVisible, setModalVisible, onClose}: Props) => {
    const { prediction } = useAppSelector( state => state.goals );

    const pred = Number(prediction!.prediccion);
    const percentage = Number(prediction!.probabilidad);

    const [textToShow, imageToShow] = determinePredictorMessage(pred, percentage*100);

    return (
        <Modal
            animationType="fade"
            transparent
            visible={ modalVisible }
            onRequestClose={ () => {
                setModalVisible(!modalVisible);
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

                    <View
                        className='flex-row space-x-9'
                    >
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            className='bg-green rounded-2xl p-3 mt-4'
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
                        
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            className='bg-red rounded-2xl p-3 mt-4 ml-3'
                            onPress={ () => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text
                                className='text-white text-center font-bold'
                            >
                                Regresar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </Modal>
    );
};


