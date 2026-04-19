import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';
import React from 'react';

// Mocks
jest.mock('../services/api');
jest.mock('expo-secure-store');

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve iniciar com o estado de loading como true e usuário nulo', () => {
        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.user).toBeNull();
    });

    it('deve realizar login com sucesso e salvar os dados', async () => {
        const mockUser = { id: 1, name: 'Test User', email: 'test@test.com' };
        const mockToken = 'fake-token';

        (api.post as jest.Mock).mockResolvedValue({
            data: { user: mockUser, access_token: mockToken }
        });

        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signIn({ email: 'test@test.com', password: 'password' });
        });

        expect(result.current.user).toEqual(mockUser);
        expect(SecureStore.setItemAsync).toHaveBeenCalledWith('auth_token', mockToken);
    });

    it('deve realizar logout e limpar o armazenamento', async () => {
        (api.post as jest.Mock).mockResolvedValue({});
        const { result } = renderHook(() => useAuth(), { wrapper });

        await act(async () => {
            await result.current.signOut();
        });

        expect(result.current.user).toBeNull();
        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('user');
    });
});
