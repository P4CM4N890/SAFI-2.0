import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { PieChart } from 'react-native-gifted-charts';

// Este import sirve para navegar con los componentes que no están dentro del stackNavigator
import { useNavigation } from '@react-navigation/native';

type itemType = {
    value: number
}

type CardProps = {
    tipo: string;
    title?: string;
    start?: string;
    finish?: string;
    resumen?: number;
    total?: number;
    metas?: number;
    metasTotal?: number;
    datos?: itemType[];
    flag?: boolean;
    id?: number;
};


export const CardsMetas = (props: CardProps) => {
    const navigation = useNavigation();     // Propiedad para llamar a la función de navigation
    const [variables, setVariables] = useState(props.datos); 
    const [ dineroActual, setDineroActual ] = useState(props.resumen)
    const [ dineroFinal, setDineroFinal ] = useState(1);

    switch (props.tipo) {
        case 'meta': {
            if(props.title) {
                return (
                    <View style={[styles.container_meta, styles.general]}> 
                        <View style={styles.box_title}>
                            <Text style={styles.title}>Meta Fijada</Text>
                        </View>
                        <View style={styles.box_container}>
                            <Text style={[styles.textoGrande]}>{props.title}</Text>
                            <View style={styles.fecha}>
                                <View style={styles.boxFecha}>
                                    <Text style={[styles.texto]}>Fecha de Inicio:</Text>
                                </View>
                                <View style={styles.boxFecha}>
                                    <Text style={[styles.textoFecha]}>{props.start}</Text>
                                </View>
                            </View>
                            <View style={styles.fecha}>
                                <View style={styles.boxFecha}>
                                    <Text style={[styles.texto]}>Fecha a Finalizar:</Text>
                                </View>
                                <View style={styles.boxFecha}>
                                    <Text style={[styles.textoFecha]}>{props.finish}</Text>
                                </View>
                            </View>
                            <View style={styles.centrar}>
                                <Text style={styles.textoGrande}>${props.resumen} / ${props.total}</Text>
                                <Progress.Bar 
                                    progress={props.resumen/props.total}
                                    color={colores.verdeLimon}
                                    height={8}
                                    width={300}
                                />
                            </View>
                        </View>
                    </View>
                );
            } else{
                return(
                    <View style={[styles.container_meta_sin, styles.general]}>
                        <View style={styles.box_title}>
                            <Text style={styles.title}>No hay una meta fijada</Text>
                        </View>
                    </View>
                );
            }
        }

        case 'resumen': {
            
            if(props.metasTotal !== 0){
                if(!props.flag){
                    return (
                        <View style={[styles.container_resumen, styles.general]}>
                            <View style={styles.box_title}>
                                <Text style={styles.title}>Resumen de Metas</Text>
                            </View>
                            <View style={[styles.box_container]}>
                                <View style={[styles.centrar, styles.box_pastel]}>
                                    <Text style={styles.title}>Aún no tienes ingresos en metas</Text>
                                </View>
                                <View style={[styles.centrar, styles.box_grafica]}>
                                    <Text style={styles.textoGrande}>Metas {props.metas}/{props.metasTotal}</Text>
                                        <Progress.Bar 
                                            progress={(props.metas)/(props.metasTotal)}
                                            color={colores.verdeLimon}
                                            height={8}
                                            width={300}
                                        />
                                </View>
                            </View>
                        </View>
                    );
                }
                else{
                    return (
                        <View style={[styles.container_resumen, styles.general]}>
                            <View style={styles.box_title}>
                                <Text style={styles.title}>Resumen de Metas</Text>
                            </View>
                            <View style={[styles.box_container]}>
                                <View style={[styles.centrar, styles.box_pastel]}>
                                    <PieChart
                                        data={props.datos}
                                        radius={40}     // Tamaño de la gráfica de pastel
                                        donut       // Quita el espacio en medio con un circulo blanco (default)
                                        innerCircleColor = {colores.bg}     // Cambia el color del circulo del donut
                                    />
                                </View>
                                <View style={[styles.centrar, styles.box_grafica]}>
                                    <Text style={styles.textoGrande}>Metas {props.metas}/{props.metasTotal}</Text>
                                        <Progress.Bar 
                                            progress={(props.metas)/(props.metasTotal)}
                                            color={colores.verdeLimon}
                                            height={8}
                                            width={300}
                                        />
                                </View>
                            </View>
                        </View>
                    );
                }
            }
            else{
                return (
                    <View style={[styles.container_resumen, styles.general]}>
                        <View style={styles.box_title}>
                            <Text style={styles.title}>No tienes metas</Text>
                        </View>
                    </View>
                );
            }
        }

        case 'botones': {
            return (
                <View style={[styles.container_btt, styles.general]}>
                    <TouchableOpacity style={[styles.bttns, styles.bttn1]} 
                        onPress={() => navigation.navigate('VerMetasScreen')}
                    >
                        <Text style={styles.title}>Ver Metas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.bttns, styles.bttn2]} onPress={() => navigation.navigate('AbonarMeta')}>
                        <Text style={styles.title}>Abonar a Meta</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        case 'add': {
            return (
                <View style={[styles.container_add, styles.general]}>
                    <TouchableOpacity style={styles.bttnMas} onPress={() => navigation.navigate("CreateMeta")}>
                        <Text style={styles.title}>+</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        default: {
            return (
                <View><Text>Error</Text></View>
            );
        }
    }
}

export const colores = {
    primary: '#1E1E1E',
    footer: '#090B0A',
    title: 'white',
    tabsActiveColor: '#7a7979',
    tabsInactiveColor: '#ffffff',
    bg: '#1B221F',
    borderC: '#51595D',
    texto: '#888888',
    verde: '#214E28',
    azul: '#212B4E',
    verdeLimon: '#5CE998',
};

const styles = StyleSheet.create({
    container_meta: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: colores.bg,
        borderWidth: 2,
        borderColor: colores.borderC,
    },

    container_meta_sin: {
        flex: 1.5,
        backgroundColor: colores.bg,
        borderWidth: 2,
        borderColor: colores.borderC,
    },

    container_resumen: {
        flex: 2.2,
        flexDirection: 'column',
        backgroundColor: colores.bg,
        borderWidth: 2,
        borderColor: colores.borderC,
    },

    container_btt:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    container_add: {
        flex: 0.6,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    fecha: {
        flex: 1,
        flexDirection: 'row',
    },

    boxFecha: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    general: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        // justifyContent: 'center',
        borderRadius: 15,
    },

    box_title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    box_container: {
        flex: 3,
        padding: 7,
        borderTopWidth: 2,
        borderColor: colores.borderC,
    },

    title: {
        fontSize: 20,
        color: colores.title,
        // fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
    },

    textoGrande: {
        fontSize: 18,
        color: colores.texto,
        marginLeft: 5,
        fontFamily: 'Roboto-Regular',
    },

    texto: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: colores.texto,
    },

    textoFecha: {
        fontSize: 15,
        color: colores.texto,
        fontFamily: 'Roboto-Bold',
        // fontWeight: 'bold',
    },
    
    bttns: {
        flex: 0.4,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colores.borderC,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bttn1: {
        backgroundColor: colores.verde,
    },

    bttn2: {
        backgroundColor: colores.azul,
    },

    bttnMas: {
        backgroundColor: colores.bg,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colores.borderC,
        color: 'white',
        margin: 5,
    },

    centrar: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    box_pastel: {
        flex: 2.5,
    },

    box_grafica: {
        flex: 1,
    },
});