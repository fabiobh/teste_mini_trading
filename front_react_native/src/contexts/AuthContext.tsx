import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
    balance_brl: number;
    balance_btc: number;
}

interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn(credentials: object): Promise<void>;
    signUp(data: object): Promise<void>;
    signOut(): Promise<void>;
    refreshUser(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await SecureStore.getItemAsync('user');
            const storagedToken = await SecureStore.getItemAsync('auth_token');

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }

        loadStorageData();
    }, []);

    const signIn = async (credentials: object) => {
        const response = await api.post('/login', credentials);
        const { user, access_token } = response.data;

        setUser(user);

        await SecureStore.setItemAsync('auth_token', access_token);
        await SecureStore.setItemAsync('user', JSON.stringify(user));
    };

    const signUp = async (data: object) => {
        const response = await api.post('/register', data);
        const { user, access_token } = response.data;

        setUser(user);

        await SecureStore.setItemAsync('auth_token', access_token);
        await SecureStore.setItemAsync('user', JSON.stringify(user));
    };

    const signOut = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            console.log('Logout error', e);
        }
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('user');
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const response = await api.get('/me');
            setUser(response.data);
            await SecureStore.setItemAsync('user', JSON.stringify(response.data));
        } catch (e) {
            console.log('Refresh error', e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
