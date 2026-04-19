import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import { AuthProvider } from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

// Mocks
jest.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
        signIn: jest.fn(),
        user: null,
        loading: false,
    }),
    AuthProvider: ({ children }: any) => children,
}));

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

// Mock Lucide Icons (as they use SVG which can fail in tests)
jest.mock('lucide-react-native', () => ({
    LogIn: () => 'LogInIcon',
}));

describe('LoginScreen', () => {
    it('deve renderizar os campos de email e senha', () => {
        const { getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <LoginScreen />
            </NavigationContainer>
        );

        expect(getByPlaceholderText('seu@email.com')).toBeTruthy();
        expect(getByPlaceholderText('********')).toBeTruthy();
        expect(getByText('Entrar')).toBeTruthy();
    });

    it('deve mostrar o título do app', () => {
        const { getByText } = render(
            <NavigationContainer>
                <LoginScreen />
            </NavigationContainer>
        );

        expect(getByText('Mini Binance')).toBeTruthy();
    });
});
