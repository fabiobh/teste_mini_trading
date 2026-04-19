import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { LogIn, TrendingUp, Mail, Lock } from 'lucide-react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { signIn } = useAuth();
    const navigation = useNavigation<any>();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            setLoading(true);
            await signIn({ email, password });
        } catch (error: any) {
            Alert.alert('Erro no Login', error.response?.data?.message || 'Verifique suas credenciais');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 px-6 justify-center"
            >
                <View className="items-center mb-12">
                    <View className="bg-primary/20 p-5 rounded-full mb-6 border border-primary/30 shadow-lg shadow-primary">
                        <TrendingUp size={48} color="#3B82F6" strokeWidth={2.5} />
                    </View>
                    <Text className="text-white text-4xl font-extrabold tracking-tight">Mini Binance</Text>
                    <Text className="text-gray-text mt-3 text-base text-center px-4">
                        A plataforma mais rápida para negociar crypto no seu bolso.
                    </Text>
                </View>

                <View className="bg-dark-secondary/50 p-6 rounded-3xl border border-white/5">
                    <View className="mb-5">
                        <Text className="text-gray-text text-sm mb-2 ml-1 font-medium">Endereço de E-mail</Text>
                        <View className="flex-row items-center bg-dark-secondary rounded-2xl border border-white/10 px-4 py-1">
                            <Mail size={20} color="#94A3B8" />
                            <TextInput 
                                className="flex-1 text-white p-3 ml-2 text-base"
                                placeholder="seu@email.com"
                                placeholderTextColor="#64748B"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View className="mb-5">
                        <Text className="text-gray-text text-sm mb-2 ml-1 font-medium">Sua Senha</Text>
                        <View className="flex-row items-center bg-dark-secondary rounded-2xl border border-white/10 px-4 py-1">
                            <Lock size={20} color="#94A3B8" />
                            <TextInput 
                                className="flex-1 text-white p-3 ml-2 text-base"
                                placeholder="********"
                                placeholderTextColor="#64748B"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <TouchableOpacity className="items-end mt-2">
                        <Text className="text-primary-light text-sm font-medium">Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="bg-primary py-4 rounded-2xl items-center mt-6 shadow-lg shadow-primary/50"
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <View className="flex-row items-center">
                                <Text className="text-white font-bold text-lg mr-2 tracking-wide">Entrar na Conta</Text>
                                <LogIn size={20} color="#ffffff" />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-10">
                    <Text className="text-gray-text text-base">Novo por aqui?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-primary-light font-bold text-base ml-1">Criar Conta</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
