import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { randomMovieSlice } from './slices/randomMovie';
import { top10MoviesSlice } from './slices/top10Movies';
import { genresSlice } from './slices/genres';
import { movieSlice } from './slices/movie';
import { moviesByGenreSlice } from './slices/moviesByGenre';
import { playerSlice } from './slices/player';
import { authSlice } from './slices/authState';
import { favoritesSlice } from './slices/favorites';
import { searchMoviesSlice } from './slices/searchMovies';


const rootReducer = combineReducers({
    randomFilm: randomMovieSlice.reducer,
    topFilms: top10MoviesSlice.reducer,
    genres: genresSlice.reducer,
    movie: movieSlice.reducer,
    movies: moviesByGenreSlice.reducer,
    player: playerSlice.reducer,
    auth: authSlice.reducer,
    favorites: favoritesSlice.reducer,
    search: searchMoviesSlice.reducer,
});


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;