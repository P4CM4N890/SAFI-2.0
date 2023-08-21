import React, { useCallback, useState } from 'react'
import { View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../theme/appTheme';
import { AbonarMetaCards } from '../../components/AbonarMetaCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetaAhorroResponseModel, PerfilNinoResponseModel } from '../../interfaces/ApiInterfaces';
import { obtenerPerfil, obtenerMetas } from '../../api/GetRequests';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderScreens } from '../../components/HeaderScreens';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {};

export const AbonarMeta = ({ navigation }: Props) => {
    const [metas, setMetas] = useState<MetaAhorroResponseModel[]>([]);
    const [ refresh, setRefresh ] = useState(false);

    // const navigation = useNavigation();

    const verMetas = async () => {
        try{
            const perfil = await AsyncStorage.getItem("perfil_actual_id");

            if(perfil){
                const idPerfil: PerfilNinoResponseModel = (await obtenerPerfil(perfil)).data;

                const arrayMetas: MetaAhorroResponseModel[] = (await obtenerMetas()).data;

                const filtroArrayMetas = arrayMetas.filter((profile) =>
                profile.id_perfil.id_perfil === idPerfil.id_perfil);

                setMetas(filtroArrayMetas);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    const handleRefreshData = () => {
        setRefresh(!refresh);
    };

    // Ejecuta la función al cargar la ventana
    useFocusEffect(
        useCallback(() => {
            verMetas();
          },
          [refresh],
        )
        
    );

    return (
        <LinearGradient style={ styles.container }
        colors={[
                'rgba(0, 58, 16, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
            ]}
            start={{x : 1, y : 0}}
            end={{x : 0, y: 1}}
            locations={[0, 0.4, 1]}
        >
            <View style = { styles.header_column }>
                <View style={ styles.boxHeader1_column }>
                    <View style={ styles.photo }>
                        <HeaderScreens title='Elige una meta' />
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <ScrollView>
                    {
                        metas.map((item) => 
                            <AbonarMetaCards
                                key={item.id_meta}
                                title={item.nombre}
                                start={item.fecha_inicio}
                                finish={item.fecha_final}
                                resumen={item.dinero_actual}
                                total={item.objetivo}
                                onTouch={() => { navigation.navigate("PutMeta", { 
                                    id: item.id_meta,
                                    nombre: item.nombre,
                                    fecha: item.fecha_final,
                                    dinero: item.dinero_actual,
                                    objetivo: item.objetivo
                            });
                                handleRefreshData() } }
                            />
                        )
                    }
                </ScrollView>
            </View>
        </LinearGradient>
    );
};