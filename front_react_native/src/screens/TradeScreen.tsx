import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

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
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            Alert.alert('Erro', 'Insira um valor válido');
            return;
        }

        try {
            setLoading(true);
            if (mode === 'buy') {
                await api.post('/trade/buy', { amount_brl: Number(amount) });
                Alert.alert('Sucesso', `Você comprou BTC com sucesso!`);
            } else {
                await api.post('/trade/sell', { amount_btc: Number(amount) });
                Alert.alert('Sucesso', `Você vendeu seu BTC com sucesso!`);
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

    const calculatedEstimate = () => {
        if (!amount || !price) return '0.00000000';
        if (mode === 'buy') {
            return (Number(amount) / price).toFixed(8);
        } else {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(amount) * price);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6 pt-4">
                <Text className="text-white text-3xl font-bold mb-8">Negociar</Text>

                {/* Tabs */}
                <View className="flex-row bg-dark-secondary p-1 rounded-2xl mb-8">
                    <TouchableOpacity 
                        onPress={() => setMode('buy')}
                        className={`flex-1 flex-row items-center justify-center p-4 rounded-xl ${mode === 'buy' ? 'bg-success' : ''}`}
                    >
                        <ArrowDownLeft size={20} color={mode === 'buy' ? '#0B0E11' : '#0ECB81'} />
                        <Text className={`font-bold ml-2 ${mode === 'buy' ? 'text-dark' : 'text-success'}`}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setMode('sell')}
                        className={`flex-1 flex-row items-center justify-center p-4 rounded-xl ${mode === 'sell' ? 'bg-danger' : ''}`}
                    >
                        <ArrowUpRight size={20} color={mode === 'sell' ? '#0B0E11' : '#F6465D'} />
                        <Text className={`font-bold ml-2 ${mode === 'sell' ? 'text-dark' : 'text-danger'}`}>Vender</Text>
                    </TouchableOpacity>
                </View>

                {/* Price Info */}
                <View className="items-center mb-8">
                    <Text className="text-gray-text text-lg">Preço atual do BTC</Text>
                    <Text className="text-white text-2xl font-bold">
                        {price ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price) : '---'}
                    </Text>
                </View>

                {/* Input Section */}
                <View className="bg-dark-secondary p-6 rounded-3xl border border-gray-800">
                    <Text className="text-gray-text mb-4">
                        {mode === 'buy' ? 'Quanto deseja investir (R$)?' : 'Quanto deseja vender (BTC)?'}
                    </Text>
                    <TextInput 
                        className="text-white text-4xl font-bold mb-6"
                        placeholder="0.00"
                        placeholderTextColor="#4A4A4A"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    
                    <View className="border-t border-gray-800 pt-6">
                        <Text className="text-gray-text text-sm">Estimativa de recebimento:</Text>
                        <Text className={`text-xl font-bold ${mode === 'buy' ? 'text-success' : 'text-white'}`}>
                            {calculatedEstimate()} {mode === 'buy' ? 'BTC' : ''}
                        </Text>
                    </View>
                </View>

                <View className="mt-8">
                     <View className="flex-row justify-between mb-4 px-2">
                        <Text className="text-gray-text">Disponível:</Text>
                        <Text className="text-white font-medium">
                            {mode === 'buy' ? 
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(user?.balance_brl || 0) :
                                `${user?.balance_btc.toFixed(8)} BTC`
                            }
                        </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={handleTrade}
                        disabled={loading}
                        className={`p-5 rounded-2xl items-center ${mode === 'buy' ? 'bg-success' : 'bg-danger'}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="#0B0E11" />
                        ) : (
                            <Text className="text-dark font-bold text-lg">
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
