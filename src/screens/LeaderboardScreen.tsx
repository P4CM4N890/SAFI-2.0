import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";

import { BackButton, ScoreCard } from "../components";
import { useAppSelector } from "../store/hooks";

interface Props extends StackScreenProps<any, any> {};

export const LeaderboardScreen = ({ navigation }: Props) => {
    const { users } = useAppSelector( state => state.other );
    const puntajes = users.map( (user) => { return {username: user.nombre, score: user.high_score} } );

    return (
        <View className="w-full h-full items-center p-5">
            <View className='w-full items-center right-5'>    
                <BackButton 
                    iconColor='#fff' 
                    iconSize={ 30 } 
                    extraClass='bg-primary'
                    onPress={ () => navigation.goBack() }
                />
            
                <Text className="text-2xl tracking-widest uppercase
                text-black top-7 left-10 font-bold">
                    Mejores Puntajes
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={ false }
                className='w-full h-64'
            >
                <View className='mt-12 w-full items-center'>
                    {
                        puntajes.map((usuario, index) => {
                            return <ScoreCard 
                                key={ index }
                                place={ index + 1}
                                { ...usuario }
                            />
                        })
                    }
                </View>
            </ScrollView>

        </View>
    )
}
