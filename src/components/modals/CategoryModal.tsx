import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import { categoryIcon, iconColor } from '../../types/appTypes';

interface Props {
    isModalVisible: boolean;
    color: iconColor | string;
    selectCategory: (category: categoryIcon) => void;
}

export const CategoryModal = ({ isModalVisible, color, selectCategory }: Props) => {

    return (
        <Modal 
            isVisible={ isModalVisible }
            animationIn={ 'bounce' }
        >
            <View className='w-full items-center gap-y-3 rounded-2xl py-5'>
        
                <View className='w-1/2 flex-row justify-around'>
                    <View className='items-center'>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => selectCategory('briefcase-outline') }
                            className='rounded-full h-12 w-12 items-center justify-center'
                            style={{ backgroundColor: color }}
                        >
                            <Icon name='briefcase-outline' color='#FFF' size={ 30 }/>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectCategory('gift-outline') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: color }}
                    >
                        <Icon name='gift-outline' color='#FFF' size={ 30 }/>
                    </TouchableOpacity>
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <View className='items-center'>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => selectCategory('game-controller-outline') }
                            className='rounded-full h-12 w-12 items-center justify-center'
                            style={{ backgroundColor: color }}
                        >
                            <Icon name='game-controller-outline' color='#FFF' size={ 30 }/>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectCategory('book-outline') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: color }}
                    >
                        <Icon name='book-outline' color='#FFF' size={ 30 }/>
                    </TouchableOpacity>
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <View className='items-center'>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            onPress={ () => selectCategory('flag-outline') }
                            className='rounded-full h-12 w-12 items-center justify-center'
                            style={{ backgroundColor: color }}
                        >
                            <Icon name='flag-outline' color='#FFF' size={ 30 }/>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectCategory('airplane-outline') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: color }}
                    >
                        <Icon name='airplane-outline' color='#FFF' size={ 30 }/>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}