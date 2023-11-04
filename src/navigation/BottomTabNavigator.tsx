import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { IncomeScreen } from '../screens/IncomeScreen';
import { TabBarButton } from '../components/buttons/TabBarButton';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4F33D8',
                tabBarInactiveTintColor: '#000',   
                tabBarShowLabel: false,

                tabBarStyle: {
                    height: 65,
                }
            }}
        >
            <Tab.Screen 
                name='HomeScreen' 
                component={ HomeScreen } 
                options={{ 
                    title: 'Inicio',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='home-outline'
                            label='Inicio'
                        />
                    )
                }}    
            />
            <Tab.Screen 
                name='IncomeScreen' 
                component={ IncomeScreen }
                options={{
                    title: 'Ingresos',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='cash-outline'
                            label='Ingresos'
                        />
                    )
                }} 
            />
        </Tab.Navigator>
    );
}