import Toast from 'react-native-toast-message';

export const showToastSuccessMessage = (message: string) => {
    Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: message,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 14 }
    });
};

export const showToastErrorMessage = (message: string) => {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 14 }
    });
};

export const showToastInfoMessage = (title: string, message: string) => {
    Toast.show({
        type: 'info',
        text1: title,
        text2: message,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 14 }
    });
};