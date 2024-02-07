import { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack";

import { Button, CategoryDropdown, ColorModal, ErrorMessage, InputLabel } from "../components"
import { iconColor } from "../types/appTypes";
import { useForm, useUiStore } from "../hooks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { LoadingScreen } from "./LoadingScreen";
import { startAddingExpense } from "../store/expenses";
import { GastoCreate } from "../interfaces/ApiInterfaces";

interface Props extends StackScreenProps<any, any> {};

const initialState = {
    cantidad: '',
}

export const AddExpenseScreen = ({ navigation }: Props) => {
    const { changeBarVisibility } = useUiStore();
    const dispatch = useAppDispatch();
    const { isSaving } = useAppSelector( state => state.expense );
    const { uuid } = useAppSelector( state => state.auth );
    const { cantidad, onChange } = useForm(initialState);

    const saving = useMemo( () => isSaving, [isSaving] );

    const [ colorModalVisible, setColorModalVisible ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState<iconColor>('#A233D8');
    const [ error, setError ] = useState("");
    const [ categoria, setCategoria ] = useState("");

    useEffect(() => {
        changeBarVisibility(false);

        return () => {
            changeBarVisibility(true);
          };
    }, []);

    const openColorModal = () => {
        setColorModalVisible(true);
    };
  
    const closeColorModal = () => {
        setColorModalVisible(false);
    };

    const selectColor = (color: iconColor) => {
        setSelectedColor(color);
        closeColorModal();
    };

    const onCreateExpense = () => {
        if(!categoria || !cantidad){
            setError("Debes llenar todos los campos");
            return;
        }
        else if(parseFloat(cantidad) <= 0){
            setError("Ingresa una cantidad válida");
            return;
        }

        const gasto: GastoCreate = {
            id_usuario: uuid as number,
            cantidad: parseFloat(cantidad),
            categoria: categoria.toLowerCase(),
            color: selectedColor,
            fecha: new Date().toISOString(),
        }

        dispatch( startAddingExpense(gasto) );

        navigation.navigate("ExpensesScreen");
    };

    if (saving) return <LoadingScreen />;

    return (
        <KeyboardAvoidingView className='w-full h-full'>
            <ScrollView>
                <View className='w-full h-full items-center'>

                    <Text className='mt-12 text-2xl font-bold text-primary uppercase tracking-widest'>
                        Nuevo Gasto
                    </Text>

                    <InputLabel 
                        label='Cantidad' 
                        placeholder='' 
                        type='numeric'
                        extraClass='mt-16'
                        iconName='cash-outline'
                        value={ cantidad }
                        onChange={ (value) => onChange(value, 'cantidad') }
                    />

                    <Text 
                        className='w-5/6 mt-4 mb-1 font-semibold text-base text-primary'
                    >
                        Categoria
                    </Text>

                    <CategoryDropdown 
                        setCategory={ setCategoria }
                    />

                    <View className='mt-16 w-5/6 flex-row justify-around'>
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

                    <ErrorMessage 
                        message={ error }
                        showMessage={ !!error }
                        extraClass={ 'mt-4'}
                    />

                    <View className='mt-16 w-5/6 flex-row justify-between'>
                        <Button 
                            label='Guardar' 
                            onPress={ onCreateExpense }
                        />
                        <Button 
                            label='Cancelar' 
                            extraClass='bg-rose-600'
                            onPress={ () => navigation.navigate('IncomesScreen') }
                        />
                    </View>

                </View>

                <ColorModal 
                    isModalVisible={ colorModalVisible }
                    selectColor={ selectColor }
                />
                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}