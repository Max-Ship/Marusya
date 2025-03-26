import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { typeMovie } from "../../types/types";
import { fetchRandomMovie } from "../../api/movies";
import addTextByError from "../../utils/textByError";


interface RandomMovieState {
    movie: typeMovie | null;
    loading: boolean;
    error: string | null;
}

const initialState: RandomMovieState = {
    movie: null,
    loading: false,
    error: null,
};


export const getRandomMovie = createAsyncThunk(
    "randomMovie/fetchRandomMovie",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchRandomMovie();
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const randomMovieSlice = createSlice({
    name: "randomMovie",
    initialState,
    reducers: {
        clearRandomMovie: (state) => {
            state.movie = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRandomMovie.fulfilled, (state, action: PayloadAction<typeMovie>) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(getRandomMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = addTextByError(action.error.message, "Ошибка при запросе случайного фильма!");
            });
    },
});


export const { clearRandomMovie } = randomMovieSlice.actions;
export default randomMovieSlice.reducer; 
