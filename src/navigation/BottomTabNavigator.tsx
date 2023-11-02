import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { IncomeScreen } from '../screens/IncomeScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name='HomeScreen' options={{ title: 'Inicio' }}  component={ HomeScreen } />
            <Tab.Screen name='IncomeScreen' options={{ title: 'Ingresos' }} component={ IncomeScreen } />
        </Tab.Navigator>
    );
}