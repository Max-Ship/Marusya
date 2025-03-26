import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFavorites, addFavoriteMovie, deleteFavoriteMovie } from '../../api/favorites';
import { typeMovies } from '../../types/types';
import addTextByError from '../../utils/textByError';


interface FavoritesState {
    favorites: typeMovies | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FavoritesState = {
    favorites: null,
    loading: 'idle',
    error: null,
};


export const fetchFavoritesAsync = createAsyncThunk(
    'favorites/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchFavorites();
            return data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const addFavoriteMovieAsync = createAsyncThunk(
    'favorites/add',
    async (movieId: string, { rejectWithValue }) => {
        try {
            await addFavoriteMovie(movieId);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const deleteFavoriteMovieAsync = createAsyncThunk(
    'favorites/delete',
    async (movieId: string, { rejectWithValue }) => {
        try {
            await deleteFavoriteMovie(movieId);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.favorites = null;
            state.loading = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritesAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchFavoritesAsync.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.favorites = action.payload;
                state.error = null;
            })
            .addCase(fetchFavoritesAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при получении избранных фильмов!');
            })
            .addCase(addFavoriteMovieAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addFavoriteMovieAsync.fulfilled, (state) => {
                state.loading = 'succeeded';
                state.error = null;
            })
            .addCase(addFavoriteMovieAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при добавлении фильма в избранное!');
            })
            .addCase(deleteFavoriteMovieAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(deleteFavoriteMovieAsync.fulfilled, (state) => {
                state.loading = 'succeeded';
                state.error = null;
            })
            .addCase(deleteFavoriteMovieAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при удалении фильма из избранного!');
            });
    },
});


export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
