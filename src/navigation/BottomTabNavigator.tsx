import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { IncomeScreen } from '../screens/IncomeScreen';
import { TabBarButton } from '../components/buttons/TabBarButton';
import { GoalsScreen } from '../screens/GoalsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { AddNotificationScreen } from '../screens/AddNotificationScreen';

import { SettingsStackNavigator } from './SettingsStackNavigator';

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
                    borderTopColor: 'rgba(0, 0, 0, 0.1)',
                    borderTopWidth: 2
                }
            }}
        >
            <Tab.Screen 
                name='HomeScreen' 
                component={ HomeScreen } 
                options={{ 
                    title: 'Home',
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
                    title: 'Incomes',
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
            <Tab.Screen 
                name='GoalsScreen' 
                component={ GoalsScreen }
                options={{
                    title: 'Goals',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='flag-outline'
                            label='Metas'
                        />
                    )
                }} 
            />
            <Tab.Screen 
                name='SettingsStackNavigator' 
                component={ SettingsStackNavigator }
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarButton 
                            iconColor={ color } 
                            iconSize={ size } 
                            isFocused={ focused }
                            iconName='settings-outline'
                            label='Ajustes'
                        />
                    )
                }} 
            />
            <Tab.Screen 
                name='NotificationsScreen' 
                component={ NotificationsScreen }
                options={{
                    tabBarButton: () => null,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
            <Tab.Screen 
                name='AddNotificationScreen' 
                component={ AddNotificationScreen }
                options={{
                    tabBarButton: () => null,
                    tabBarStyle: {
                        display: 'none'
                    }
                }}
            />
        </Tab.Navigator>
    );
}