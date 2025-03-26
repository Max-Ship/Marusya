import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { typeMovies } from "../../types/types";
import { fetchTop10Movies } from "../../api/movies";
import addTextByError from "../../utils/textByError";


interface Top10MoviesState {
    movies: typeMovies;
    loading: boolean;
    error: string | null;
}

const initialState: Top10MoviesState = {
    movies: [],
    loading: false,
    error: null,
};


export const getTop10Movies = createAsyncThunk(
    "top10Movies/fetchTop10Movies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchTop10Movies();
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const top10MoviesSlice = createSlice({
    name: "top10Movies",
    initialState,
    reducers: {
        clearTop10Movies: (state) => {
            state.movies = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTop10Movies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTop10Movies.fulfilled, (state, action: PayloadAction<typeMovies>) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(getTop10Movies.rejected, (state, action) => {
                state.loading = false;
                state.error = addTextByError(action.error.message, "Ошибка при зопросе топ 10 фильмов!");
            });
    },
});


export const { clearTop10Movies } = top10MoviesSlice.actions;
export default top10MoviesSlice.reducer; 
