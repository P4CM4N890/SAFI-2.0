import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import { incomeCategoryIcon } from '../../types/incomeTypes';

interface Props {
    categoryModalVisible: boolean;
    selectCategory: (category: incomeCategoryIcon) => void;
}

export const IncomeCategoryModal = ({ categoryModalVisible, selectCategory }: Props) => {

    return (
        <Modal 
            isVisible={ categoryModalVisible }
            animationIn={ 'bounce' }
        >
            <View className='w-full items-center gap-y-3 rounded-2xl py-5'>
        
                <View className='w-1/2 flex-row justify-around'>
                    <View className='items-center '>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => selectCategory('home-outline') }
                            className='bg-purple-600 rounded-full h-12 w-12 items-center justify-center'
                        >
                            <Icon name='home-outline' color='#FFF' size={ 30 }/>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectCategory('gift-outline') }
                        className='bg-purple-600 rounded-full h-12 w-12 items-center justify-center'
                    >
                        <Icon name='gift-outline' color='#FFF' size={ 30 }/>
                    </TouchableOpacity>
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <View className='items-center '>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => selectCategory('game-controller-outline') }
                            className='bg-purple-600 rounded-full h-12 w-12 items-center justify-center'
                        >
                            <Icon name='game-controller-outline' color='#FFF' size={ 30 }/>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectCategory('book-outline') }
                        className='bg-purple-600 rounded-full h-12 w-12 items-center justify-center'
                    >
                        <Icon name='book-outline' color='#FFF' size={ 30 }/>
                    </TouchableOpacity>
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <View className='items-center '>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => selectCategory('flag-outline') }
                            className='bg-purple-600 rounded-full h-12 w-12 items-center justify-center'
                        >
                            <Icon name='flag-outline' color='#FFF' size={ 30 }/>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectCategory('airplane-outline') }
                        className='bg-purple-600 rounded-full h-12 w-12 items-center justify-center'
                    >
                        <Icon name='airplane-outline' color='#FFF' size={ 30 }/>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}