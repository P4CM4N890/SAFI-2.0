import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

import { IncomesScreen } from '../screens/IncomesScreen';
import { ExpensesScreen } from '../screens/ExpensesScreen';

const TopTab = createMaterialTopTabNavigator();

export const WalletTopTabNavigator = () => {
    const { top } = useSafeAreaInsets();

    return (
        <TopTab.Navigator
            style={{
                padding: top,
            }}
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}
            
            screenOptions={({ route }) => ({
                tabBarPressColor: '#bfbfbf',
                // Esta opcion debe estar en true si queremos mostrar iconos.
                tabBarShowIcon: true,
                tabBarIndicatorStyle: {
                    backgroundColor: '#4F33D8',
                },
                tabBarStyle: {
                    borderTopColor: '#4F33D8',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarIcon: ({ color }) => {
                    let iconName: string = '';

                    switch( route.name ) {
                        case 'IncomesScreen':
                            iconName = "arrow-up-circle-outline";
                            break;
                        case 'ExpensesScreen':
                            iconName = "arrow-down-circle-outline";
                            break;
                    }
                    
                    return <Icon name={ iconName } size={ 20 } color={ '#4F33D8' } />
                    
                },
            })}
        >
            <TopTab.Screen name='IncomesScreen' options={{ title: 'Ingresos' }} component={ IncomesScreen } />
            <TopTab.Screen name='ExpensesScreen' options={{ title: 'Gastos' }} component={ ExpensesScreen } />
        </TopTab.Navigator>
    );
};

