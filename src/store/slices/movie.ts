import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { typeMovie } from "../../types/types";
import { fetchMovieById } from "../../api/movies";
import addTextByError from "../../utils/textByError";


interface MovieState {
    movie: typeMovie | null;
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movie: null,
    loading: false,
    error: null,
};


export const getMovie = createAsyncThunk(
    "movie/fetchMovie",
    async (movieId: number, { rejectWithValue }) => {
        try {
            const response = await fetchMovieById(movieId);
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const movieSlice = createSlice({
    name: "Movie",
    initialState,
    reducers: {
        clearMovie: (state) => {
            state.movie = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMovie.fulfilled, (state, action: PayloadAction<typeMovie>) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = addTextByError(action.payload, "Ошибка запроса к фильму!");
            });
    },
});


export const { clearMovie } = movieSlice.actions;
export default movieSlice.reducer; 
