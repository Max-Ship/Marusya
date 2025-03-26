import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from '../../api/movies';
import { typeMovies } from '../../types/types';
import addTextByError from '../../utils/textByError';


interface SearchState {
    movies: typeMovies | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    query: string | null;
}

const initialState: SearchState = {
    movies: null,
    loading: 'idle',
    error: null,
    query: null,
};


export const fetchSearchMoviesAsync = createAsyncThunk(
    'search/fetch',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await fetchMovies({ title: query });
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const searchMoviesSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.movies = null;
            state.query = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchMoviesAsync.pending, (state) => {
                state.loading = 'pending';
                state.movies = null;
                state.error = null;
            })
            .addCase(fetchSearchMoviesAsync.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.movies = action.payload;
                state.error = null;
            })
            .addCase(fetchSearchMoviesAsync.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = addTextByError(action.payload, 'Ошибка при поиске фильмов!');
            });
    },
});


export const { clearSearch } = searchMoviesSlice.actions;
export default searchMoviesSlice.reducer;
