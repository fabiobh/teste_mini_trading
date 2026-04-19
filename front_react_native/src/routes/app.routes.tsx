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
                backgroundColor: '#0F172A',
                borderTopColor: '#1E293B',
                height: 70,
                paddingBottom: 12,
                paddingTop: 8,
                borderTopWidth: 1,
                elevation: 0,
            },
            tabBarActiveTintColor: '#3B82F6',
            tabBarInactiveTintColor: '#64748B',
            tabBarLabelStyle: {
                fontWeight: '600',
                fontSize: 11,
            }
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={DashboardScreen} 
            options={{
                tabBarIcon: ({ color, size }) => <Home size={22} color={color} strokeWidth={2.5} />,
                tabBarLabel: 'Início'
            }}
        />
        <Tab.Screen 
            name="Trade" 
            component={TradeScreen} 
            options={{
                tabBarIcon: ({ color, size }) => <Repeat size={22} color={color} strokeWidth={2.5} />,
                tabBarLabel: 'Trade'
            }}
        />
        <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{
                tabBarIcon: ({ color, size }) => <Clock size={22} color={color} strokeWidth={2.5} />,
                tabBarLabel: 'Histórico'
            }}
        />
    </Tab.Navigator>
);

export default AppRoutes;
