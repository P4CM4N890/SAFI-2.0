import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Modal from 'react-native-modal';

import { incomeInconColor } from '../../types/incomeTypes';

interface Props {
    isModalVisible: boolean;
    selectColor: (category: incomeInconColor) => void;
}

export const IncomeColorModal = ({ isModalVisible, selectColor }: Props) => {

    return (
        <Modal 
            isVisible={ isModalVisible }
            animationIn={ 'bounce' }
        >
            <View className='w-full items-center gap-y-3 rounded-2xl py-5'>
        
                <View className='w-1/2 flex-row justify-around'>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#54D8AD') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#54D8AD' }}
                    />
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#D8336A') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#D8336A' }}
                    />

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#75E2F8') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#75E2F8' }}
                    />
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#4F33D8') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#4F33D8' }}
                    />

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#0C0C0C') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#0C0C0C' }}
                    />

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#E67E22') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#E67E22' }}
                    />
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#6D6D6D') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#6D6D6D' }}
                    />
                    
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#F1C40F') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#F1C40F' }}
                    />

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#F48FB1') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#F48FB1' }}
                    />
                </View>

                <View className='w-1/2 flex-row justify-around'>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => selectColor('#A233D8') }
                        className='rounded-full h-12 w-12 items-center justify-center'
                        style={{ backgroundColor: '#A233D8' }}
                    />
                </View>

            </View>
        </Modal>
    );
}