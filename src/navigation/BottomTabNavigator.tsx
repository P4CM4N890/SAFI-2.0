import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';
import { TabBarButton } from '../components/buttons/TabBarButton';

import { SettingsStackNavigator } from './SettingsStackNavigator';
import { NotificationsStackNavigator } from './NotificationsStackNavigator';
import { IncomesStackNavigator } from './IncomesStackNavigator';
import { GoalsStackNavigator } from './GoalsStackNavigator';

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
                name='IncomesStackNavigator' 
                component={ IncomesStackNavigator }
                options={{
                    title: 'IncomesStackNavigator',
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
                name='GoalsStackNavigator' 
                component={ GoalsStackNavigator }
                options={{
                    title: 'GoalsStackNavigator',
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
                    title: 'SettingsStackNavigator',
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
                name='NotificationsStackNavigator' 
                component={ NotificationsStackNavigator }
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