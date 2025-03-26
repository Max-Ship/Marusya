import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeMovie } from '../../types/types';


interface PlayerState {
    isPlaying: boolean;
    movieData: typeMovie | null;
    volume: number;
    currentTime: number;
}

const initialState: PlayerState = {
    isPlaying: false,
    movieData: null,
    volume: 0.5,
    currentTime: 0,
};


export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        play(state) {
            state.isPlaying = true;
        },
        pause(state) {
            state.isPlaying = false;
        },
        setMovieData(state, action: PayloadAction<typeMovie>) {
            state.movieData = action.payload;
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = Math.max(0, Math.min(1, action.payload)); // Ограничить громкость в диапазоне [0, 1]
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
        seek(state, action: PayloadAction<number>) {
            state.currentTime = action.payload;
        },
    },
});


export const {
    play,
    pause,
    setMovieData,
    setVolume,
    setCurrentTime,
    seek,
} = playerSlice.actions;

export default playerSlice.reducer;
