import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import api from '../services/api';
import { History, ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';

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
        return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const renderItem = ({ item }: { item: Transaction }) => (
        <View className="bg-dark-secondary p-4 rounded-2xl mb-4 border border-gray-800 flex-row items-center">
            <View className={`p-3 rounded-full ${item.type === 'buy' ? 'bg-success/20' : 'bg-danger/20'}`}>
                {item.type === 'buy' ? 
                    <ArrowDownLeft size={24} color="#0ECB81" /> : 
                    <ArrowUpRight size={24} color="#F6465D" />
                }
            </View>
            
            <View className="ml-4 flex-1">
                <Text className="text-white font-bold text-lg">
                    {item.type === 'buy' ? 'Compra de BTC' : 'Venda de BTC'}
                </Text>
                <Text className="text-gray-text text-xs">{formatDate(item.created_at)}</Text>
            </View>

            <View className="items-end">
                <Text className={`font-bold ${item.type === 'buy' ? 'text-success' : 'text-danger'}`}>
                    {item.type === 'buy' ? '-' : '+'}{formatCurrency(item.total_brl)}
                </Text>
                <Text className="text-white text-xs">{item.amount_btc.toFixed(8)} BTC</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <View className="flex-1 px-6 pt-4">
                <View className="flex-row items-center mb-8">
                    <History size={28} color="#F3BA2F" />
                    <Text className="text-white text-3xl font-bold ml-3">Histórico</Text>
                </View>

                <FlatList 
                    data={transactions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F3BA2F" />
                    }
                    ListEmptyComponent={
                        <View className="items-center mt-20">
                            <Text className="text-gray-text text-lg">Nenhuma transação encontrada</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default HistoryScreen;
