import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import TradeScreen from '../screens/TradeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { Home, Repeat, Clock } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#1E2329',
                borderTopColor: '#2B3139',
                height: 60,
                paddingBottom: 10,
                paddingTop: 5,
            },
            tabBarActiveTintColor: '#F3BA2F',
            tabBarInactiveTintColor: '#848E9C',
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={DashboardScreen} 
            options={{
                tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                tabBarLabel: 'Início'
            }}
        />
        <Tab.Screen 
            name="Trade" 
            component={TradeScreen} 
            options={{
                tabBarIcon: ({ color, size }) => <Repeat size={size} color={color} />,
                tabBarLabel: 'Trade'
            }}
        />
        <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{
                tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
                tabBarLabel: 'Histórico'
            }}
        />
    </Tab.Navigator>
);

export default AppRoutes;
