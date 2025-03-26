import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authState';
import { login, register, logout, getUserData } from './slices/authState';
import { fetchMe, loginUser, logoutUser, registerUser } from '../api/user';
import { setCookie, deleteCookie, getCookie } from '../utils/cookie';
import type { AppDispatch, RootState } from './store';

jest.mock('../api/user', () => ({
    fetchMe: jest.fn(),
    loginUser: jest.fn(),
    logoutUser: jest.fn(),
    registerUser: jest.fn(),
}));

jest.mock('../utils/cookie', () => ({
    getCookie: jest.fn(),
    setCookie: jest.fn(),
    deleteCookie: jest.fn(),
}));

describe('authSlice', () => {
    let store: ReturnType<typeof configureStore>;
    let dispatch: AppDispatch;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authReducer,
            },
        });
        dispatch = store.dispatch;

        (loginUser as jest.Mock).mockReset();
        (fetchMe as jest.Mock).mockReset();
        (registerUser as jest.Mock).mockReset();
        (logoutUser as jest.Mock).mockReset();
        (setCookie as jest.Mock).mockReset();
        (deleteCookie as jest.Mock).mockReset();
        (getCookie as jest.Mock).mockReset();
    });

    describe('async actions', () => {
        it('should handle successful login', async () => {
            const mockUserData = { email: 'test@test.com', name: 'Test User', surname: 'Test Surname', favorites: ['98'] };

            (loginUser as jest.Mock).mockResolvedValueOnce({});
            (fetchMe as jest.Mock).mockResolvedValueOnce(mockUserData);

            await dispatch(login({ email: 'test@test.com', password: '1234abcde' }));

            const state = store.getState() as RootState;
            expect(state.auth.userData).toEqual(mockUserData);
            expect(state.auth.isAuthorized).toBe(true);
            expect(state.auth.error).toBeNull();
            expect(state.auth.isAuthModalOpen).toBe(false);
        });

        it('should handle login error', async () => {
            (loginUser as jest.Mock).mockRejectedValueOnce({
                message: 'Invalid credentials',
                name: 'Error',
                stack: ''
            });

            await dispatch(login({ email: 'wrong@test.com', password: '1234abcde' }));

            const state = store.getState() as RootState;
            expect(state.auth.error).toBe('Ошибка при авторизации!');
            expect(state.auth.isAuthorized).toBe(false);
            expect(state.auth.sessionID).toBeNull();
            expect(state.auth.userData).toBeNull();
        });

        it('should handle successful registration', async () => {
            const mockFormData = {
                email: 'newuser@example.com',
                password: '12345678',
                name: 'John',
                surname: 'John',
            };

            (registerUser as jest.Mock).mockResolvedValueOnce({});

            await dispatch(register(mockFormData));

            const state = store.getState() as RootState;
            expect(state.auth.loading).toBe('succeeded');
            expect(state.auth.error).toBeNull();
            expect(state.auth.regSuccess).toBe(true);
        });

        it('should handle registration error', async () => {
            const mockFormData = {
                email: 'existing@example.com',
                password: '12345678',
                name: 'John',
                surname: 'John',
            };

            (registerUser as jest.Mock).mockRejectedValueOnce({
                message: 'Email already exists',
                name: 'Error',
                stack: ''
            });

            await dispatch(register(mockFormData));

            const state = store.getState() as RootState;
            expect(state.auth.error).toBe('Ошибка при регистрации!');
            expect(state.auth.regSuccess).toBe(false);
        });

        it('should handle successful logout', async () => {
            (logoutUser as jest.Mock).mockResolvedValueOnce({});

            await dispatch(logout());

            const state = store.getState() as RootState;
            expect(state.auth.loading).toBe('succeeded');
            expect(state.auth.error).toBeNull();
            expect(state.auth.isAuthorized).toBe(false);
            expect(state.auth.sessionID).toBeNull();
            expect(state.auth.userData).toBeNull();
        });

        it('should handle logout error', async () => {
            (logoutUser as jest.Mock).mockRejectedValueOnce({
                message: 'Logout failed',
                name: 'Error',
                stack: ''
            });

            await dispatch(logout());

            const state = store.getState() as RootState;
            expect(state.auth.error).toBe('Ошибка при выходе!');
        });

        it('should handle successful getUserData', async () => {
            const mockUserData = { email: 'test@test.com', name: 'Test User', surname: 'Test Surname', favorites: ['98'] };

            (fetchMe as jest.Mock).mockResolvedValueOnce(mockUserData);

            await dispatch(getUserData());

            const state = store.getState() as RootState;
            expect(state.auth.userData).toEqual(mockUserData);
            expect(state.auth.isAuthorized).toBe(true);
            expect(state.auth.error).toBeNull();
        });

        it('should handle getUserData error', async () => {
            (fetchMe as jest.Mock).mockRejectedValueOnce({
                message: 'Failed to fetch user data',
                name: 'Error',
                stack: ''
            });

            await dispatch(getUserData());

            const state = store.getState() as RootState;
            expect(state.auth.error).toBe('Ошибка при получении данных пользователя!');
            expect(state.auth.isAuthorized).toBe(false);
        });
    });
});
