import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Wallet, TrendingUp, LogOut, RefreshCw } from 'lucide-react-native';

const DashboardScreen = () => {
    const { user, refreshUser, signOut } = useAuth();
    const [marketPrice, setMarketPrice] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadMarketPrice = async () => {
        try {
            const response = await api.get('/market/btc');
            setMarketPrice(response.data.price);
        } catch (error) {
            console.error('Market error', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([refreshUser(), loadMarketPrice()]);
        setRefreshing(false);
    };

    useEffect(() => {
        loadMarketPrice();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <ScrollView 
                className="flex-1 px-6 pt-4"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F3BA2F" />
                }
            >
                <View className="flex-row justify-between items-center mb-8">
                    <View>
                        <Text className="text-gray-text text-lg">Olá,</Text>
                        <Text className="text-white text-2xl font-bold">{user?.name}</Text>
                    </View>
                    <TouchableOpacity onPress={signOut} className="p-2 bg-dark-secondary rounded-full">
                        <LogOut size={24} color="#F6465D" />
                    </TouchableOpacity>
                </View>

                {/* Wallet Balance Card */}
                <View className="bg-dark-secondary p-6 rounded-3xl border border-gray-800 mb-6">
                    <View className="flex-row items-center mb-4">
                        <Wallet size={20} color="#F3BA2F" />
                        <Text className="text-gray-text ml-2 font-medium">Patrimônio Total</Text>
                    </View>
                    <Text className="text-white text-3xl font-bold mb-1">
                        {formatCurrency(user?.balance_brl || 0)}
                    </Text>
                    <View className="flex-row items-center">
                        <Text className="text-success font-medium">
                            {user?.balance_btc.toFixed(8)} BTC
                        </Text>
                    </View>
                </View>

                {/* Market Price Card */}
                <View className="bg-dark-secondary p-6 rounded-3xl border border-gray-800 shadow-xl shadow-black">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center">
                            <TrendingUp size={20} color="#0ECB81" />
                            <Text className="text-gray-text ml-2 font-medium">Mercado BTC/BRL</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={loadMarketPrice}
                            activeOpacity={0.7}
                            className="bg-gray-800/30 p-2 rounded-full"
                        >
                            <RefreshCw size={16} color="#848E9C" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-white text-3xl font-bold">
                        {marketPrice ? formatCurrency(marketPrice) : '---'}
                    </Text>
                    <Text className="text-gray-text mt-1 text-xs">Cotação atualizada em tempo real</Text>
                </View>

                <View className="mt-10">
                    <Text className="text-white text-xl font-bold mb-4">Ações Rápidas</Text>
                    <View className="flex-row space-x-4">
                        <View className="flex-1 bg-dark-secondary p-4 rounded-2xl items-center border border-gray-800">
                            <Text className="text-primary font-bold">Análise</Text>
                        </View>
                        <View className="flex-1 bg-dark-secondary p-4 rounded-2xl items-center border border-gray-800">
                            <Text className="text-primary font-bold">Depósito</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
