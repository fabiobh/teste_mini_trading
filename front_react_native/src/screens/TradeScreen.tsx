import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react-native';

const TradeScreen = () => {
    const { user, refreshUser } = useAuth();
    const [mode, setMode] = useState<'buy' | 'sell'>('buy');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState<number | null>(null);

    const loadPrice = async () => {
        try {
            const response = await api.get('/market/btc');
            setPrice(response.data.price);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadPrice();
    }, []);

    const handleTrade = async () => {
        const numAmount = parseFloat(amount.replace(',', '.'));
        if (!amount || isNaN(numAmount) || numAmount <= 0) {
            Alert.alert('Erro', 'Insira um valor válido');
            return;
        }

        try {
            setLoading(true);
            if (mode === 'buy') {
                await api.post('/trade/buy', { amount_brl: numAmount });
                Alert.alert('Sucesso', 'Você comprou BTC com sucesso!');
            } else {
                await api.post('/trade/sell', { amount_btc: numAmount });
                Alert.alert('Sucesso', 'Você vendeu seu BTC com sucesso!');
            }
            setAmount('');
            await refreshUser();
            await loadPrice();
        } catch (error: any) {
            Alert.alert('Erro na operação', error.response?.data?.message || 'Erro ao processar trade');
        } finally {
            setLoading(false);
        }
    };

    const formatBRL = (val: number) => {
        return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const calculatedEstimate = () => {
        const numAmount = parseFloat(amount.replace(',', '.'));
        if (!numAmount || !price) return mode === 'buy' ? '0.00000000' : 'R$ 0,00';
        
        if (mode === 'buy') {
            return (numAmount / price).toFixed(8);
        } else {
            return formatBRL(numAmount * price);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6 pt-6">
                <Text className="text-white text-3xl font-extrabold tracking-tight mb-6">Negociar</Text>

                <View className="flex-row bg-dark-secondary p-1.5 rounded-2xl mb-8 border border-white/5">
                    <TouchableOpacity 
                        onPress={() => setMode('buy')}
                        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl ${mode === 'buy' ? 'bg-success' : ''}`}
                    >
                        <ArrowDownLeft size={18} color={mode === 'buy' ? '#ffffff' : '#10B981'} strokeWidth={2.5} />
                        <Text className={`font-bold ml-2 tracking-wide ${mode === 'buy' ? 'text-white' : 'text-gray-text'}`}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setMode('sell')}
                        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl ${mode === 'sell' ? 'bg-danger' : ''}`}
                    >
                        <ArrowUpRight size={18} color={mode === 'sell' ? '#ffffff' : '#EF4444'} strokeWidth={2.5} />
                        <Text className={`font-bold ml-2 tracking-wide ${mode === 'sell' ? 'text-white' : 'text-gray-text'}`}>Vender</Text>
                    </TouchableOpacity>
                </View>

                <View className="items-center mb-8 bg-dark-secondary/30 p-4 rounded-3xl border border-white/5">
                    <Text className="text-gray-text text-sm font-medium mb-1">Cotação Atual (BTC)</Text>
                    <View className="flex-row items-center">
                        <TrendingUp size={20} color="#3B82F6" />
                        <Text className="text-white text-3xl font-bold tracking-tight ml-2">
                            {price ? formatBRL(price) : '---'}
                        </Text>
                    </View>
                </View>

                <View className="bg-dark-secondary/60 p-6 rounded-3xl border border-white/5">
                    <Text className="text-gray-text mb-4 font-medium">
                        {mode === 'buy' ? 'Quanto deseja investir (R$)?' : 'Quanto deseja vender (BTC)?'}
                    </Text>
                    
                    <View className="flex-row items-center border-b border-gray-700/50 pb-2 mb-6">
                        <Text className="text-white text-3xl font-bold mr-2">{mode === 'buy' ? 'R$' : '₿'}</Text>
                        <TextInput 
                            className="flex-1 text-white text-4xl font-bold"
                            placeholder="0,00"
                            placeholderTextColor="#475569"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>
                    
                    <View>
                        <Text className="text-gray-text text-sm mb-1">Você deve receber aproximadamente:</Text>
                        <Text className={`text-2xl font-bold tracking-tight ${mode === 'buy' ? 'text-success' : 'text-primary-light'}`}>
                            {calculatedEstimate()} {mode === 'buy' ? 'BTC' : ''}
                        </Text>
                    </View>
                </View>

                <View className="mt-auto mb-24">
                    <View className="flex-row justify-between mb-4 px-2">
                        <Text className="text-gray-text font-medium">Saldo Disponível:</Text>
                        <Text className="text-white font-bold">
                            {mode === 'buy' ? 
                                formatBRL(user?.balance_brl || 0) :
                                (user?.balance_btc || 0).toFixed(8) + ' BTC'
                            }
                        </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={handleTrade}
                        disabled={loading}
                        className={`py-5 rounded-2xl items-center shadow-lg ${mode === 'buy' ? 'bg-success' : 'bg-danger'}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text className="text-white font-bold text-lg tracking-wide uppercase">
                                Confirmar {mode === 'buy' ? 'Compra' : 'Venda'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default TradeScreen;
