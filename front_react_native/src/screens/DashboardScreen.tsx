import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { Wallet, TrendingUp, LogOut, RefreshCw, ChevronRight, Activity } from 'lucide-react-native';

const DashboardScreen = () => {
    const { user, refreshUser, signOut } = useAuth();
    const navigation = useNavigation<any>();
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

    const handleDeposit = () => {
        Alert.alert('Funcionalidade em desenvolvimento', 'A integração com gateway de pagamento estará disponível em breve!');
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
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <ScrollView 
                className="flex-1 px-6 pt-6"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3B82F6" colors={['#3B82F6']} />
                }
            >
                <View className="flex-row justify-between items-center mb-8">
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center border border-primary/30 mr-3">
                            <Text className="text-primary font-bold text-xl">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
                        </View>
                        <View>
                            <Text className="text-gray-text text-sm">Bem-vindo de volta,</Text>
                            <Text className="text-white text-xl font-bold tracking-tight">{user?.name || 'Cliente'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={signOut} className="p-3 bg-dark-secondary/80 rounded-full border border-white/5">
                        <LogOut size={22} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                <View className="bg-primary p-6 rounded-3xl mb-6 shadow-xl shadow-primary/40 relative overflow-hidden">
                    <View className="absolute -right-6 -top-6 bg-white/10 w-32 h-32 rounded-full blur-2xl" />
                    <View className="absolute -left-6 -bottom-6 bg-black/10 w-32 h-32 rounded-full blur-xl" />
                    <View className="flex-row items-center mb-4 opacity-90">
                        <Wallet size={20} color="#ffffff" />
                        <Text className="text-white ml-2 font-medium tracking-wide">Patrimônio Total</Text>
                    </View>
                    <Text className="text-white text-4xl font-extrabold tracking-tight mb-2">
                        {formatCurrency(user?.balance_brl || 0)}
                    </Text>
                    <View className="flex-row items-center bg-black/20 self-start px-3 py-1.5 rounded-full">
                        <Activity size={14} color="#10B981" />
                        <Text className="text-white font-medium ml-1.5 text-sm">
                            {user?.balance_btc ? user.balance_btc.toFixed(8) : '0.00000000'} BTC
                        </Text>
                    </View>
                </View>

                <View className="bg-dark-secondary/60 p-6 rounded-3xl border border-white/5 mb-8">
                    <View className="flex-row justify-between items-center mb-5">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-success/20 items-center justify-center mr-2">
                                <TrendingUp size={16} color="#10B981" strokeWidth={3} />
                            </View>
                            <Text className="text-gray-text font-medium">Mercado BTC/BRL</Text>
                        </View>
                        <TouchableOpacity onPress={loadMarketPrice} activeOpacity={0.7} className="p-2">
                            <RefreshCw size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-end justify-between">
                        <View>
                            <Text className="text-white text-3xl font-bold tracking-tight">
                                {marketPrice ? formatCurrency(marketPrice) : '---'}
                            </Text>
                            <Text className="text-success text-sm font-medium mt-1">+2.45% 24h</Text>
                        </View>
                        <View className="h-10 w-16 opacity-50" />
                    </View>
                </View>

                <View className="mb-10">
                    <View className="flex-row justify-between items-baseline mb-4">
                        <Text className="text-white text-xl font-bold tracking-tight">Ações Rápidas</Text>
                    </View>
                    <View className="flex-row">
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('History')}
                            className="flex-1 bg-dark-secondary/50 p-5 rounded-3xl items-center border border-white/5 flex-row justify-center mr-2"
                        >
                            <Activity size={20} color="#3B82F6" />
                            <Text className="text-white font-semibold ml-2">Histórico</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Trade')}
                            className="flex-1 bg-dark-secondary/50 p-5 rounded-3xl items-center border border-white/5 flex-row justify-center ml-2"
                        >
                            <TrendingUp size={20} color="#10B981" />
                            <Text className="text-white font-semibold ml-2">Negociar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
