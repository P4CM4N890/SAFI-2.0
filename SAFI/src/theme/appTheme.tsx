import { 
    StyleSheet,
} from "react-native";


export const colores = {
    primary: '#1E1E1E',
    footer: '#090B0A',
    title: 'white',
    tabsActiveColor: '#8c8c8c',
    tabsInactiveColor: '#ffffff',
};

export const iconSize = {
    small: 20,
    medium: 40,
    large: 60,
};

export const styles = StyleSheet.create({
    
    // Containers

    container: {
        flex: 1, // Usa todo el espacio disponible al no compartir espacio con otro view
        flexDirection: 'column',
        backgroundColor: colores.primary,
    },

    header: {
        flex: 1.5,  // Cuando se comparte con otros view, el número sirve para adaptar el tamaño entre todos los views
        flexDirection: 'row',
    },

    boxHeader1: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxHeader2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#888888',
        // width: 100,
        margin: 10,
        height: 75,
        borderRadius: 200,
        overflow: 'hidden',
    },

    header_column: {
        flex: 2.5,
        flexDirection: 'column',
    },

    boxHeader1_column: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxHeader2_column: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        flex: 10,
        marginTop: 5,
    },

    footer: {
        backgroundColor: colores.footer,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Content

    title: {
        color: colores.title,
        fontSize: 30,
    },

    bienvenida: {
        color: '#51595D',
        fontSize: 34,
        fontWeight: '400',
    },

    photo: {
        width: "100%",
        height: "100%",
        // backgroundColor: 'blue',
        // borderRadius: 30,
    }
    
});

export const styles_login = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        marginTop: 65,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    headerText: {
        fontSize: 45,
        marginLeft: 4,
        color: 'white',
        fontWeight: '500',
    },
    input: {
        height: 45,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 20,
        backgroundColor: '#AAB0C1',
        color: 'black',
        fontFamily: 'Roboto-Regular',
    },
    resetPasswordText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '400',
        textDecorationLine: 'underline',
        fontFamily: 'Roboto-Regular',
    },
    resetPasswordBtn: {
        marginVertical: 10
    },
    loginText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '400',
        fontFamily: 'Roboto-Bold',
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 290,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    signUpText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '400',
        fontFamily: 'Roboto-Regular',
    },
    signUpBtn: {
        alignItems: 'center',
        width: 290,
        marginTop: 10
    },
});

export const styles_recuperarCuenta = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        marginTop: 65,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    headerText: {
        fontSize: 45,
        marginLeft: 4,
        color: 'white',
        fontWeight: '500',
    },
    input: {
        height: 45,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 20,
        backgroundColor: '#AAB0C1',
        color: 'black'
    },
    smallBtnText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '400',
        textDecorationLine: 'underline'
    },
    smallBtn: {
        marginVertical: 10
    },
    resetPasswordText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '400'
    },
    resetPasswordBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 290,
        marginTop: 35,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    loginText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '400',
    },
    loginBtn: {
        alignItems: 'center',
        width: 290,
        marginTop: 10
    },
    containerMensajePassword: {
        height: 20,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
    },
    textMensajePassword: {
        color: '#ff3333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export const styles_signup = StyleSheet.create({
    containerMensajePassword: {
        height: 20,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
    },
    textMensajePassword: {
        color: '#ff3333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerFecha: {
        flexDirection: 'row',
        height: 45,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#AAB0C1',
        color: 'black',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'black'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55
    },
    headerText: {
        fontSize: 45,
        marginLeft: 4,
        color: 'white',
        // fontWeight: '500',
        fontFamily: 'Roboto-Bold',
    },
    input: {
        height: 45,
        width: 300,
        marginVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 20,
        backgroundColor: '#AAB0C1',
        color: 'black',
        fontFamily: 'Roboto-Regular',
    },
    signUpText: {
        fontSize: 20,
        color: 'white',
        // fontWeight: '400',
        fontFamily: 'Roboto-Bold',
    },
    signUpBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 290,
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'green'
    },   
    loginText: {
        fontSize: 16,
        color: 'white',
        // fontWeight: '400',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center'
    },
    loginBtn: {
        alignItems: 'center',
        width: 290,
        marginTop: 10
    },
});

export const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
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
        backgroundColor: 'rgba(0, 58, 16, 1)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    modalText: {
        marginBottom: 15,
        color: 'white',
        // fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
});

export const datePickerStyles = StyleSheet.create({
    textoFecha: {
        flex: 2,
        textAlign: 'left',
        paddingTop: 8,
        fontSize: 20,
    },
    iconoFecha: {
        paddingTop: 5.5,
        paddingRight: 5,
    },
});
