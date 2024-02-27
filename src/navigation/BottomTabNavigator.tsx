import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens/HomeScreen';

import { SettingsStackNavigator } from './SettingsStackNavigator';
import { IncomesStackNavigator } from './IncomesStackNavigator';
import { GoalsStackNavigator } from './GoalsStackNavigator';

import { AddButton } from '../components/buttons/AddButton';
import { AddGoalButton } from '../components/buttons/AddGoalButton';
import { AddIncomeButton } from '../components/buttons/AddIncomeButton';
import { TabBarButton } from '../components/buttons/TabBarButton';

import { useUiStore } from '../hooks';
import { AddExpenseButton } from '../components';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    const { activeComponent, isBottomTabShown } = useUiStore();

    return (
        <Tab.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#4F33D8',
                tabBarInactiveTintColor: '#000',   
                tabBarShowLabel: false,

                tabBarStyle: {
                    height: 65,
                    borderTopColor: 'rgba(0, 0, 0, 0.1)',
                    borderTopWidth: 2,
                    display: isBottomTabShown ? 'flex' : 'none'
                }
            }}
        >
            <Tab.Screen 
                name='HomeScreen' 
                component={ HomeScreen } 
                options={{ 
                    title: 'HomeScreen',
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
                            iconName='wallet-outline'
                            label='Cartera'
                        />
                    )
                }} 
            />

            {
                (activeComponent === 'HomeScreen' || activeComponent === 'SettingsStackNavigator') && (
                    <Tab.Screen 
                        name='AddButton' 
                        component={ AddButton }
                        options={{
                            tabBarIcon: () => (
                                <AddButton />
                            )
                        }} 
                    />
                )
            }

            {
                activeComponent === 'GoalsStackNavigator' && (
                    <Tab.Screen 
                        name='AddGoalButton' 
                        component={ AddGoalButton }
                        options={{
                            tabBarIcon: () => (
                                <AddGoalButton />
                            )
                        }} 
                    />
                )
            }

            {
                activeComponent === 'IncomesScreen' && (
                    <Tab.Screen 
                        name='AddIncomeButton' 
                        component={ AddIncomeButton }
                        options={{
                            tabBarIcon: () => (
                                <AddIncomeButton />
                            )
                        }} 
                    />
                )
            }
            
            {
                activeComponent === 'ExpensesScreen' && (
                    <Tab.Screen 
                        name='AddExpenseButton' 
                        component={ AddExpenseButton }
                        options={{
                            tabBarIcon: () => (
                                <AddExpenseButton />
                            )
                        }} 
                    />
                )
            }

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

        </Tab.Navigator>
    );
}