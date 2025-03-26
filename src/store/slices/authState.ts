import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { typeProfile, typeUser, typeLogin } from '../../types/types';
import { fetchMe, loginUser, logoutUser, registerUser } from '../../api/user';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import addTextByError from '../../utils/textByError';


export interface AuthState {
    isAuthorized: boolean;
    sessionID: string | null;
    userData: typeProfile | null;
    isAuthModalOpen: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    regSuccess: boolean;
}

const initialState: AuthState = {
    isAuthorized: false,
    sessionID: null,
    userData: null,
    isAuthModalOpen: false,
    loading: 'idle',
    error: null,
    regSuccess: false,
};


export const getUserData = createAsyncThunk('auth/getUserData', async (_, { rejectWithValue }) => {
    try {
        const data = await fetchMe();
        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const register = createAsyncThunk('auth/register', async (userData: typeUser, { rejectWithValue }) => {
    try {
        await registerUser(userData);
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const login = createAsyncThunk('auth/login', async (userData: typeLogin, { rejectWithValue }) => {
    try {
        await loginUser(userData);
        const data = await fetchMe();
        return data;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await logoutUser();
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSessionID: (state, action: PayloadAction<string>) => {
            state.sessionID = action.payload;
            state.isAuthorized = true;
            setCookie('sessionID', action.payload);
        },
        openAuthModal: (state) => {
            state.isAuthModalOpen = true;
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
            state.loading = 'idle';
            state.error = null;
            state.regSuccess = false;
        },
        clearAuth: (state) => {
            state.isAuthorized = false;
            state.sessionID = null;
            state.userData = null;
            deleteCookie('sessionID');
            state.error = null;
        },
        resetRegSuccess: (state) => {
            state.regSuccess = false;
        },
        resetAuthForm: (state) => {
            state.loading = 'idle';
            state.error = null;
        },
        setUserDataFromLocalStorage: (state) => {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                try {
                    state.userData = JSON.parse(storedUserData);
                    state.isAuthorized = true;
                    state.sessionID = getCookie('sessionID') || null;
                } catch (error) {
                    console.error("Ошибка при разборе данных пользователя из LocalStorage:", error);
                    localStorage.removeItem('userData');
                    deleteCookie('sessionID');
                    state.isAuthorized = false;
                    state.sessionID = null;
                    state.userData = null;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.userData = action.payload;
                state.isAuthorized = true;
                state.error = null;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при получении данных пользователя!');
                state.isAuthorized = false;
                deleteCookie('sessionID');
                localStorage.removeItem('userData');
                state.sessionID = null;
                state.userData = null;
            })
            .addCase(register.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = 'succeeded';
                state.error = null;
                state.regSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при регистрации!');
                state.regSuccess = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.userData = action.payload;
                state.isAuthorized = true;
                state.error = null;
                state.isAuthModalOpen = false;
                localStorage.setItem('userData', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при авторизации!');
            })
            .addCase(logout.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = 'succeeded';
                state.error = null;
                deleteCookie('sessionID');
                localStorage.removeItem('userData');
                state.isAuthorized = false;
                state.sessionID = null;
                state.userData = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при выходе!');
            })
    },
});


export const { setSessionID, openAuthModal, closeAuthModal, clearAuth, resetAuthForm, resetRegSuccess, setUserDataFromLocalStorage } = authSlice.actions;
export const { logout: logoutAction } = { logout: logout };
export default authSlice.reducer;
