import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { typeMovies } from "../../types/types";
import { fetchMovies } from "../../api/movies";
import addTextByError from "../../utils/textByError";


interface MovieState {
    movies: typeMovies | [];
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
};


export const getMoviesByGenre = createAsyncThunk(
    "movies/fetchMovies",
    async (
        { genre }: { genre: string; page?: number; count?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetchMovies({
                genre: genre,
                page: 1,
                count: 30
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const moviesByGenreSlice = createSlice({
    name: "moviesByGenre",
    initialState,
    reducers: {
        clearMovies: (state) => {
            state.movies = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMoviesByGenre.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action: PayloadAction<typeMovies>) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(getMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = addTextByError(action.error.message, "Ошибка запроса фильмов по жанру!");
            });
    },
});


export const { clearMovies } = moviesByGenreSlice.actions;
export default moviesByGenreSlice.reducer; 
