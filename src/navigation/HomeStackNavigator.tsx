import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { NotificationsStackNavigator } from './NotificationsStackNavigator';

const HomeStack = createStackNavigator()

export const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStack.Screen name='HomeScreen' options={{ title: 'HomeScreen' }} component={ HomeScreen } />
            <HomeStack.Screen name='NotificationsStackNavigator' options={{ title: 'NotificationsStackNavigator' }} component={ NotificationsStackNavigator }/>
        </HomeStack.Navigator>
    );
};

