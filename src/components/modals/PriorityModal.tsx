import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Modal from 'react-native-modal';

import { priority, priorityColor } from '../../types/appTypes';

interface Props {
    isModalVisible: boolean;
    selectPriority: (priority: priority, color: priorityColor) => void;
}

export const PriorityModal = ({ isModalVisible, selectPriority }: Props) => {
    return (
        <Modal 
            isVisible={ isModalVisible }
            animationIn='bounce'
        >
            <View className='w-full items-center gap-y-3 rounded-2xl py-5'>

                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ () => selectPriority('Alta', '#D8336A') }
                    className='rounded-full h-10 w-20 items-center justify-center'
                    style={{ backgroundColor: '#D8336A' }}
                >
                    <Text className='text-base uppercase font-semibold text-white'>Alta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ () => selectPriority('Media', '#FFE500') }
                    className='rounded-full h-10 w-20 items-center justify-center'
                    style={{ backgroundColor: '#FFE500' }}
                >
                    <Text className='text-base uppercase font-semibold text-black'>Media</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ () => selectPriority('Baja', '#60D833') }
                    className='rounded-full h-10 w-20 items-center justify-center'
                    style={{ backgroundColor: '#60D833' }}
                >
                    <Text className='text-base uppercase font-semibold text-white'>Baja</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
}