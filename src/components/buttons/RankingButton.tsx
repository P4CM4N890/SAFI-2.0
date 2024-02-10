import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

export const RankingButton = () => {
    const navigation = useNavigation<any>();

    return (
        <View className='items-center bottom-5 left-5'>
            <TouchableOpacity 
                className='bg-amber-400 w-16 h-16 justify-center items-center rounded-full z-10' 
                activeOpacity={ 0.8 }
                onPress={ () => navigation.navigate("LeaderboardScreen") }
            >
                <Icon name='trophy' size={ 40 } color='#FFF'/>
            </TouchableOpacity>
        </View>
    );
}