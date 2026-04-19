import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, RefreshControl, StatusBar } from 'react-native';
import api from '../services/api';
import { History, ArrowDownLeft, ArrowUpRight, CalendarClock } from 'lucide-react-native';

interface Transaction {
    id: number;
    type: 'buy' | 'sell';
    amount_btc: number;
    price_at_moment: number;
    total_brl: number;
    created_at: string;
}

const HistoryScreen = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadTransactions = async () => {
        try {
            const response = await api.get('/transactions');
            setTransactions(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTransactions();
        setRefreshing(false);
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const renderItem = ({ item }: { item: Transaction }) => (
        <View className="bg-dark-secondary/60 p-4 rounded-3xl mb-4 border border-white/5 flex-row items-center">
            <View className={`p-4 rounded-full ${item.type === 'buy' ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'}`}>
                {item.type === 'buy' ? 
                    <ArrowDownLeft size={24} color="#10B981" strokeWidth={2.5} /> : 
                    <ArrowUpRight size={24} color="#EF4444" strokeWidth={2.5} />
                }
            </View>
            
            <View className="ml-4 flex-1">
                <Text className="text-white font-bold text-base mb-1 tracking-wide">
                    {item.type === 'buy' ? 'Compra de Bitcoin' : 'Venda de Bitcoin'}
                </Text>
                <View className="flex-row items-center">
                    <CalendarClock size={12} color="#64748B" />
                    <Text className="text-gray-text text-xs ml-1 font-medium">{formatDate(item.created_at)}</Text>
                </View>
            </View>

            <View className="items-end">
                <Text className={`font-bold text-base mb-1 ${item.type === 'buy' ? 'text-success' : 'text-danger'}`}>
                    {item.type === 'buy' ? '-' : '+'}{formatCurrency(item.total_brl)}
                </Text>
                <Text className="text-white/80 text-sm font-medium">{item.amount_btc.toFixed(8)} BTC</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <View className="flex-1 px-6 pt-6">
                <View className="flex-row items-center mb-8">
                    <History size={32} color="#3B82F6" strokeWidth={2.5} />
                    <Text className="text-white text-3xl font-extrabold tracking-tight ml-3">Histórico</Text>
                </View>

                <FlatList 
                    data={transactions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3B82F6" colors={['#3B82F6']} />
                    }
                    ListEmptyComponent={
                        <View className="items-center mt-20 p-8 bg-dark-secondary/30 rounded-3xl border border-white/5">
                            <History size={48} color="#475569" strokeWidth={1} className="mb-4" />
                            <Text className="text-gray-text text-lg font-medium text-center">
                                Você ainda não realizou nenhuma transação.
                            </Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default HistoryScreen;
