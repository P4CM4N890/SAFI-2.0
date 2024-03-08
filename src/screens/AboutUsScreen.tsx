
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { BackButton } from '../components';
import { StackScreenProps } from '@react-navigation/stack';
import { useUiStore } from '../hooks';

interface Props extends StackScreenProps<any, any>{};

export const AboutUsScreen = ({ navigation }: Props) => {
    const { changeBarVisibility } = useUiStore();

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
          };
    }, []);

    return (
        <View className='w-full h-full items-center p-5'>
            <View className='w-full items-center right-5'>    
                <BackButton 
                    iconColor='#fff' 
                    iconSize={ 30 } 
                    extraClass='bg-primary'
                    onPress={ () => navigation.goBack() }
                />
            
                <Text className="text-2xl tracking-widest uppercase
                text-black top-7 left-10 font-bold">
                    Acerca de Nosotros
                </Text>
            </View>

            <View >
                <Text className='mt-24 text-center text-lg w-30'>
                    Somos un grupo de estudiantes de la Universidad de Guadalajara que
                    desarrollamos esta aplicación para buscar concientizar a las personas
                    sobre su salud financiera.
                </Text>
            </View>
        </View>
    );
};

