import { StyleSheet, View } from "react-native";
import { Modal, Text, TouchableOpacity } from "react-native";

interface MessageModalProps {
    message: string;
    modalVisible: boolean;
    setModalVisible: (isVisible: boolean) => void;
    onClose?: () => void;
}

export const MessageModal = ({ message, modalVisible, setModalVisible, onClose }: MessageModalProps) => {    
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
            <View style={ modalStyles.centeredView }>
                <View style={ modalStyles.modalView }>
                    <Text 
                        style={ modalStyles.modalText } 
                        className="text-primary"
                    >
                        { message }
                    </Text>

                    <TouchableOpacity 
                        style={ [modalStyles.button, modalStyles.buttonClose] }
                        onPress={ () => {
                            setModalVisible(!modalVisible);
                            if(onClose) onClose();
                        }}
                    >
                        <Text style={ modalStyles.textStyle }>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>      
    );
};

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#D8336A',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    modalText: {
        marginBottom: 15,
        color: 'black',
        // fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
});
