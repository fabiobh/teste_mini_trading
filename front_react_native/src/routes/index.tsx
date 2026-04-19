import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View className="flex-1 bg-dark justify-center items-center">
                <ActivityIndicator size="large" color="#F3BA2F" />
            </View>
        );
    }

    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
