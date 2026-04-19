import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { UserPlus, Mail, Lock, User } from 'lucide-react-native';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { signUp } = useAuth();
    const navigation = useNavigation<any>();

    const handleRegister = async () => {
        if (!name || !email || !password || !passwordConfirmation) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        if (password !== passwordConfirmation) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        try {
            setLoading(true);
            await signUp({ 
                name, 
                email, 
                password, 
                password_confirmation: passwordConfirmation 
            });
        } catch (error: any) {
            Alert.alert('Erro no Cadastro', error.response?.data?.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-dark">
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
                    <View className="items-center mb-10">
                        <View className="bg-success/20 p-5 rounded-full mb-6 border border-success/30 shadow-lg shadow-success">
                            <UserPlus size={48} color="#10B981" strokeWidth={2.5} />
                        </View>
                        <Text className="text-white text-4xl font-extrabold tracking-tight">Criar Conta</Text>
                        <Text className="text-gray-text mt-3 text-base text-center px-4">
                            Sua jornada financeira começa aqui.
                        </Text>
                    </View>

                    <View className="bg-dark-secondary/50 p-6 rounded-3xl border border-white/5">
                        <View className="mb-5">
                            <Text className="text-gray-text text-sm mb-2 ml-1 font-medium">Nome Completo</Text>
                            <View className="flex-row items-center bg-dark-secondary rounded-2xl border border-white/10 px-4 py-1">
                                <User size={20} color="#94A3B8" />
                                <TextInput 
                                    className="flex-1 text-white p-3 ml-2 text-base"
                                    placeholder="Seu nome"
                                    placeholderTextColor="#64748B"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

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
                            <Text className="text-gray-text text-sm mb-2 ml-1 font-medium">Senha</Text>
                            <View className="flex-row items-center bg-dark-secondary rounded-2xl border border-white/10 px-4 py-1">
                                <Lock size={20} color="#94A3B8" />
                                <TextInput 
                                    className="flex-1 text-white p-3 ml-2 text-base"
                                    placeholder="Min. 8 caracteres"
                                    placeholderTextColor="#64748B"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <View className="mb-5">
                            <Text className="text-gray-text text-sm mb-2 ml-1 font-medium">Confirmar Senha</Text>
                            <View className="flex-row items-center bg-dark-secondary rounded-2xl border border-white/10 px-4 py-1">
                                <Lock size={20} color="#94A3B8" />
                                <TextInput 
                                    className="flex-1 text-white p-3 ml-2 text-base"
                                    placeholder="Repita a senha"
                                    placeholderTextColor="#64748B"
                                    value={passwordConfirmation}
                                    onChangeText={setPasswordConfirmation}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            className="bg-success py-4 rounded-2xl items-center mt-6 shadow-lg shadow-success/50"
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="text-white font-bold text-lg tracking-wide">Finalizar Cadastro</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center mt-10">
                        <Text className="text-gray-text text-base">Já possui uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className="text-success font-bold text-base ml-1">Entrar Agora</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
