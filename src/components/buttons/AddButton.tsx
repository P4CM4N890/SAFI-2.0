import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

export const AddButton = () => {
    const navigation = useNavigation<any>();

    const [ isModalVisible, setModalVisible ] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View className='items-center absolute bottom-5'>
            {     
                isModalVisible && (
                    <View className='bg-white z-10'>
                        <TouchableOpacity 
                            className='w-14 h-14 mb-3 justify-center items-center bg-white rounded-full border-primary border-2'
                            activeOpacity={ 0.6 }
                            onPress={ () => {
                                navigation.navigate("IncomesStackNavigator", 
                                { screen: 'AddIncomeScreen' })

                                toggleModal()
                            }}
                        >
                            <Icon name='cash-outline' size={ 28 } color='#4F33D8'/>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className='w-14 h-14 mb-3 justify-center items-center bg-white rounded-full border-primary border-2'
                            activeOpacity={ 0.6 }
                            onPress={ () => {
                                navigation.navigate("GoalsStackNavigator", 
                                { screen: 'AddGoalScreen' })

                                toggleModal()
                            } }
                        >
                            <Icon name='flag-outline' size={ 28 } color='#4F33D8'/>
                        </TouchableOpacity>
                    </View>
                )
            }

            <TouchableOpacity 
                className='bg-primary w-16 h-16 justify-center items-center rounded-full z-10' 
                activeOpacity={ 0.8 }
                onPress={ toggleModal }
            >
                <Icon name='add-outline' size={ 40 } color='#FFF'/>
            </TouchableOpacity>
        </View>
    );
}