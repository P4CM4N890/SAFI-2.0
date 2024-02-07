import SelectDropdown from "react-native-select-dropdown";
import { useAppSelector } from "../../store/hooks";
import { View } from "react-native";

interface Props {
    defaultValue?: string;
    extraClass?: string;
    setCategory: (value: string) => void;
}

export const CategoryDropdown = ({ defaultValue, extraClass, setCategory }: Props) => {
    const { categorias } = useAppSelector( state => state.other );
    const nombreCategorias = categorias.map((categoria) => categoria.nombre);
    nombreCategorias.forEach( (cat, index) => nombreCategorias[index] = cat.charAt(0).toUpperCase() + cat.slice(1) );

    return (
        <View 
            className={ `flex-row items-center pl-1 bg-white w-5/6 
            text-lg rounded-xl shadow-xl shadow-dark-gray ${extraClass}` }
        >
            <SelectDropdown
                data={ nombreCategorias }
                defaultButtonText="Selecciona una opción"
                onSelect={(selectedItem) => {
                    setCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item) => {
                    return item;
                }}
                buttonStyle={{ 
                    width: '100%', 
                    backgroundColor: 'white', 
                    paddingLeft: 20,
                    flexDirection: 'row',
                }}
                buttonTextStyle={{ width: '100%', textAlign: 'auto', marginRight: 30}}
                defaultValue={ defaultValue }
            />
        </View>
    )
};
