import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { LogIn } from 'lucide-react-native';

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
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 px-6 justify-center"
            >
                <View className="items-center mb-10">
                    <View className="bg-primary p-4 rounded-full mb-4">
                        <LogIn size={40} color="#0B0E11" />
                    </View>
                    <Text className="text-white text-3xl font-bold">Mini Binance</Text>
                    <Text className="text-gray-text mt-2">Sua carteira cripto simplificada</Text>
                </View>

                <View className="space-y-4">
                    <View>
                        <Text className="text-gray-text mb-2 ml-1">E-mail</Text>
                        <TextInput 
                            className="bg-dark-secondary text-white p-4 rounded-xl border border-gray-800 focus:border-primary"
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
                            className="bg-dark-secondary text-white p-4 rounded-xl border border-gray-800 focus:border-primary"
                            placeholder="********"
                            placeholderTextColor="#4A4A4A"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity 
                        className="bg-primary p-4 rounded-xl items-center mt-4"
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#0B0E11" />
                        ) : (
                            <Text className="text-dark font-bold text-lg">Entrar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')}
                        className="items-center mt-6"
                    >
                        <Text className="text-gray-text">
                            Não tem uma conta? <Text className="text-primary font-bold">Registre-se</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
