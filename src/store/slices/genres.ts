import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { typeGenres } from "../../types/types";
import { fetchGenres } from "../../api/movies";
import addTextByError from "../../utils/textByError";



interface RandomMovieState {
    genres: typeGenres | [];
    loading: boolean;
    error: string | null;
}

const initialState: RandomMovieState = {
    genres: [],
    loading: false,
    error: null,
};


export const getGenres = createAsyncThunk(
    "genres/fetchGenres",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchGenres();
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        clearGenres: (state) => {
            state.genres = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGenres.fulfilled, (state, action: PayloadAction<typeGenres>) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = addTextByError(action.payload, "Ошибка при получении жанров!");
            });
    },
});


export const { clearGenres } = genresSlice.actions;
export default genresSlice.reducer; 
