import React, {  useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { InputLabel } from '../components/inputs/InputLabel';
import { Button } from '../components/buttons/Button';
import { IncomeCategoryModal } from '../components/modals/IncomeCategoryModal';

import { incomeCategoryIcon, incomeInconColor } from '../types/incomeTypes';
import { IncomeColorModal } from '../components/modals/IncomeColorModal';

interface Props extends StackScreenProps<any, any> {};

export const AddIncomeScreen = ({ navigation }: Props) => {

    const [ categoryModalVisible, setCategoryModalVisible ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState<incomeCategoryIcon>('flag-outline');

    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<incomeInconColor>('#A233D8');

    const openCategoryModal = () => {
        setCategoryModalVisible(true);
    };
  
    const closeCategoryModal = () => {
        setCategoryModalVisible(false);
    };

    const selectCategory = (category: incomeCategoryIcon) => {
        setSelectedCategory(category);
        closeCategoryModal();
    };

    const openColorModal = () => {
        setColorModalVisible(true);
    };
  
    const closeColorModal = () => {
        setColorModalVisible(false);
    };

    const selectColor = (color: incomeInconColor) => {
        setSelectedColor(color);
        closeColorModal();
    };

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text className='mt-12 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nuevo Ingreso
                    </Text>

                    <InputLabel 
                        label='Nombrel del ingreso' 
                        placeholder='' 
                        type='text'
                        extraClass='mt-16'
                    />

                    <InputLabel 
                        label='Cantidad' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-4'
                        iconName='cash-outline'
                    />

                    <View className='mt-16 w-5/6 flex-row justify-around'>

                        <View className='items-center'>
                            <Text className='mb-2 text-primary text-sm'>Categoria</Text>

                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                onPress={ openCategoryModal }
                                className='rounded-full h-12 w-12 items-center justify-center'
                                style={{ backgroundColor: selectedColor }}
                            >
                                <Icon name={ selectedCategory } color='#FFF' size={ 30 }/>
                            </TouchableOpacity>
                        </View>
                        
                        <View className='items-center'>
                            <Text className='mb-2 text-primary text-sm'>Color</Text>

                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                onPress={ openColorModal }
                                className='rounded-full h-12 w-12 items-center justify-center'
                                style={{ backgroundColor: selectedColor }}
                            />
                        </View>

                    </View>

                    <View className='mt-16 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Guardar' 
                            onPress={ () => {} }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('IncomesScreen') }
                        />
                    </View>

                </View>

                <IncomeCategoryModal 
                    isModalVisible={ categoryModalVisible } 
                    selectCategory={ selectCategory }
                    color={ selectedColor }
                />

                <IncomeColorModal 
                    isModalVisible={ colorModalVisible }
                    selectColor={ selectColor }
                />
                
            </ScrollView>
        </KeyboardAvoidingView>
    );
}