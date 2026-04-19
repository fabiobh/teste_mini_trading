import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { UserPlus } from 'lucide-react-native';

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
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
                    <View className="items-center mb-10">
                        <View className="bg-success p-4 rounded-full mb-4">
                            <UserPlus size={40} color="#0B0E11" />
                        </View>
                        <Text className="text-white text-3xl font-bold">Criar Conta</Text>
                        <Text className="text-gray-text mt-2">Comece sua jornada no trading</Text>
                    </View>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-text mb-2 ml-1">Nome Completo</Text>
                            <TextInput 
                                className="bg-dark-secondary text-white p-4 rounded-xl border border-gray-800 focus:border-success"
                                placeholder="Seu nome"
                                placeholderTextColor="#4A4A4A"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text className="text-gray-text mb-2 ml-1">E-mail</Text>
                            <TextInput 
                                className="bg-dark-secondary text-white p-4 rounded-xl border border-gray-800 focus:border-success"
                                placeholder="seu@email.com"
                                placeholderTextColor="#4A4A4A"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View>
                            <Text className="text-gray-text mb-2 ml-1">Senha</Text>
                            <TextInput 
                                className="bg-dark-secondary text-white p-4 rounded-xl border border-gray-800 focus:border-success"
                                placeholder="Min. 8 caracteres"
                                placeholderTextColor="#4A4A4A"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View>
                            <Text className="text-gray-text mb-2 ml-1">Confirmar Senha</Text>
                            <TextInput 
                                className="bg-dark-secondary text-white p-4 rounded-xl border border-gray-800 focus:border-success"
                                placeholder="Repita a senha"
                                placeholderTextColor="#4A4A4A"
                                value={passwordConfirmation}
                                onChangeText={setPasswordConfirmation}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity 
                            className="bg-success p-4 rounded-xl items-center mt-4"
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#0B0E11" />
                            ) : (
                                <Text className="text-dark font-bold text-lg">Criar Conta</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            className="items-center mt-6"
                        >
                            <Text className="text-gray-text">
                                Já tem uma conta? <Text className="text-success font-bold">Entrar</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
